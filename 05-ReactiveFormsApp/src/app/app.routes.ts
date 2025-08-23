import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "auth",
        loadChildren: () => import("./auth/auth.routes").then(module => module.authRoutes)
    },
    {
        path: "country",
        loadChildren: () => import("./country/country.routes").then(module => module.countryRoutes)
    },
    {
        path: "reactive",
        loadChildren: () => import("./reactive/reactive.routes").then(module => module.reactiveRoutes)
    },
    {
        path: "**",
        redirectTo: "reactive"
    }
];
