import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = '03-CountriesApp';
  text = document.documentElement.getAttribute('data-theme') ?? 'light';


  toggleTheme() {
    const htmlEl = document.documentElement;
    const current = htmlEl.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    this.text = next;
    htmlEl.setAttribute('data-theme', next);
  }
}
