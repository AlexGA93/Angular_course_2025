import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import SideMenuComponent from '../shared/side-menu/side-menu.component';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, SideMenuComponent],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export default class DashboardComponent {

}
