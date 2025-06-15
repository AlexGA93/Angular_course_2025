import { Component, computed, signal } from '@angular/core';
import { getFromLocalStorage, saveToLocalStorage } from '../../../utils/localStorage';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styles: ``
})
export class FooterComponent {
// declaramos señale para estrablecer el tema inicial
initialTheme = signal<string>('light');
// creamos un signal para el tema oscuro
isDarkTheme = computed(() => this.initialTheme() === 'dark');

constructor() {
  // * nada mas iniciar la app se aplica el tema por defecto. En este caso es el tema claro
  // comporbamos si el tema ha sido guardado en el localStorage
  const savedTheme = getFromLocalStorage('theme');
  
  // si no tenemos tema guardado, aplicamos el tema inicial por defecto
  if (savedTheme === '' || !savedTheme) {
    const defaultTheme = 'light';
    saveToLocalStorage('theme', defaultTheme);
    this.applyTheme(defaultTheme);
  }else{
    // si tenemos tema guardado, lo aplicamos
    this.applyTheme(savedTheme);
    // actualizamos el signal con el tema guardado
    this.initialTheme.set(savedTheme);
  }
  // this.applyTheme(this.initialTheme())
}

toggleTheme() {
  const newTheme = this.isDarkTheme() ? 'light' : 'dark'; // ⚠️ Invertimos correctamente
  this.initialTheme.set(newTheme); // ✅ actualiza el signal
  this.applyTheme(newTheme);
  saveToLocalStorage('theme', newTheme); // Guardamos el nuevo tema en localStorage
}

applyTheme(theme: string) {
  document.documentElement.setAttribute('data-theme', theme);
}
}
