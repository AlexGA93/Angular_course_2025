import { Component } from '@angular/core';
import {RouterModule} from '@angular/router';
import {routes} from '../../app.routes';
import {LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-side-menu',
  imports: [RouterModule, LucideAngularModule],
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
class SideMenuComponent {
  /**
   * En este componente se implementara el menu lateral de la aplicacion
   * con enlacesa las diferentes sdecciones.
   *
   *  ! IMPORTANTE !
   *  Si las secciones del menu fueran definidas por el usuario usariamos signals
   */

  public menuItems = routes
    .map(route => route.children ?? [])
    // aplanamos el array de arrays en un solo array
    .flat()
    .filter(route => route && route.path)
    .filter(route => !route.path?.includes(':'))
  ;
}

export default SideMenuComponent
