import { Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';

export const routes: Routes = [
    // ruta home disponible para todos los usuarios
    {
        path: '',
        component: HomePageComponent
    },
    // ruta de paises que tendra rutas hijas
    {
        path: 'country',
        loadChildren: () => import('./country/country.routes').then(m => m.countryRoutes)
    },
    // ruta por defecto para redirigir a la ruta home
    {
        path: '**',
        redirectTo: ''
    }
];
