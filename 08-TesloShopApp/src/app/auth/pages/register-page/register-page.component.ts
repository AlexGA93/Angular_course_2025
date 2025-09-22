import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, TitleStrategy } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { AlertComponent } from '@shared/components/alert/alert.component';
import { FormUtils } from '@utils/form-utils';
import { emailPattern, passwordPattern } from '@utils/regular-expressions';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, AlertComponent, JsonPipe],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  // * 1 - INYECCION DE SERVICIOS
  // inyectamos el form builder
  private formBuilder = inject(FormBuilder);
  // inyectamos el servicio de autenticacion
  private authService = inject(AuthService);
  // inyectamos servicio de router
  private router = inject(Router);

  // * 2 - LLAMADA DE LAS UTILIDADES
  formUtils = FormUtils;

  // * 3 - SIGNALS
  showPassword = signal<boolean>(false);
  hasError = signal<boolean>(false);
  loading = signal<boolean>(false);
  generalErrorMessage = signal<string>("Credenciales Incorrectas.");

  // * 4 - DECLARACION DE FORMULARIO REACTIVO
  public myForm: FormGroup = this.formBuilder.group({
    // fullName -> requerido, min
    fullName: ['John Doe', [Validators.required, Validators.minLength(6)]],
    // email -> requerido, con una validacion custom
    email: ['johnDoe@mail.com', [Validators.required, Validators.pattern(emailPattern)]],
    // password -> requerida, con una validacion custom
    password: ['Patata93@', [Validators.required, Validators.pattern(passwordPattern)]],
    confirmPassword: ['Patata93@', [Validators.required]]
  },
  // Validacion a nivel de formulario para comprobar si las claves son iguales
  {
    validators: [
      this.formUtils.isFieldOneEqualToFieldTwo('password', 'confirmPassword')
    ]
  }
);

  // * 5 - FUNCIONES

  /**
   * @description Funcion que intercala un valor u otro para el tipado del input
   * @returns string
   */
  public togglePassword(): string {
    return this.showPassword() ? 'text' : 'password';
  }

  /**
   * @description Funcion encargada de la asignacion del valor a la senal en funcion de si el usuario ha accionado el checkbox
   * @returns void 
  */
  public showHidePassword(event: any): void {
    this.showPassword.set(event.target.checked);
  }

  public onSubmit(): void {
    // comprobamos que el formulario sea valido
    if (this.myForm.invalid) {
      /* 
      Si el formulario es invalido activamos el flag de error
      para mostrar el alert con el mensaje y salimos
      */
     this.hasError.set(true);
     // esperamos dos segundos para cambiar el valor mostrando el mensaje en la alerta
     setTimeout(() => this.hasError.set(false), 2000);

     return;

    }

    // en caso de ser valido, desestructuramos el formulario
    const { fullName='', email='', password='' } = this.myForm.value;

    // activamos el loader
    this.loading.set(true);

    // usamos los datos del formulario para pasarlos a la funcion del servicio
    this.authService.register(fullName, email, password)
    .subscribe((isRegistered) => {
      // desactivamos el loader
      this.loading.set(false);

      // si el usuario ha sido registrado, redirigimos a la pagina principal
      if(isRegistered){
        this.router.navigateByUrl('/');
        return;
      }

      // en caso de tener error
      this.hasError.set(true);
      // mostramos durante dos segundos la alerta antes de quitarla
      setTimeout(() => this.hasError.set(false), 2000);
      
    })
  }
}
