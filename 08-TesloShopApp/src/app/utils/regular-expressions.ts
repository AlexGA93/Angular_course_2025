  // expresion regular para patron del email
  export const emailPattern: string | RegExp = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  /**
 * ^                      - Inicio de cadena
 * [a-z0-9._%+-]+         - Parte local del email (antes del @). Permite letras minúsculas, números y caracteres especiales: . _ % + -
 * @                      - Símbolo obligatorio que separa la parte local del dominio
 * [a-z0-9.-]+            - Dominio principal. Permite letras minúsculas, números, puntos y guiones
 * \.                     - Punto que separa el dominio del TLD
 * [a-z]{2,4}             - TLD (como com, net, es). Debe tener entre 2 y 4 letras
 * $                      - Fin de cadena
 */

  export const passwordPattern: string | RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,}$/;


   /**
   * ^                  - Inicio de cadena
   * (?=.*[a-z])        - LookAhead positivo. Verifica que se cumpla el contenido. en este caso que haya al menos una letra minuscula
   * (?=.*[A-Z])        - LookAhead positivo. Verifica que se cumpla el contenido. en este caso que haya al menos una letra mayuscula
   * (?=.*\d)           - tercer LookAhead. Verifica que al menos haya un numero. \d es equivalente a [0-9]
   * (?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]) - LookAhead para caracteres especiales
   * [a-zA-Z0-9]{6,}    - Contenido completo que admite letras, numeros con un minimo de 6 caracteres
   * $                  - Find de cadena
    */