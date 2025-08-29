import { Routes } from "@angular/router";
import { StoreFrontLayoutComponent } from "./layouts/store-front-layout/store-front-layout.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { GenderPageComponent } from "./pages/gender-page/gender-page.component";
import { ProductPageComponent } from "./pages/product-page/product-page.component";
import { NotFoundPageComponent } from "./pages/not-found-page/not-found-page.component";

export const storeFrontRoutes: Routes = [
    {
        path: '',
        component: StoreFrontLayoutComponent,
        children: [
            // ruta por defecto dentro de la ruta padre (la cual es la ruta por defecto de la aplicacion) "/"
            {
                path: '',
                component: HomePageComponent
            },
            // pagina de genero pasandole en la ruta el genero
            {
                path: 'gender/:gender',
                component: GenderPageComponent
            },
            // pagina de producto pasandole el producto en la ruta
            {
                path: 'product/:idSlug',
                component: ProductPageComponent
            },
            // ! En caso de que no pongamos una ruta valida, redireccionamos a pagina 'Not Found'
            {
                path: '**',
                component: NotFoundPageComponent
            }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];

export default storeFrontRoutes;