import { Component, inject, signal } from '@angular/core';
import { GifsListComponent } from '../../components/gifs-list/gifs-list.component';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifsListComponent],
  templateUrl: './search-page.component.html',
  styles: ``
})
export default class SearchPageComponent {

  // inyectamos servicio GifsService
  gifService = inject(GifsService);
  // signals 
  gifs = signal<Gif[]>([]);

  onSearch(query: string) {
    this.gifService.searchGifs(query).subscribe((response) => this.gifs.set(response));
  }

}
