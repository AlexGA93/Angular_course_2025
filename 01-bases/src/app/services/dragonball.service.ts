import { effect, Injectable, signal } from '@angular/core';
import { Character } from '../components/interfaces/character.interface';

// podemos definir esta funcion dentro de la clase pero tambien puede ir fuera dado que no trata con dependencias ni variables
const loadFromLocalStorage = (): Character[] => {
  const characters = localStorage.getItem('characters');
  return characters ? JSON.parse(characters) : [];
};


@Injectable({
  providedIn: 'root'
})
export class DragonballService {

  constructor() { }

  // effect
  /**
   * Un efecto es una operacion que se ejecuta al menos una vez
   * (similar al ngOninit) pero si se usa alguna signal y esa cambia,
   * el efecto se vuelve a ejecutar
   */
  saveToLocalStorage = effect(() => localStorage.setItem('characters', JSON.stringify(this.charactersFromService())));

  charactersFromService = signal<Character[]>(loadFromLocalStorage());

  public addCharacters(character: Character): void {
    this.charactersFromService.update(list => [...list, character])
  }
}
