import { Component, input } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'dragonball-character-list',
  imports: [],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.css'
})
export class CharacterListComponent {
  
  // variable Input para recibir informacion del componente padre
  // * Este codigo usara signals inputs y no elementos @Input()
  public charactersSignal = input.required<Character[]>();
  public listname = input.required<string>();
}
