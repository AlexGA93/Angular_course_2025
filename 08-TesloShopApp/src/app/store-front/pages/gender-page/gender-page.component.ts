import { Component, inject } from "@angular/core";
import { rxResource, toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute } from "@angular/router";
import { ProductCardComponent } from "@products/components/product-card/product-card.component";
import { ProductsService } from "@products/services/products.service";
import { map } from "rxjs";

@Component({
   selector: "app-gender-page",
   imports: [ProductCardComponent],
   templateUrl: "./gender-page.component.html",
})
export class GenderPageComponent {
   // obtenemos la informacion de seccion de la url de forma dinamica, por lo que necesitamos un observavble una signal reactiva

   activatedRoute = inject(ActivatedRoute);
   productsService = inject(ProductsService);

   gender = toSignal(
      this.activatedRoute.params.pipe(map(({ gender }) => gender))
   );

   // Para hacer la peticion HTTP tan pronto se ingrese en el componente
  productsResource = rxResource({
    request: () => ({ gender: this.gender() }),
    loader: ({ request }) => this.productsService.getProducts({ gender: request.gender }),
  });
}
