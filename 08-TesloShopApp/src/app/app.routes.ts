import { Routes } from '@angular/router';
import { isAdminGuard } from '@auth/guards/is-admin.guard';
import { notAuthenticatedGuard } from '@auth/guards/not-authenticated.guard';

export const routes: Routes = [
    // authentication
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes'),
        // * Guards
        canMatch: [
            notAuthenticatedGuard
        ]
    },
    // path para usuarioss admin
    {
        path: 'admin',
        loadChildren: () => import('./admin-dashboard/admin-dashboard.routes'),
    },
    // path vacio deberia ser el ultimo para que pase primero por las demas rutas
    {
        path: '',
        loadChildren: () => import('./store-front/store-front.routes')
        
    }
];
