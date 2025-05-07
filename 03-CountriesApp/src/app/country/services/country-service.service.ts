import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { RestCountry } from '../interfaces/country.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryServiceService {

  private http = inject(HttpClient);

  private baseUrl = signal<string>(environment.baseUrl);

  public searchByCapital(query: string): Observable<RestCountry[]> {
    return this.http.get<RestCountry[]>(`${this.baseUrl()}/capital/${query.toLowerCase()}`);
  }
}
