import { Component, input, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
  styles: ``
})
export class CountrySearchInputComponent {
  placeholder = input('Buscar');
  value = output<string>();
}
