import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { MappedProductsResponse } from '@products/interfaces/mapped-product.interface';
import { Product, ProductOptions, ProductsResponse } from '@products/interfaces/product.interface';
import { ProductMapper } from '@products/mappers/product.mapper';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // inyeccion de servicio HTTP
  private http = inject(HttpClient);

  // base url
  private _baseUrl = signal<string>(environment.baseUrl);

  // funciones
  getProducts(options: ProductOptions): Observable<MappedProductsResponse>{
    console.log(options);
    
    const { limit=9, offset=0, gender='' } = options;

    return this.http.get<ProductsResponse>(`${this._baseUrl()}/products`, {
      params: {limit, offset, gender}
    })
    // mappeamos la respuesta por lo que usamos RxJs para interceptar y operar con la respuesta
    .pipe(
      map((productsResponse: ProductsResponse) => ({...productsResponse, products: ProductMapper.mapProductsToMappedProducts(productsResponse.products)}))
    )
    ;
  }

  getProductByIdSlug(idSlug: string) {
    return this.http.get<Product>(`${this._baseUrl()}/products/${idSlug}`)
    .pipe(
      // en caso de que no venga con ninguna imagen devolvemos un array vacio
      map(product => ({ ...product, images: product.images ?? [] })),
      tap(result => console.log(result)),
    )
  }
}
