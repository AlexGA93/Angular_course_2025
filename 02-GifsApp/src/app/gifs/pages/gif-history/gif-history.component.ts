import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { GifsService } from '../../services/gifs.service';
import { GifsListComponent } from "../../components/gifs-list/gifs-list.component";

@Component({
  selector: 'app-gif-history',
  imports: [GifsListComponent],
  templateUrl: './gif-history.component.html',
  styles: ``
})
export default class GifHistoryComponent {
  gifService = inject(GifsService);
  // obtenemos la query de la ruta
  // query = inject(ActivatedRoute).params.subscribe((parameters) => {
  //   console.log(parameters['query']);
    
  // })
  query = toSignal(inject(ActivatedRoute).params.pipe(map((params) => params['query'])));

  gifsByKey = computed(() => this.gifService.getHistoryGifs(this.query()));
}
