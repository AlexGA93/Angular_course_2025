import { Component, inject, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountrySearchInputComponent } from '../../components/country-search-input/country-search-input.component';
import { CountryServiceService } from '../../services/country-service.service';
import { RestCountry } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountrySearchInputComponent,CountryListComponent],
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {

  countryService = inject(CountryServiceService);

  isLoading = signal(false);
  isError   = signal<string | null>(null);
  countries = signal<RestCountry[]>([]);

  searchByCapital(query: string) {
    // * 1- if loading is running do nothing
    if(this.isLoading()) return;
    // * 2- set loading to true
    this.isLoading.set(true);
    // * 3- set error to null
    this.isError.set(null);


    this.countryService.searchByCapital(query)
    .subscribe((countries: RestCountry[]) => {
      
      this.isLoading.set(false);
      
      this.countries.set(countries);
      
    });
  }

}
