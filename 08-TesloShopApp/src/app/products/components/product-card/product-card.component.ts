import { SlicePipe, UpperCasePipe } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MappedProduct } from '@products/interfaces/mapped-product.interface';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';
import { ProductsService } from '@products/services/products.service';


@Component({
  selector: 'product-card',
  imports: [RouterLink, UpperCasePipe, SlicePipe, ProductImagePipe],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  // inyectamos el servicio
  productsService = inject(ProductsService)
  
  // declaramos el input
  product = input.required<MappedProduct>();

  // creamos una signal computada para que contenga la url con la imagen del producto
  imageUrl = computed(() => `http://localhost:3000/api/files/product/${this.product().images[0]}`)
}
