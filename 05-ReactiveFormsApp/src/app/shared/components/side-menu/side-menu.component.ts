import { Component } from '@angular/core';
import { reactiveRoutes } from '../../../reactive/reactive.routes';
import { MenuItem } from '../../../interfaces/side.interfaces';
import { JsonPipe, TitleCasePipe } from '@angular/common';
import { Route, RouterLink, RouterLinkActive } from '@angular/router';
import { authRoutes } from '../../../auth/auth.routes';
import { countryRoutes } from '../../../country/country.routes';

const authItems = authRoutes[0].children ?? [];
const countryItems = countryRoutes ?? [];
const reactiveItems = reactiveRoutes[0].children ?? [];

@Component({
  selector: 'shared-side-menu',
  imports: [RouterLink, RouterLinkActive, TitleCasePipe],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {

  // creamos una variable de tipo MenuItem que contiene los datos de las rutas declaradas
  public authMenu: MenuItem[] = this.filterRoutes(authItems)
  .map(item => ({
    route: `auth/${ item.path }`,
    title: `${ item.path}`
  }));

  // creamos una variable de tipo MenuItem que contiene los datos de las rutas declaradas
  public countryMenu: MenuItem[] = this.filterRoutes(countryItems)
  .map(item => ({
    route: `country/${ item.path }`,
    title: `${ item.path ? item.path : 'Paises' }`
  }));

  // creamos una variable de tipo MenuItem que contiene los datos de las rutas declaradas
  public reactiveMenu: MenuItem[] = this.filterRoutes(reactiveItems)
  .map(item => ({
    route: `reactive/${ item.path }`,
    title: `${ item.title }`
  }));

  private filterRoutes(routes: Route[]) {
    return routes.filter(item => item.path !== '**')
  }
}
