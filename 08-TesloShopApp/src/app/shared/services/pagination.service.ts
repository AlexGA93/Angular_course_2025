import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  // inyeccion de servicio Activatedroute para sacar de la url la pagina en la que estaremos
  private activatedRoute = inject(ActivatedRoute);

  // declaramos una signal de la pagina actual (para ello debemos suscribirnos a un observable)
  // lo sacamos de 'http://localhost:4200/?page=5'
  currentPage = toSignal(
    this.activatedRoute.queryParamMap
    .pipe(
      map( params => (params.get('page') ? +params.get('page')! : 1)),
      // puede que se de el caso en el que no llegue un numero, por lo que tratamos este caso
      map((page) => (isNaN(page) ? 1 : page))
    ),
    // en caso de que lo que nos llegue no sea un numero o sea un valor incorrecto, inicializamos a 1 por defecto
    { initialValue: 1 }
  )
}
