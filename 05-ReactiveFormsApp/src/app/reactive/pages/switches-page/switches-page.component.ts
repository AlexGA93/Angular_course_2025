import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-switches-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './switches-page.component.html',
  styles: ``
})
export class SwitchesPageComponent {
  // inyectamos el formBuilder
  private formBuilder = inject(FormBuilder);

   // necesitamos tener acceso a la clase de utilidades
    formUtils = FormUtils; // lo usaremos en eltemplate

  // declaraos el formulario reactivo
  public myForm = this.formBuilder.group({
    // radio button con dos valores: "M"(Male) o "F"(Female)
    gender: ["", Validators.required],
    // checkbox
    wantNotifications: [true],
    termsAndConditions: [false, Validators.requiredTrue],
  });

  public onSubmit(): void {
    if(!this.myForm.valid) return;

    this.myForm.markAllAsTouched();
    
    console.log(this.myForm.value);
  }
}
