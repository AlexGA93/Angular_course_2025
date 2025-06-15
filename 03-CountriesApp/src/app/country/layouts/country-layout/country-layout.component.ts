import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopMenuComponent } from '../../components/top-menu/top-menu.component';

@Component({
  selector: 'app-country-layout',
  imports: [RouterOutlet, TopMenuComponent],
  templateUrl: './country-layout.component.html',
  styles: ``
})
export class CountryLayoutComponent {

}
