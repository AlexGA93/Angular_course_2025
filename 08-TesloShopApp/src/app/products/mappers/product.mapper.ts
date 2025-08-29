import { MappedProduct } from "@products/interfaces/mapped-product.interface";
import { Product } from "@products/interfaces/product.interface";

export class ProductMapper {
   // funcion de mappeo
   static mapProductToMappedProduct(product: Product): MappedProduct {
      const {
         id,
         title,
         price,
         description,
         slug,
         stock,
         sizes,
         gender,
         tags,
         images,
      } = product;

      return {
         id,
         title,
         price,
         desc: product.description,
         slug,
         stock,
         sizes,
         gender,
         tags,
         images,
      };
   }

   // funcion que recibe el objeto de productos y llama a la funcion de mappeo
   static mapProductsToMappedProducts(products: Product[]): MappedProduct[] {
      // llamada a la funcion de mappeo
      return products.map((product) => this.mapProductToMappedProduct(product));
   }
}
