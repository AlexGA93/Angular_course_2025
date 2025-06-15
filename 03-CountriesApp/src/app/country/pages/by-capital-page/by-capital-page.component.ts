import { Component, inject, resource, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountrySearchInputComponent } from '../../components/country-search-input/country-search-input.component';
import { CountryServiceService } from '../../services/country-service.service';
import { RestCountry } from '../../interfaces/country.interface';
import { Country } from '../../interfaces/custom-country.interface';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountrySearchInputComponent,CountryListComponent],
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {

  // inyectamos el servicio
  countryService = inject(CountryServiceService);

  // signals
  countries = signal<Country[]>([]);
  isLoading = signal<boolean>(false);
  hasError  = signal<string | null>(null);

  onSearch1(value: string) {
    // para evitar saturar, evitamos tramitar mientras este cargando
    if (this.isLoading()) return;
    // activamos el loading
    this.isLoading.set(true);
    // limpiamos el error
    this.hasError.set(null);
    // llamamos al servicio
    this.countryService.searchByCapital(value)
    // .subscribe((countries: Country[]) => {
    //   // desactivamos el loading
    //   this.isLoading.set(false);
    //   // asignamos los resultados
    //   this.countries.set(countries);

    //   console.log({ countries });
    // });
    .subscribe({
      next: (countries: Country[]) => {
        // desactivamos el loading
        this.isLoading.set(false);
        // asignamos los resultados
        this.countries.set(countries);
      },
      error: (err) => {
        // desactivamos el loading
        this.isLoading.set(false);
        // asignamos el error
        this.hasError.set(err);
        // asignamos el array de paises vacio
        this.countries.set([]);
      }
    });
  }

  // ! FUNCION ERN LAQUE NOS AHORRAMOS MUCHO CODIGO MEDIANTE RESOURCES (SOLO V.18 EN ADELANTE)

  query = signal<string>('');
  // creamos el resource
  countrysResource = resource({
    // funcion que se ejecuta al inicializar el resource 
    request: () => ({ query: this.query() }),
    // funcion asincrona que se ejecuta al cargar el resource
    loader: async({ request }) => {
      if (!request.query) return [];
      
      return await firstValueFrom(
        this.countryService.searchByCapital(request.query)
      );
    }
  });

}
