import { Component, inject } from "@angular/core";
import { rxResource, toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute } from "@angular/router";
import { ProductCardComponent } from "@products/components/product-card/product-card.component";
import { MappedProduct } from "@products/interfaces/mapped-product.interface";
import { ProductsService } from "@products/services/products.service";
import { map } from "rxjs";
import { NotFoundPageComponent } from "../not-found-page/not-found-page.component";
import { FrontNotFoundComponent } from "@store-front/components/front-not-found/front-not-found.component";
import { PaginationService } from "@shared/services/pagination.service";
import { PaginationComponent } from "@shared/components/pagination/pagination.component";

@Component({
   selector: "app-gender-page",
   imports: [ProductCardComponent, FrontNotFoundComponent, PaginationComponent],
   templateUrl: "./gender-page.component.html",
})
export class GenderPageComponent {
   // obtenemos la informacion de seccion de la url de forma dinamica, por lo que necesitamos un observavble una signal reactiva

   activatedRoute = inject(ActivatedRoute);
   productsService = inject(ProductsService);
   // inyectamos el servicio de paginacion
   paginationService = inject(PaginationService);

   getCurrentPage() {
      return this.paginationService.currentPage();
   }

   gender = toSignal(
      this.activatedRoute.params.pipe(map(({ gender }) => gender))
   );

   // Para hacer la peticion HTTP tan pronto se ingrese en el componente
   productsResource = rxResource({
      request: () => ({ gender: this.gender(), offset: this.getCurrentPage() - 1 }),
      loader: ({ request }) =>
         this.productsService.getProducts({ gender: request.gender, offset: request.offset }),
   });

   getRxResourceProducts(): MappedProduct[] {
      return this.productsResource.value()?.products ?? [];
   }
}
