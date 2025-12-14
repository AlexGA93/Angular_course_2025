import {
   AfterViewInit,
   Component,
   ElementRef,
   input,
   OnChanges,
   SimpleChanges,
   viewChild,
} from "@angular/core";

import { Navigation, Pagination } from "swiper/modules";

// import Swiper JS
import Swiper from "swiper";
// import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ProductImagePipe } from "@products/pipes/product-image.pipe";

@Component({
   selector: "product-carousel",
   imports: [ProductImagePipe],
   templateUrl: "./product-carousel.component.html",
   styles: `
  .swiper{
    width: 100%;
    height: 500px;
  }
  `,
})
export class ProductCarouselComponent implements AfterViewInit, OnChanges {
   // * Necesitamos estar pendientes de los cambios en el arreglo de imagenes que se le pasa al componente desde el padre (OnChanges)
   images = input.required<string[]>();
   // tenemos a referencia del html
   swiperDiv = viewChild.required<ElementRef>("swiperDiv");

   // creamos propiedad swiper
   swiper: Swiper | undefined = undefined;

   ngOnChanges(changes: SimpleChanges): void {
      // si se ha producido el primer cambio no hago nada
      if(changes['images'].firstChange) return;

      // primero comprobamos que exista n swiper
      if(!this.swiper) return;
      
      // si ya existe, llamamos al metodo destroy para limpiar la instancia anterior y estilos
      this.swiper.destroy(true, true);

      // accedemos a la propiedad paginacion del swiper antes de reiniciarlo
      const paginationElement = this.swiperDiv().nativeElement.querySelector('.swiper-pagination');
      
      // limpiamos el contenido de la paginacion
      paginationElement.innerHTML = '';

      // volvemos a inicializar el swiper
      setTimeout(() => {
         this.swiperInit();
      }, 100);
   }

   ngAfterViewInit(): void {
      // inicializamos el swiper
      this.swiperInit();
   }

   /**
    * @description Inicializa el carrusel de productos una vez que la vista ha sido cargada
    * @returns void
    */

   swiperInit() {
      const element = this.swiperDiv().nativeElement;

      if (!element) return;

      // console.log(element);
      this.swiper = new Swiper(element, {
         // Optional parameters
         direction: "horizontal",
         loop: true,

         modules: [
          Navigation, Pagination
         ],

         // If we need pagination
         pagination: {
            el: ".swiper-pagination",
         },

         // Navigation arrows
         navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
         },

         // And if we need scrollbar
         scrollbar: {
            el: ".swiper-scrollbar",
         },
      });
   }
}
