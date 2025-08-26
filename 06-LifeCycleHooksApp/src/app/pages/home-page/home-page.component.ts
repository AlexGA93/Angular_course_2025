import { afterNextRender, afterRender, Component, effect, signal } from '@angular/core';
import { TitleComponent } from '../../components/title/title.component';

const log = ( ...messages: string[] ) => {
  console.log(`${ messages[0] } %c${ messages.slice(1).join(' ') }`, `color: ${messages[0] === 'ngOnDestroy' ? 'red' : '#bada55'};`);
};

@Component({
  selector: 'app-home-page',
  imports: [TitleComponent],
  templateUrl: './home-page.component.html'
})
export class HomePageComponent {

  // propiedades
  tradicionalProperty: string = "Algo que poner"; // depende de Zone.js para la detección de cambios
  signalProperty = signal<string>("Algo que poner");

  
  // * constructor: se llama antes de que se cree el componente
  constructor() {
    log('constructor','1. constructor - se llama antes de que se cree el componente');
    // al cambiar de pantalla el constructor se vuelve a llamar, lo que significa que se crea un nuevo tras la destrucción del anterior

    // * vamos a cambiar las dos propiedades después de 2 segundos para ver las diferencias de deteccion de cambios en caso de estar enentorno zoneless. En el caso de la propiedad tradicional no se verá el cambio, pues no depende de Zone.js
    setTimeout(() => {
      this.signalProperty.set("He cambiado la propiedad signal desde el constructor");
      // no implementar los dos a la vcez o dara falso positivo
      // this.tradicionalProperty = "He cambiado la propiedad tradicional desde el constructor";
    }, 2000);
  }

  changeTradictional() {
    // funcionalidad para cambiar la propiedad tradicional
    this.tradicionalProperty = "He cambiado la propiedad tradicional";
  }

  changeSignal() {
    // funcionalidad para cambiar la propiedad signal
    this.signalProperty.set("He cambiado la propiedad signal");
  }




  // *                                        lifecycle hooks

  // effecto
  basiceffect = effect(( onCleanup ) => {
    log('effect','Efecto - se llama cada vez que una propiedad vinculada a datos cambia');

    // cleanup - se llama antes de que el efecto se vuelva a ejecutar o cuando el componente se destruya, similar a ngOnDestroy
    onCleanup(() => {
      log('effect cleanup','Efecto cleanup - se llama antes de que el efecto se vuelva a ejecutar o cuando el componente se destruya');
    });
  });

  // ngOnInit: se llama una vez que el componente ha sido creado
  ngOnInit() {
    log('ngOnInit','2. ngOnInit - se llama una vez que el componente ha sido creado');
  }

  // ngOnChanges: se llama cada vez que una propiedad vinculada a datos cambia
  ngOnChanges() {
    log('ngOnChanges','3. ngOnChanges - se llama cada vez que una propiedad vinculada a datos cambia');
  }

  // ngDoCheck: se llama durante cada ciclo de detección de cambios
  ngDoCheck() {
    log('ngDoCheck','4. ngDoCheck - se llama durante cada ciclo de detección de cambios');
  }

  // ngAfterContentInit: se llama después de que el contenido proyectado ha sido inicializado
  ngAfterContentInit() {
    log('ngAfterContentInit','5. ngAfterContentInit - se llama después de que el contenido proyectado ha sido inicializado');
  }

  // ngAfterContentChecked: se llama después de que el contenido proyectado ha sido verificado
  ngAfterContentChecked() {
    log('ngAfterContentChecked','6. ngAfterContentChecked - se llama después de que el contenido proyectado ha sido verificado');
  }

  // ngAfterViewInit: se llama después de que las vistas del componente han sido inicializadas
  ngAfterViewInit() {
    log('ngAfterViewInit','7. ngAfterViewInit - se llama después de que las vistas del componente han sido inicializadas');
  } 

  // ngAfterViewChecked: se llama después de que las vistas del componente han sido verificadas
  ngAfterViewChecked() {
    log('ngAfterViewChecked','8. ngAfterViewChecked - se llama después de que las vistas del componente han sido verificadas');
  }

  // ngOnDestroy: se llama justo antes de que el componente sea destruido
  ngOnDestroy(): void {
    log('ngOnDestroy','9. ngOnDestroy - se llama justo antes de que el componente sea destruido');
  }

  // afterNextRender: se llama después de que la vista ha sido renderizada
  afterNextRenderEffect = afterNextRender(() => {
    log('afterNextRender','Efecto afterNextRender - se llama después de que la vista ha sido renderizada' );
  });

  // afterRender: Se llama cada vez que la vista ha sido renderizada en el DOM
  afterRenderEffect = afterRender(() => {
    log('afterRender','afterRender - Se llama cada vez que la vista ha sido renderizada en el DOM');
  });
}
