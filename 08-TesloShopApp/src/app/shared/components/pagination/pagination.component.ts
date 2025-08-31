import { Component, computed, input, linkedSignal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagination',
  imports: [RouterLink],
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  // declaramos dos inputs con los datos del backend necesarios
  pages       = input<number>(0);
  currentPage = input<number>(1);
  
  // signals
  activePage = linkedSignal(this.currentPage);

  // creamos una signal computada que devuelva un array creado a partir del numero de paginas enviadas desde el input y asociamos mediante un callback el numero como el indice de dicho array +1
  getPagesList = computed(() => {
    return Array.from({ length: this.pages() }, (_, i) => i+1);
  });
}
