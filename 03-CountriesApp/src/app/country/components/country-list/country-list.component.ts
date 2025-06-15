import { Component, input } from '@angular/core';
import { RestCountry } from '../../interfaces/country.interface';
import { Country } from '../../interfaces/custom-country.interface';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'country-list',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './country-list.component.html',
  styles: ``
})
export class CountryListComponent {
  recievedListCountries = input<Country[]>([]);

  errorMessage = input<string | unknown | null>();
  isLoading = input<boolean>(false);
  isEmpty = input<boolean>(false);
}
