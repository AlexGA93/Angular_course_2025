import { Component, inject, linkedSignal, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { Region } from '../../interfaces/region.interface';
import { CountryServiceService } from '../../services/country-service.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

// funcion para validar que la region es una de las regiones validas
function isValidRegion(queryParam: string): Region {

  queryParam = queryParam.toLowerCase().trim();

  const validRegion: Record<string, Region> = {
    Africa: 'Africa',
    Americas: 'Americas',
    Asia: 'Asia',
    Europe: 'Europe',
    Oceania: 'Oceania',
    Antarctic: 'Antarctic'
  };

  return validRegion[queryParam] ?? 'Americas';
}

@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {

  // * inyectamos el servicio CountryServiceService
  private countryService = inject(CountryServiceService);
  // inyectamos el ActivatedRoute y Router para manejar la navegacion
  activatedRoute = inject(ActivatedRoute);
  // inyectamos el Router para manejar la navegacion
  router = inject(Router);

  // almacenamos los parametros de la ruta
  queryParams = this.activatedRoute.snapshot.queryParamMap.get('region') ?? ''; 

  // * Creamos una senal que se va a actualizar cada vez que el usuario escriba algo
  // * linkedSignal nos permite crear una señal que se actualiza automaticamente cuando cambia el valor de la señal a la que esta vinculada
  selectedRegion = linkedSignal<Region>(() => isValidRegion(this.queryParams));

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  // selectedRegion = signal<Region | null>(null);

  countrysResource = rxResource({
    request: () => ({ region: this.selectedRegion() }),
    loader:  ({ request }) => {

      if (!request.region) return of([]);

      // actualizamos la url
      this.router.navigate(['/country/by-region'], {
        queryParams: { region: request.region }
      });
    
      return this.countryService.searchByRegion(request.region)
    }
  });
}
