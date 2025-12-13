import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '@auth/interfaces/user.interface';
import { MappedProduct, MappedProductsResponse } from '@products/interfaces/mapped-product.interface';
import { Gender, Product, ProductOptions, ProductsResponse } from '@products/interfaces/product.interface';
import { ProductMapper } from '@products/mappers/product.mapper';
import { delay, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

// construimos un objeto de producto vacio
const emptyProduct : MappedProduct = {
  id: 'new',
  title: '',
  price: 0,
  desc: '',
  slug: '',
  stock: 0,
  sizes: [],
  gender: Gender.Men,
  tags: [],
  images: [],
  user: {} as User
};

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

  getProductById(id: string): Observable<MappedProduct> {

    // primera comprobacion pro si fuera un nuevo producto
    if(id === 'new') {
      return of(emptyProduct);
    }

    // comprobamos si tiene los mismos valores
    if(this.productCache.has(id)) {
      // devolvemos el objetocon la informacion almacenada en cache en lugar de hacer la peticion
      return of(this.productCache.get(id)!);
    }
    return this.http.get<Product>(`${this._baseUrl()}/products/${id}`)
    .pipe(
      // en caso de que no venga con ninguna imagen devolvemos un array vacio
      map(product => ({ ...product, images: product.images ?? [], desc: product.description })),
      // delay(2000),
      // tap(result => console.log(result)),
      // cuando hagamos la peticion y tengamos la informacion, la guardamos en cache
      tap((product) => this.productCache.set(id, product))
    )
  }

  updateProduct(id: string, productLike: Partial<MappedProduct>):Observable<MappedProduct> {
    // console.log("Updating product...", productLike);
    return this.http.patch<MappedProduct>(`${this._baseUrl()}/products/${id}`, productLike)
    .pipe(
      tap(product => this.updateProductCache(product))
    )
  }

  // funcion para actualizar la cache a la hora de actualizar un producto
  updateProductCache(product: MappedProduct) {
    // obtenemos el id del producto
    const productId = product.id;

    // actualizamos el cache de producto
    this.productCache.set(productId, product);

    // actualizamos el cache de productos
    this.productsCache.forEach(productResponse => {
      // sustituimos el producto actualizado en el array de productos
      productResponse.products = productResponse.products.map(currentProduct => currentProduct.id === productId ? product : currentProduct);
    });
  }

  createProduct(productLike: MappedProduct): Observable<MappedProduct> {
    console.log({productLike});
    
    return this.http.post<MappedProduct>(`${this._baseUrl()}/products`, productLike)
    .pipe(
      tap(product => this.updateProductCache(product))
    );
  }

}
