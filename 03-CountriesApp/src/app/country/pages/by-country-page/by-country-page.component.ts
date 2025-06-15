import { Component, inject, input, linkedSignal, resource, signal } from '@angular/core';
import { CountrySearchInputComponent } from '../../components/country-search-input/country-search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryServiceService } from '../../services/country-service.service';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
  styles: ``
})

export class ByCountryPageComponent {
  // inyectamos el servicio
  countryService = inject(CountryServiceService);
  // inyectamos el ActivatedRoute y Router para manejar la navegacion
  activatedRoute = inject(ActivatedRoute);
  // inyectamos el Router para manejar la navegacion
  router = inject(Router);
  
    // almacenamos los parametros de la ruta
  queryParams: string = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  // * Creamos una senal que se va a actualizar cada vez que el usuario escriba algo
  // * linkedSignal nos permite crear una señal que se actualiza automaticamente cuando cambia el valor de la señal a la que esta vinculada
  query     = linkedSignal<string>(() => this.queryParams);

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

    // actualizamos la url
    this.router.navigate(['/country/by-country'], {
      queryParams: { query: request.query }
    });

      return this.countryService.searchByCountry(request.query);
    }
  });
}
