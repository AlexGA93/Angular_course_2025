import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { MappedProduct, MappedProductsResponse } from '@products/interfaces/mapped-product.interface';
import { Product, ProductOptions, ProductsResponse } from '@products/interfaces/product.interface';
import { ProductMapper } from '@products/mappers/product.mapper';
import { delay, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // inyeccion de servicio HTTP
  private http = inject(HttpClient);

  // base url
  private _baseUrl = signal<string>(environment.baseUrl);

  // declaramos un Map para guardar un cache de productos
  private productsCache = new Map<string, MappedProductsResponse>();
  private productCache = new Map<string, MappedProduct>();

  // funciones
  getProducts(options: ProductOptions): Observable<MappedProductsResponse>{
    
    const { limit=9, offset=0, gender='' } = options;

    // conformamos un array con la informacion de las opciones
    const key: string = `${limit}-${offset}-${gender}`;

    // comprobamos si tiene los mismos valores
    if(this.productsCache.has(key)) {
      // devolvemos el objetocon la informacion almacenada en cache en lugar de hacer la peticion
      return of(this.productsCache.get(key)!);
    }

    return this.http.get<ProductsResponse>(`${this._baseUrl()}/products`, {
      params: {limit, offset, gender}
    })
    // mappeamos la respuesta por lo que usamos RxJs para interceptar y operar con la respuesta
    .pipe(
      map((productsResponse: ProductsResponse) => ({...productsResponse, products: ProductMapper.mapProductsToMappedProducts(productsResponse.products)})),
      // tap((resp) => console.log(resp)),
      // cuando hagamos la peticion y tengamos la informacion, la guardamos en cache
      tap((resp) => this.productsCache.set(key, resp))
    )
    ;
  }

  getProductByIdSlug(idSlug: string): Observable<MappedProduct> {

    // comprobamos si tiene los mismos valores
    if(this.productCache.has(idSlug)) {
      // devolvemos el objetocon la informacion almacenada en cache en lugar de hacer la peticion
      return of(this.productCache.get(idSlug)!);
    }
    return this.http.get<Product>(`${this._baseUrl()}/products/${idSlug}`)
    .pipe(
      // en caso de que no venga con ninguna imagen devolvemos un array vacio
      map(product => ({ ...product, images: product.images ?? [], desc: product.description })),
      // delay(2000),
      // tap(result => console.log(result)),
      // cuando hagamos la peticion y tengamos la informacion, la guardamos en cache
      tap((product) => this.productCache.set(idSlug, product))
    )
  }
}
