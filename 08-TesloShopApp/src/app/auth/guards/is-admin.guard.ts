import { inject } from '@angular/core';
import { CanMatchFn, Route, UrlSegment } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { firstValueFrom } from 'rxjs';

/**
 * @description Funcion guard que permite el acceso a una ruta dependiendo del parametro role del usuario
 * @param route 
 * @param state 
 * @returns 
 */
export const isAdminGuard: CanMatchFn = async (
  route: Route,
  segments: UrlSegment[]
) => {

  // inyectamos el servicio de autenticacion
  const authService = inject(AuthService);

  // comprobamos el primer valor de la señal checkStatus para comrprobar el estado de la autenticacion
  await firstValueFrom(authService.checkStatus());

  // si no es admin, redirigimos a la pagina principal
  return authService.isAdmin();
};
