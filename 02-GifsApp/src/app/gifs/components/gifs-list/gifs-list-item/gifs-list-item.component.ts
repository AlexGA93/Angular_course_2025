import { Component, input } from '@angular/core';

@Component({
  selector: 'gifs-list-item',
  imports: [],
  templateUrl: './gifs-list-item.component.html',
  styles: ``
})
export class GifsListItemComponent {
  // recibido del padre
  imageUrl = input.required<string>();
}
