import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-dynamic-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {
  // injectamos el servicio de ForumBuilder
  private formBuilder = inject(FormBuilder);

  // necesitamos tener acceso a la clase de utilidades
  formUtils = FormUtils; // lo usaremos en eltemplate

  // declatamos el formulario reactivo
  public myForm: FormGroup = this.formBuilder.group({
    // campo de texto normal
    name: ['', [Validators.required, Validators.minLength(3)]],
    // campo array de textos
    // * declaramos un nuevo form builder llamando a la funcion de array
    favoriteGames: this.formBuilder.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required]
    ],
    Validators.minLength(2)
  )
  });

  // ! DECLARAMOS UN CONTROL AISLADO DEL FORMULARIO
  // forma mediante nueva instancia de FormBuilder
  // newGame: FormControl = new FormControl('', Validators.required);
  // forma mediante el formBuilder
  newFavoriteGame = this.formBuilder.control('', Validators.required);

  get favoriteGames(){
    return this.myForm.get('favoriteGames') as FormArray;
  }

  public onAddToFavoriteGames(): void {
    // mientras que el campo no este validado no hacemos nada
    if (this.newFavoriteGame.invalid) return;
    // extraemos el valor del control 
    const newGame = this.newFavoriteGame.value;

    // insertamos el nuevo valor en el array - usamos el getter para acceder rapida y facilmente 
    this.favoriteGames.push(
      // anadimos un nuevo control al array
      this.formBuilder.control(newGame, Validators.required)
    );

    // limpiamos la caja de texto
    this.newFavoriteGame.reset();
  } 

  public deleteFavoriteGame(index: number): void {
    this.favoriteGames.removeAt(index);
  }

  public onSubmit(): void {
    console.log(this.myForm.value);
    
    this.myForm.markAllAsTouched(); // marcamos todos los campos como tocados para que se muestren los errores
  }
}
