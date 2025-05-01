import { Component } from '@angular/core';
import { environment } from '@environments/environment';

@Component({
  selector: 'gifs-side-menu-header',
  imports: [],
  templateUrl: './side-menu-header.component.html',
  styles: ``
})
export class GifsSideMenuHeaderComponent {
  public envs = environment;
}
