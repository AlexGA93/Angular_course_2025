import { AfterViewInit, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';

@Component({
  selector: 'app-trending-page',
  // imports: [GifsListComponent],
  templateUrl: './trending-page.component.html',
  styles: ``
})
export default class TrendingPageComponent implements AfterViewInit {

  // cuando la vista (componentes hijos) se inicializan, se ejecuta el ngAfterViewInit
  ngAfterViewInit(): void {
    // movemos el scroll al estado guardado en el servicio
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;
    
    scrollDiv.scrollTop = this.scrollStateService.getTrendingScrollState();
  }

  // * inyeccion de servicios
  gifService          = inject(GifsService);
  scrollStateService  = inject(ScrollStateService);
  
  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv'); // referencia al div del scroll

  onScroll() {
    // extraemos el elemento del DOM
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    
    // si el scrollDiv no existe finalizamos la funcion
    if (!scrollDiv) return;
    
    const { scrollTop, clientHeight, scrollHeight } = scrollDiv;

    // console.log({ scrolltotal: scrollTop + clientHeight, scrollHeight });

    // situamos el final del scroll (con un margen)
    const isAtBottom = scrollTop + clientHeight + 30 >= scrollHeight;

    this.scrollStateService.setTrendingScrollState(scrollTop); // guardamos el scroll en el servicio

    // cargamos la siguiente pagina de gifs cuando estamos cerca del final del scroll
    if (isAtBottom) {
      this.gifService.loadTrendingGifs();
    }
    
    
  }
}
