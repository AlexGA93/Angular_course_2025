# Cambios en Angular 19
---
## Estructura del proyecto

### Ausencia de Modulos
- Archivo configuracion (app.config.ts)

  Podemos ver nuestra configuracio nde la aplicacio nde angular donde podremos inyectar distintos servicios, modulos, etc
  Podmeos percibir que ya no tenemos ningun modulo en la estructura
  ```
  import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
  import { provideRouter } from '@angular/router';
  
  import { routes } from './app.routes';
  
  export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
  };
  ```
- Componentes (standalone)

  Percibimos que los componentes se crean por defecto en modo standalone, donde se nos permite 
  ```
  import { Component } from '@angular/core';
  import { RouterOutlet } from '@angular/router';
  
  @Component({
  selector: 'app-root',
  // standalone: true
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
  })
  export class AppComponent {
  title = '09-myDashboard';
  }
  ```
