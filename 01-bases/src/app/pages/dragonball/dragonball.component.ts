import { NgClass } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { Character } from '../../components/interfaces/character.interface';

@Component({
  selector: 'app-dragonball',
  imports: [],// [NgClass],
  templateUrl: './dragonball.component.html',
  styleUrl: './dragonball.component.css'
})
export class DragonballComponent {

  // creamos senales para que guarden el valor del los elementos input
  name = signal('');
  power = signal(0);

  // creamos una senal para iterara con el listado
  /**
   * por defecto tiene el tipo "WritableSignal<never[]>" es decir que la signal pensara que
   * el array siempre estara vacio, por lo que le asignaremos nuestro tipado
   */
  defaultValues: Character[] = [
    { id: 1, name: 'Goku', power: 10000 },
  ];
  characters = signal<Character[]>(this.defaultValues);

  // senal computada para asignar clases de forma dinamica
  powerClass = computed(() => {
    return {
      'text-danger': true
    }
  });

  public addCharacter(): void {
  
    const newCharacter: Character = {
      id: this.characters().length+1,
      name: this.name(),
      power: this.power()
    }
    
    if (!this.name() || !this.power() || this.power() <= 0){
      return;
    }

    // actualizamos la senal con una copia del valor actual con el nuevo valor
    this.characters.update((list) => [...list, newCharacter]);

    // reseteamos valores por defecto
    this.resetFields();
  }

  public resetFields(): void {
    this.name.set('');
    this.power.set(0);
  }
}
