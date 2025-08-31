// import { ProductCardComponent } from '../../../products/components/product-card/product-card.component';

import { Component, inject, signal } from '@angular/core';
import { ProductCardComponent } from '@products/components/product-card/product-card.component';
import { ProductsService } from '@products/services/products.service';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { FrontNotFoundComponent } from '@store-front/components/front-not-found/front-not-found.component';
import { MappedProduct } from '@products/interfaces/mapped-product.interface';
import { PaginationComponent } from "@shared/components/pagination/pagination.component";
import { PaginationService } from '@shared/services/pagination.service';

@Component({
  selector: 'app-home-page',
  imports: [ProductCardComponent, FrontNotFoundComponent, PaginationComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

  // inyeccion de servicio http
  productsService = inject(ProductsService);
  // inyectamos el servicio de paginacion
  paginationService = inject(PaginationService);

  getCurrentPage() {
    return this.paginationService.currentPage();
  }

  // Para hacer la peticion HTTP tan pronto se ingrese en el componente
  productsResource = rxResource({
    // asociamos el valor de la pagina actual desde la variable
    request: () => ({ page: this.getCurrentPage() - 1 }),
    // loader
    loader: ({ request }) => {
      // incorporamos el valor de dicha pagina * 9 porque queremos que en cada pagina se visualicen 9 (escogemos en bloques de 9 productos a mostrar)
      return this.productsService.getProducts({ offset: request.page * 9 });
    }
  });

  getRxResourceProducts(): MappedProduct[] {
    return this.productsResource.value()?.products ?? [];
  }

}