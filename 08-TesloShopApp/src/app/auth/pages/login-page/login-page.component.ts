import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { emailPattern, passwordPattern } from 'src/app/utils/regular-expressions';
import { FormUtils } from '@utils/form-utils';
import { AlertComponent } from "@shared/components/alert/alert.component";
import { JsonPipe } from '@angular/common';
import { AuthService } from '@auth/services/auth.service';


@Component({
  selector: 'app-login-page',
  imports: [RouterLink, ReactiveFormsModule, AlertComponent],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  // inyectamos el form builder
  private formBuilder = inject(FormBuilder);
  // inyectamos el servicio de autenticacion
  private authService = inject(AuthService);
  // inyectamos servicio de router
  private router = inject(Router);

  formUtils = FormUtils;

  // signals
  hasError = signal<boolean>(false);
  isPosting = signal<boolean>(false);
  showPassword = signal<boolean>(false);
  generalErrorMessage = signal<string>("Credenciales Incorrectas.");

  // declaramos el formulario reactivo
  public myForm: FormGroup = this.formBuilder.group({
    // email -> requerido, con una validacion custom
    email: ['test1@google.com', [Validators.required, Validators.pattern(emailPattern)]],
    // password -> requerida, con una validacion custom
    password: ['Abc123', [Validators.required]]
  });

  showHidePassword(e: any) {
    this.showPassword.set(e.target.checked);
  }

  togglePassword(): string {
    return this.showPassword() ? 'text': 'password';
  }

  onSubmit(): void {
    if(this.myForm.invalid) {
      // si el formulari oes invalido, seteamos el flag de error a true para mostrar mensaje de error
      this.hasError.set(true);
      // esperamos dos segundos y hacemos desaparecer el alert
      setTimeout(() => this.hasError.set(false), 2000);
      // y salimos sin hacer nada mas
      return ;
    }

    // desestructuramos el formulario
    const { email = '', password = '' } = this.myForm.value;
    this.isPosting.set(true);

    // console.log({ email, password });
    this.authService.login(email, password)
    .subscribe((isAuthenticated: boolean) => {
      console.log(isAuthenticated );
      
      this.isPosting.set(false);

      if(isAuthenticated) {
        // redirigimos al usuario a la seccion correspondiente
        this.router.navigateByUrl('/');
        return;
      }

      console.log('Tenemos error');
      // en caso de error seteamos la opcion correspondiente
      this.hasError.set(true);
      // esperamos dos segundos y hacemos desaparecer el alert
      setTimeout(() => this.hasError.set(false), 2000);
    });
  }

}
