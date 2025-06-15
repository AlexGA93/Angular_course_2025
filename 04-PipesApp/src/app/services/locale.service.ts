import { Injectable, signal } from '@angular/core';
import { localeType } from '../interfaces/locale.interface';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  // * Idioma por defecto
  private _locale = signal<localeType>('es');

  constructor() { 
    this._locale.set((localStorage.getItem('locale') as localeType) ?? 'es')
  }

  get getLocale() {
    return this._locale();
  }

  changeLocale(locale: localeType) {
    localStorage.setItem('locale', locale);
    // * Cambia el idioma
    this._locale.set(locale);
    window.location.reload(); // * Recarga la pagina para aplicar el cambio
  }

}
