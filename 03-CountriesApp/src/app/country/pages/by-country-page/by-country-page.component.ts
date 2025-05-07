import { Component, input } from '@angular/core';
import { CountrySearchInputComponent } from '../../components/country-search-input/country-search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';

@Component({
  selector: 'app-by-country-page',
  imports: [CountrySearchInputComponent,CountryListComponent],
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent {
  receivedValue = input<string>();
}
