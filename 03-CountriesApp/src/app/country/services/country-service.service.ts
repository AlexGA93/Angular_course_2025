import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { RestCountry } from '../interfaces/country.interface';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
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

 /**
  * A la hora de manejar la cache del servicio, debemoos pensar como queremos almacenar los datos
  * 
  *  * por un lado podriamos usar un Map, el cual es un objeto que retiene pares clave-valor amntiendo orden de insercion en las llaves
  *  * por otro lado podriamos usar un Set, el cual es un objeto ue retiene valores unicos, sin orden de insercion
  *  ! en este caso nos viene mejor usar un Map, ya que queremos almacenar los datos de los paises por su nombre
  */
  private queryCacheCapital = new Map<string ,Country[]>(); // llave sera un string y apuntara a un array de tipo Country
  private queryCacheCountry = new Map<string ,Country[]>(); // llave sera un string y apuntara a un array de tipo Country
  private queryCacheRegion = new Map<string ,Country[]>(); // llave sera un string y apuntara a un array de tipo Country
  // Método para obtener la URL base
  public searchByCapital(query: string): Observable<Country[]> {

    // * primero verificamos si la consulta ya existe en la cache
    if( this.queryCacheCapital.has(query) ){
      console.log('Usando cache para la consulta:', query);
      console.log('Datos en cache:', this.queryCacheCapital);
      return of( this.queryCacheCapital.get(query) ?? []);
    }


    // console.log('Buscando por capital:', query);
    return this.http.get<RestCountry[]>(`${this.baseUrl()}/capital/${query.toLowerCase()}`)
    // pasamos por el pipe el operador map para transformar la respuesta
    .pipe(
      // usamos la respuesta de la peticion para pasarla por el mapper y devolver la lista transformada
      map((restCountries) => CountryMapper.mapRestCountriesToCountries(restCountries)),
      // * establecemos el valor de la query en la cache
      tap( countries => this.queryCacheCapital.set(query, countries) ),
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

    // * primero verificamos si la consulta ya existe en la cache
    if( this.queryCacheCountry.has(query) ){
      return of( this.queryCacheCountry.get(query) ?? []);
    }


    return this.http.get<RestCountry[]>(`${this.baseUrl()}/name/${query.toLowerCase()}`)
    // pasamos por el pipe el operador map para transformar la respuesta
    .pipe(
      // usamos la respuesta de la peticion para pasarla por el mapper y devolver la lista transformada
      map((restCountries) => CountryMapper.mapRestCountriesToCountries(restCountries)),
      // * establecemos el valor de la query en la cache
      tap( countries => this.queryCacheCountry.set(query, countries) ),
      // delay from rxjs
      // delay(2000),
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
      // delay(2000),
      // gestionamos el error en el pipe mediante el operador catchErrorq
      catchError((error) => {
        console.log('Error al buscar por capital:', error);
        // retornamos un array vacio en caso de error
        return throwError(() => new Error(`No se encontraron resultados para: ${code}`));
      })
    );
  }

  // Método para buscar por región
  public searchByRegion(region: string): Observable<Country[]> {
    
    
    // * primero verificamos si la consulta ya existe en la cache
    if( this.queryCacheRegion.has(region) ){
      console.log('Buscando por región en cache:', region);
      return of( this.queryCacheRegion.get(region) ?? []);
    }

    return this.http.get<RestCountry[]>(`${this.baseUrl()}/region/${region}`)
    .pipe(
      // usamos la respuesta de la peticion para pasarla por el mapper y devolver la lista transformada
      map((restCountries) => CountryMapper.mapRestCountriesToCountries(restCountries)),
      // * establecemos el valor de la query en la cache
      tap( countries => this.queryCacheRegion.set(region, countries) ),
      // gestionamos el error en el pipe mediante el operador catchErrorq
      catchError((error) => {
        console.log('Error al buscar por region:', error);
        // retornamos un array vacio en caso de error
        return throwError(() => new Error(`No se encontraron resultados para: ${region}`));
      })
    )
  }
}
