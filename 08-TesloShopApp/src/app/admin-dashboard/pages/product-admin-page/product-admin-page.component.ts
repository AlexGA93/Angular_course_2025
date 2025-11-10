import { JsonPipe } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '@products/services/products.service';
import { map } from 'rxjs';
import { ProductDetailsComponent } from './product-details/product-details.component';

@Component({
  selector: 'app-product-admin-page',
  imports: [ProductDetailsComponent],
  templateUrl: './product-admin-page.component.html',
})
export class ProductAdminPageComponent {
  // inyecciones
  activatedRouted = inject(ActivatedRoute);
  router = inject(Router);
  productService = inject(ProductsService);

  // signals
  // necesitamos capturar el supuesto id para evitar errores en rutas
  productId = toSignal(this.activatedRouted.params.pipe(
    map(params => params['id'])
  ))

  // necesitamos la data del procusto
  productResource = rxResource({
    request: () => ({ id: this.productId()}),
    loader: ({ request }) => this.productService.getProductById(request.id)
  });

  // declaramos efecto para redirigir al usuarui en caso de error
  redirectError = effect(() => {
    if(this.productResource.error()) {
      this.router.navigateByUrl('/admin/products');
    }
  });
}
