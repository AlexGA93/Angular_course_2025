import { Component } from '@angular/core';
import { GifsSideMenuHeaderComponent } from '../side-menu-header/side-menu-header.component';
import { GifsSideMenuOptionsComponent } from '../side-menu-options/side-menu-options.component';

@Component({
  selector: 'gifs-side-menu',
  imports: [GifsSideMenuHeaderComponent, GifsSideMenuOptionsComponent],
  templateUrl: './side-menu.component.html',
  styles: ``
})
export class GifsSideMenuComponent {

}
