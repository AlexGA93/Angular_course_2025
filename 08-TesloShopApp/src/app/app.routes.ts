import { Routes } from '@angular/router';

export const routes: Routes = [
    // store-front routes ( default )
    {
        path: '',
        loadChildren: () => import('./store-front/store-front.routes')
        
    }
];
