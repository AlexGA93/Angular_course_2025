import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Country } from '../interfaces/country.interface';
import { combineLatest, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  
  // inyectamos el servicio de HttpClient para hacer peticiones HTTP
  private http = inject(HttpClient);

  private _baseUrl: string = 'https://restcountries.com/v3.1';  

  private _regions: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get regions(): string[] {
    return [...this._regions];
  }

  getCountriesByRegion( region: string ): Observable<Country[]> {
    // comporbamos que nos proporcionen una region
    if(!region) return of([]);

    // console.log({ region });

    const url: string = `${this._baseUrl}/region/${ region }?fields=cca3,name,borders`;

    return this.http.get<Country[]>( url );
  }

  getCountriesByAlphaCode( alphaCode: string ): Observable<Country> {

    const url: string = `${this._baseUrl}/alpha/${ alphaCode }?fields=cca3,name,borders`;

    return this.http.get<Country>( url );
  }

  getCountryNamesByCodeArray(countryCodes: string[]): Observable<Country[]> {
    if (!countryCodes || countryCodes.length === 0) return of([]);

    const countriesRequests: Observable<Country>[] = [];

    countryCodes.forEach((code) => {
      const request = this.getCountriesByAlphaCode(code);
      countriesRequests.push(request);
    });

    return combineLatest(countriesRequests);
  }
}
