import { Component, input, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
  styles: ``
})
export class CountrySearchInputComponent {
  receivedPlaceholder = input<string>('Search');
  searchInput         = output<string>();

}
