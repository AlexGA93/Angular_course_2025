import { Component, input, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-title',
  imports: [],
  templateUrl: './title.component.html',
})
export class TitleComponent {
  title = input.required<string>();

  // ngOnChanges: se llama cuando una propiedad vinculada a datos cambia
  ngOnChanges( changes: SimpleChanges ) {
    for (const inputName in changes) {
      const change = changes[inputName];
      console.log(`Previous ${inputName} == ${change.previousValue}`);      
      console.log(`Current ${inputName} == ${change.currentValue}`);      
      console.log(`Is first ${inputName} change == ${change.firstChange}`);

      
      const prev = JSON.stringify(change.previousValue);
      const curr = JSON.stringify(change.currentValue);
      console.log(`ngOnChanges - ${inputName} ha cambiado de ${prev} a ${curr}`);
    }
  }
}
