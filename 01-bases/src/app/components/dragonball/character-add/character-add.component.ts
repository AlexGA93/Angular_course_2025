import { Component, output, signal } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'dragonball-character-add',
  imports: [],
  templateUrl: './character-add.component.html',
  styleUrl: './character-add.component.css'
})
export class CharacterAppComponent {
  // signals
  name = signal('');
  power = signal(0);

  // * output signal para comunicarse con el componente padre
  newCharacterFromChild = output<Character>();
  
  public addCharacter(): void {
  
    const newCharacter: Character = {
      id: Math.floor(Math.random()*1000),
      name: this.name(),
      power: this.power()
    }
    
    if (!this.name() || !this.power() || this.power() <= 0){
      return;
    }

    // * emitimos la signal al componente padre
    this.newCharacterFromChild.emit(newCharacter);

    // reseteamos valores por defecto
    this.resetFields();
  }

  public resetFields(): void {
    this.name.set('');
    this.power.set(0);
  }
}
