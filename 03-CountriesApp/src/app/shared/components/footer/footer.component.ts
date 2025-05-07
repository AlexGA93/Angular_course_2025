import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styles: ``
})
export class FooterComponent {
// declaramos señale para estrablecer el tema inicial
initialTheme = signal<string>(document.documentElement.getAttribute('data-theme') ?? 'light');
// creamos un signal para el tema oscuro
isDarkTheme = computed(() => this.initialTheme() === 'dark');

constructor() {
  // * nada mas iniciar la app se aplica el tema por defecto. En este caso es el tema claro
  this.applyTheme(this.initialTheme())
}

toggleTheme() {
  const newTheme = this.isDarkTheme() ? 'light' : 'dark'; // ⚠️ Invertimos correctamente
  this.initialTheme.set(newTheme); // ✅ actualiza el signal
  this.applyTheme(newTheme);
}

applyTheme(theme: string) {
  document.documentElement.setAttribute('data-theme', theme);
}
}
