import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { RestCountry } from '../interfaces/country.interface';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../interfaces/custom-country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryServiceService {

  // inyectamos el servicio HttpClient
  private http = inject(HttpClient);

  // creamos una señal para la URL base
  private baseUrl = signal<string>(environment.baseUrl);

  // Método para obtener la URL base
  public searchByCapital(query: string): Observable<Country[]> {
    return this.http.get<RestCountry[]>(`${this.baseUrl()}/capital/${query.toLowerCase()}`)
    // pasamos por el pipe el operador map para transformar la respuesta
    .pipe(
      // usamos la respuesta de la peticion para pasarla por el mapper y devolver la lista transformada
      map((restCountries) => CountryMapper.mapRestCountriesToCountries(restCountries)),
      // gestionamos el error en el pipe mediante el operador catchErrorq
      catchError((error) => {
        console.log('Error al buscar por capital:', error);
        // retornamos un array vacio en caso de error
        return throwError(() => new Error(`No se encontraron resultados para: ${query}`));
      })
    );
  }

  // Método para buscar por país
  public searchByCountry(query: string): Observable<Country[]> {
    return this.http.get<RestCountry[]>(`${this.baseUrl()}/name/${query.toLowerCase()}`)
    // pasamos por el pipe el operador map para transformar la respuesta
    .pipe(
      // usamos la respuesta de la peticion para pasarla por el mapper y devolver la lista transformada
      map((restCountries) => CountryMapper.mapRestCountriesToCountries(restCountries)),
      // delay from rxjs
      delay(2000),
      // gestionamos el error en el pipe mediante el operador catchErrorq
      catchError((error) => {
        console.log('Error al buscar por capital:', error);
        // retornamos un array vacio en caso de error
        return throwError(() => new Error(`No se encontraron resultados para: ${query}`));
      })
    );
  }

  // Método para buscar code
  public searchCountryByAlphaCode(code: string): Observable<Country | undefined>{
    return this.http.get<RestCountry[]>(`${this.baseUrl()}/alpha/${code}`)
    // pasamos por el pipe el operador map para transformar la respuesta
    .pipe(
      // usamos la respuesta de la peticion para pasarla por el mapper y devolver la lista transformada
      map((restCountries) => CountryMapper.mapRestCountriesToCountries(restCountries)),
      // obtenemos el primer elemento del array
      map((countries) => countries.at(0)),
      // delay from rxjs
      delay(2000),
      // gestionamos el error en el pipe mediante el operador catchErrorq
      catchError((error) => {
        console.log('Error al buscar por capital:', error);
        // retornamos un array vacio en caso de error
        return throwError(() => new Error(`No se encontraron resultados para: ${code}`));
      })
    );
  }
}
