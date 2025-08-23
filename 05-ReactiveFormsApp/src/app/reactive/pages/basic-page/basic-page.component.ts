import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent {

  // injectamos el FormBuilder
  private formBuilder = inject(FormBuilder);

  // necesitamos tener acceso a la clase de utilidades
  formUtils = FormUtils; // lo usaremos en eltemplate

  // * FormBuilder
  myForm: FormGroup = this.formBuilder.group({
    // name: ['', /** Validadores sincronos */, /** Validadores Asincronos */],
    name: ['', [Validators.required, Validators.minLength(3)], []],
    price: [0, [Validators.required, Validators.min(10)]],
    inStorage: [0, [Validators.required, Validators.min(0)]]
  });

  // forma tradicional
  // myForm2 = new FormGroup({
  //   name: new FormControl('', [], []),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // }); 

  // funcion de envio del formulario
  onSave(): void {
    if(this.myForm.invalid) {
      // marcamos todos los campos como si han sido tocados para ver si los errores deben mostrar mensajes
      this.myForm.markAllAsTouched(); 
      return;
    }

    console.log(this.myForm.value);

    // resetamos el formulario
    this.myForm.reset();
  }
}
