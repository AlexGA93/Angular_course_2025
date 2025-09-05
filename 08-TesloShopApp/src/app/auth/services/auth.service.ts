import { HttpClient } from "@angular/common/http";
import { computed, inject, Injectable, signal } from "@angular/core";
import { rxResource } from "@angular/core/rxjs-interop";
import { AuthStatus, LoginResponse } from "@auth/interfaces/auth.interface";
import { User } from "@auth/interfaces/user.interface";
import {
  deleteToLocalStorage,
  getFromLocalStorage,
  saveToLocalStorage,
} from "@utils/local-storage";
import { catchError, map, Observable, of, tap } from "rxjs";
import { environment } from "src/environments/environment.development";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  getAuthToken() {
      throw new Error("Method not implemented.");
  }
  // inyectamos el servicio http
  private http = inject(HttpClient);

  // base url
  private _baseUrl: string = environment.baseUrl;

  // declaramos un signal de estado de autenticacion seteado a checking or defecto porque no sabemos si el usuario esta logueado al cargar la pagina
  private _authStatus = signal<AuthStatus>("checking");
  // user
  private _user = signal<User | null>(null);
  // token
  private _token = signal<string | null>(getFromLocalStorage('token'));

  // * Tan pronto inicialice el servicio vamos a llamar a la funcion que comprueba si hay un token y, de haberlo, vamos a pedir otro para evitar que este caduque
  checkStatusResource = rxResource({
    loader: () => this.checkStatus(),
  });

  // getter para poder suscribirnos al estado
  authStatus = computed<AuthStatus>(() => {
    // si tenemos el estado a checking , respodnemos con ese estado
    if (this._authStatus() === "checking") return "checking";

    // si tenemos un usuario, informamos que estamos autenticados
    if (this._user()) return "authenticated";

    // si no tenemos nada de lo anterior, no autenticado
    return "not-authenticated";
  });

  // getter para el usuario
  user = computed<User | null>(() => this._user());

  // getter para el token
  token = computed<string | null>(() => this._token());

  // functions
  login(email: string, password: string): Observable<boolean> {
    // : Observable<LoginResponse>
    return (
      this.http
        .post<LoginResponse>(`${this._baseUrl}/auth/login`, {
          email,
          password,
        })
        // actualizamos posteriormente con la informacion de la respuesta las signals
        .pipe(
          // * vamos a cambiar la respuesta del login por la suscripcion a un booleano
          // en primer lugar vamos a mapear el caso en el que todo vaya bien devolviendo un true como resultado de la funcion refactorizada
          map((resp) => this.handleAuthSuccess(resp)),
          // en el caso de que haya un error usamso el catchError de rxjs para devolver el observable del falso y, de paso, seteamos los ajustes al caso correspondiente
          catchError((error: any) => this.handleAuthError(error))
        )
    );
  }

  // funcion para comprobar el estado de la sesion enviando el token guardado y solicitando otro
  checkStatus(): Observable<boolean> {
    // obtenemos el token guardado en local storage
    const token = getFromLocalStorage("token");

    // si no tenemos un token guardado devolvemos un observable de tipo boolean falso
    if (!token) {
      this.logout();
      return of(false);
    }

    // en caso de tener un token almacenado realizamos la peticion pasandole el mismo en la caebecera
    return this.http
      .get<LoginResponse>(`${this._baseUrl}/auth/check-status`, {
        // en lugar de enviar los headers usaremos los interceptores para que hagan esta tarea en las peticiones http por defecto
        // headers: { Authorization: `Bearer ${token}` },
      })
      .pipe(
        map((resp) => this.handleAuthSuccess(resp)),
        catchError((error: any) => this.handleAuthError(error))
      );
  }

  logout() {
    this._user.set(null);
    this._token.set(null);
    this._authStatus.set("not-authenticated");

    deleteToLocalStorage("token");
  }

  private handleAuthSuccess({ token, user }: LoginResponse) {
    this._user.set(user);
    this._authStatus.set("authenticated");
    this._token.set(token);

    // guardamos en local storage el token obtenido
    saveToLocalStorage("token", token);

    // devolvemos el booleano true como premisa para la correcta definicion de los metodos que llaman a esta funcion
    return true;
  }

  private handleAuthError(error: any) {
    this.logout();
    return of(false);
  }
}
