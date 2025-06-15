import { Component, inject, input, resource, signal } from '@angular/core';
import { CountrySearchInputComponent } from '../../components/country-search-input/country-search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryServiceService } from '../../services/country-service.service';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-country-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
  styles: ``
})

export class ByCountryPageComponent {
  // inyectamos el servicio
  countryService = inject(CountryServiceService);
  
  // input para el valor de busqueda
  query = signal<string>('');

  // creamos un recurso para manejar la busqueda
  // countrysResource = resource({
  //   request: () => ({ query: this.query() }),
  //   loader: async ({ request }) => {
  //     if (!request.query) return [];

  //     return await firstValueFrom(
  //       this.countryService.searchByCountry(request.query)
  //     );
  //   }
  // });

  // usando mediante Observable rxResource
  countrysResource = rxResource({
    request: () => ({ query: this.query() }),
    loader:  ({ request }) => {
    if (!request.query) return of([]);
      return this.countryService.searchByCountry(request.query);
    }
  });
}
