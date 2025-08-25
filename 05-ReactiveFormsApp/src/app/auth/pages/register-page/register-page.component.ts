import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';
import { emailPattern, fullNamePattern, notOnlySpaces, passwordPattern } from '../../../utils/regular-expressions';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {
  // inject formBuilder
  private formBuilder = inject(FormBuilder);

  // necesitamos tener acceso a la clase de utilidades
  formUtils = FormUtils; // lo usaremos en eltemplate

  // declaramos el formulario
  public myForm: FormGroup = this.formBuilder.group({
    // name obligatorio
    name: ['', [Validators.required, Validators.pattern(fullNamePattern)]],
    // email obligatorio y con formato de un email
    email: ['', [Validators.required, Validators.pattern(emailPattern)], [this.formUtils.checkingServerResponse]],
    // username obligatorio con un minimo de 6 caracteres
    username: ['', [Validators.required, Validators.pattern(notOnlySpaces), this.formUtils.notStrider]],
    // password obligatorio con un minimo de 6 caracteres
    password: ['', [Validators.required, Validators.pattern(passwordPattern)]],
    // confirmPassword
    confirmPassword: ['', Validators.required]
  },
  // Validacion a nivel de formulario, no de campo para comprobar si las passwords son iguales
  {
    validators: [this.formUtils.isFieldOneEqualToFieldTwo('password', 'confirmPassword')]
  }); 

  

  public onSubmit(): void {
    this.myForm.markAllAsTouched();
    if(!this.myForm.valid) return;
    console.log(this.myForm.value);
  }
}
