import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductTableComponent } from '@products/components/product-table/product-table.component';
import { ProductsService } from '@products/services/products.service';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { PaginationService } from '@shared/services/pagination.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-products-admin-page',
  imports: [ProductTableComponent, PaginationComponent, RouterLink],
  templateUrl: './products-admin-page.component.html',
})
export class ProductsAdminPageComponent {
  // inyectamos servicio de productos
  productsService = inject(ProductsService);
  // inyectamos el servicio de paginacion
  paginationService = inject(PaginationService);
 // signal para controlar el valor de productos como limite
  productsPerPage = signal<number>(10);

  getCurrentPage() {
    return this.paginationService.currentPage();
  }

  // mediante el servicio de productos usamos el rxResource para tramitar el proceso de llamada HTTP
  productsResource = rxResource({
    // request
    request: () => ({  page: this.getCurrentPage() - 1, limit: this.productsPerPage()  }),
    // loader
    loader: ({ request }) => {
      // incorporamos el valor de la operacion anterior y llamamos al metodo deseaso
      // en este caso queremos sacar los productos del servicio
      return this.productsService.getProducts({ offset: request.page * 9, limit: request.limit });
    }
  });

  // funcion para extraer el valor de los productos
  getRxResourceProducts() {
    return this.productsResource.value()?.products ?? [];
  }

  onProductsPerPageChange(event: number) {
    this.productsPerPage.set(+event);
  } 
}
