import { inject } from '@angular/core';
import { Router, type CanMatchFn } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { firstValueFrom } from 'rxjs';

export const notAuthenticatedGuard: CanMatchFn = async (route, segments) => {
  // inyeccion de servicios
  const authService = inject(AuthService);
  const router = inject(Router);

  // queremos saber si esta autenticado
  // usamos firstValueFrom para mandar el observable y esperar la respuesta como si fuera una promesa
  const isAuthenticated = await firstValueFrom(authService.checkStatus())
  console.log({ isAuthenticated });
  
  // si el valor fuera falso debemos rederigir a una ruta deseada y devolver el false
  if( isAuthenticated ){
    router.navigateByUrl('/');
    return false;
  }

  return true; // si devuelve false la guarda redirige a la ruta alternativa
};
