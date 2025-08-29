import { Pipe, type PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment.development';

const baseUrl: string = environment.baseUrl;

@Pipe({
  name: 'productImage',
})
export class ProductImagePipe implements PipeTransform {

  // En esta pipe vamos a comprobar que se nos pase o bien el arreglo de nombres de imagenes o una sola. Puede que no llegue ninguna, por lo que deberemos asociar la imagen de assets como placeholder en caso de que no venga foto alguna
  transform(value: string | string[]): string {
    
    if( typeof value === 'string' ) return `${baseUrl}/files/product/${value}`;

    // nos hacemos con la primera posicion del array
    const image = value.at(0);

    // comporbamos si es necesario enviar la imagen placeholder o no
    if(!image) return './assets/images/no-image.jpg';

    // caso en el que es una sola imagen
    return `${baseUrl}/files/product/${image}`;
  }

}
