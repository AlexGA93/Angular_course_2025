import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { FormUtils } from '@utils/form-utils';
import { emailPattern } from '@utils/regular-expressions';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  // inyectamos el form builder
  private formBuilder = inject(FormBuilder);
  // inyectamos el servicio de autenticacion
  private authService = inject(AuthService);
  // inyectamos servicio de router
  private router = inject(Router);

  formUtils = FormUtils;
  
  public myForm: FormGroup = this.formBuilder.group({
    // fullName -> requerido, min
    fullName: ['John Doe', []],
    // email -> requerido, con una validacion custom
    email: ['johnDoe@mail.com', [Validators.required, Validators.pattern(emailPattern)]],
    // password -> requerida, con una validacion custom
    password: ['Patata93@', [Validators.required]],
  });
}
