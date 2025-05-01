import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GifsSideMenuComponent } from '../../components/side-menu/side-menu.component';

@Component({
  selector: 'app-dashboard-page',
  imports: [RouterOutlet, GifsSideMenuComponent],
  templateUrl: './dashboard-page.component.html'
})

// export 'default' para poder importarlo en las rutas en forma de carga perezosa sin promesa
export default class DashboardPageComponent {

}
