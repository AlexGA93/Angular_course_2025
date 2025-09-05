import { Routes } from "@angular/router";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { RegisterPageComponent } from "./pages/register-page/register-page.component";

export const authRoutes: Routes = [
    // unica ruta base del layout en el cual llamamos a las rutas hijas del layout
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            // login
            { path: 'login', component: LoginPageComponent },
            // register
            { path: 'register', component: RegisterPageComponent },
            // por defecto
            { path: '**', redirectTo: 'login' }
        ]
    }
];

export default authRoutes;