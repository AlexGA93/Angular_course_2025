import { Component, input } from '@angular/core';
import { RestCountry } from '../../interfaces/country.interface';

@Component({
  selector: 'country-list',
  imports: [],
  templateUrl: './country-list.component.html',
  styles: ``
})
export class CountryListComponent {
  countries = input.required<RestCountry[]>();
}
