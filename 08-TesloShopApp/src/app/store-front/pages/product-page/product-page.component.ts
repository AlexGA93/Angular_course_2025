import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '@products/services/products.service';
import { FrontLoaderComponent } from '../../components/front-loader/front-loader.component';
import { ProductCarouselComponent } from "@products/components/product-carousel/product-carousel.component";

@Component({
  selector: 'app-product-page',
  imports: [FrontLoaderComponent, ProductCarouselComponent],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent { 
  /* * NECESITAMOS EXTRAER LA INFORMACION DE LA URL Y CON ELLA LLAMAR A LA FUNCION DEL SERVICIO PARA OBTENER LOS DATOS DEL PRODUCTO */

  activatedRoute = inject(ActivatedRoute);
  productService = inject(ProductsService);

  // accedemos a los campos de los parametros de la url
  productIdSlug = this.activatedRoute.snapshot.params["idSlug"];

  // mediante un rxResource nos encargamos de llamar a la peticion del servicio en el momento obtenemos los parametros de la url
  productResource = rxResource({
    request: () => ({ idSlug:this.productIdSlug }),
    loader: ({ request }) => this.productService.getProductByIdSlug(request.idSlug)
  });
}
