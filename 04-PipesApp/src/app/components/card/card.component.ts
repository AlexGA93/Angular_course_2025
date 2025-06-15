import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styles: ``
})
export class CardComponent {
  title = input.required<string>();
}
