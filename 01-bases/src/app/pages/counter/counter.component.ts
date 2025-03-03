import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.component.html',
  styles: ``
})
export class CounterComponent {

  public counter: number = 10;
  // signal with default value
  public counterSignal = signal(10); // WritableSignal<number>


  public operateCounter(mode: boolean=false) {
    if (mode){
      this.counter += 1;
      // use 'update' to asign an arrow function and modify the signal value
      this.counterSignal.update(currentValue => currentValue + 1);
    }else{
      this.counter -= 1;
      this.counterSignal.update(currentValue => currentValue - 1);
    }
  }

  public reset() {
    this.counter = 10;
    // signal assignation with 'set', but if wee depend of a previous value we use better 'update' 
    this.counterSignal.set(0);
  }
}
