// import { ProductCardComponent } from '../../../products/components/product-card/product-card.component';

import { Component, inject, signal } from '@angular/core';
import { ProductCardComponent } from '@products/components/product-card/product-card.component';
import { ProductsService } from '@products/services/products.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { JsonPipe } from '@angular/common';
import { MappedProductsResponse } from '@products/interfaces/mapped-product.interface';

@Component({
  selector: 'app-home-page',
  imports: [ProductCardComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

  // inyeccion de servicio http
  productsService = inject(ProductsService);

  // Para hacer la peticion HTTP tan pronto se ingrese en el componente
  productsResource = rxResource({
    request: () => ({}),
    // loader
    loader: ({ request }) => {
      return this.productsService.getProducts({});
    }
  });

}