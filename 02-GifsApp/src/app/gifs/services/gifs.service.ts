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
  console.log(gifs);
  return gifs;
};

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor() { this.loadTrendingGifs(); }

  // urls
  private _apiUrl: string = environment.giphyUrl;

  // inyectamos el servicio HttpClient
  private http = inject(HttpClient); 

  // signals
  trendingGifs        = signal<Gif[]>([]);
  trendingGifsLoading = signal<boolean>(true);
  /**
   * Record: Tipado para un objeto de clave-valor
   * string: clave
   * Gif[]: valor dinamico
   */
  searchHistory       = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  // computed signas
  searchHistoryKeys   = computed<string[]>(() => Object.keys(this.searchHistory()));

  // signal para guardar el historial de busqueda
  saveToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem(constants.STORAGE_KEY, historyString);
  });

  loadTrendingGifs(): void {
    const params = {
      api_key: environment.apiKeyGiphy,
      limit: '20',
      rating: 'r'
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
      console.log({gifs});
      this.trendingGifs.set(gifs); // actualizamos la propiedad trendingGifs con el array de gifs
      this.trendingGifsLoading.set(false); // actualizamos la propiedad trendingGifsLoading a false
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
