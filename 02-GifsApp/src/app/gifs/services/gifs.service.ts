import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { GiphyResponseType } from '../interfaces/giphy.interface';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';
import { constants } from '../constants/constants';


const loadFromLocalStorage = () => {
  const gifsFromLocalStorage = localStorage.getItem(constants.STORAGE_KEY) ?? '{}'; //Record<string, gifs[]>
  const gifs = JSON.parse(gifsFromLocalStorage);
  return gifs;
};

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor() { this.loadTrendingGifs(); }

  // * urls
  private _apiUrl: string = environment.giphyUrl;
  // * inyectamos el servicio HttpClient
  private http          = inject(HttpClient); 
  // * signals
  trendingGifsLoading   = signal<boolean>(false);
  // Record: Tipado para un objeto de clave-valor { string ,Gif[] }
  searchHistory         = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  trendingGifs          = signal<Gif[]>([]);
  private trendingPage  = signal<number>(0);
  //* computed signas
  searchHistoryKeys     = computed<string[]>(() => Object.keys(this.searchHistory()));
  // para masonry necesitamos convertir el array de gifs en un array de arrays de 3 gifs cada uno
  trendingGitGroup      = computed<Gif[][]>(() => {
    const groups = [];

    for (let i=0; i < this.trendingGifs().length; i += 3) {
      groups.push(this.trendingGifs().slice(i, i + 3));
    }
    
    return groups; // [ [gif1, gif2, gif3], [gif4, gif5, gif6] ]
  });
  // signal para guardar el historial de busqueda
  saveToLocalStorage  = effect(() => localStorage.setItem(constants.STORAGE_KEY, JSON.stringify(this.searchHistory())));

  // * function
  loadTrendingGifs(): void {

    // si esta cargando, no queremos hacer ninguna peticion
    if(this.trendingGifsLoading()) return;

    this.trendingGifsLoading.set(true); // la primera propiedad queremos inicializar la carga

    const params = {
      api_key: environment.apiKeyGiphy,
      limit: '20',
      rating: 'r',
      offset: this.trendingPage() * 20 // cada vez que cargamos gifs, aumentamos la pagina
    };
    
    this.http.get<GiphyResponseType>(`${this._apiUrl}/gifs/trending`, { params })
    .subscribe((response) => {
      /**
      * queremos transformar la respuesta en un array de gifs de tipo Gifs. Para ello usaremos el mapper
      * que nos transforma el objeto de Giphy a un objeto de tipo Gif
      * 
      * pasamos la respuesta al mapper para guardar el array de gifs
      */
      const gifs = GifMapper.mapGiphyItemToGifArray(response.data);
      this.trendingGifs.update(currentGifs => [
        ...currentGifs, // los gifs que ya tenemos
        ...gifs // los nuevos gifs que hemos cargado
      ]); // actualizamos la propiedad trendingGifs con el array de gifs
      this.trendingGifsLoading.set(false); // actualizamos la propiedad trendingGifsLoading a false
      // actualizamos la propiedad trendingPage para la siguiente carga
      this.trendingPage.update((page) => page + 1); // aumentamos la pagina
    });
  }

  searchGifs(query: string): Observable<Gif[]> {
    const params = {
      api_key: environment.apiKeyGiphy,
      q: query,
      limit: '20',
      rating: 'r'
    };

    return this.http.get<GiphyResponseType>(`${this._apiUrl}/gifs/search`, { params })
    .pipe(
      // tap para ver la respuesta en consola
      tap((resp) => console.log({resp})),
      // transformamos la respuesta en un array de gifs de tipo Gifs. Para ello usaremos el mapper
      map((response) => GifMapper.mapGiphyItemToGifArray(response.data)),
      // guardamos el array de gifs en el historial de busqueda
      tap((gifs) => {
        this.searchHistory.update((history) => ({
          ... history,
          [query.toLocaleLowerCase()]: gifs
        }))
      })
    ); 
  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] ?? [];
  }
}
