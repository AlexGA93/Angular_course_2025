import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
  styles: ``
})
export class CountrySearchInputComponent {
  placeholder = input('Buscar');
  debounceTime = input<number>(300);
  initialValue = input<string>('');

  value = output<string>();

  // * Creamos una senal que se va a actualizar cada vez que el usuario escriba algo
  // * linkedSignal nos permite crear una señal que se actualiza automaticamente cuando cambia el valor de la señal a la que esta vinculada
  inputValue = linkedSignal<string>(() => this.initialValue());
 
  /**
   * Un efecto es una operacion que se ejecuta al menos una vez
   * (similar al ngOninit) pero si se usa alguna signal y esa cambia,
   * el efecto se vuelve a ejecutar
   * 
   * creamos un efecto para que se aplique un 'efecto' cada vez que el usuario escriba algo
  */
  debounceEffect = effect((onCleanup) => {
    // * cuando cambie el valor de inputValue, recogemos el valor cambiado
    const value = this.inputValue();
    // * isnertamos un timeout para que se ejecute la funcion despues de 500ms
    const timeout = setTimeout(() => {
      // * emitimos el valor del input al componente padre
      this.value.emit(value);
    }, this.debounceTime());

    // * limpiamos el timeout cuando se destruya el efecto
    onCleanup(() => {
      clearTimeout(timeout);
    });
  });

}
