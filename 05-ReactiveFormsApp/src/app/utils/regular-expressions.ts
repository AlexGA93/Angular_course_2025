  // expresion regular para Nombre y Apellido(s) separados por espacio y con la primera letra en Mayuscula
  export const fullNamePattern: string | RegExp = /^[A-Z][a-z]+(?:\s[A-Z][a-z]+){1,2}$/;
  /**
   * ^      - Inicio de cadena
   * [A-Z]  - Primera letra de la cadena debe ser mayuscula
   * [a-z]+ - Resto de caracteres deben ser minuscula
   * 
   * (?:\s[A-Z][a-z]+){1,2} POR PARTES - Grupo no capturante, se puede repetir
   * \s     - espacio entre palabras
   * [A-Z]  - Primera letra de la cadena debe ser mayuscula
   * [a-z]+ - Resto de caracteres deben ser minuscula
   * {1,2}  - Indica que debe de haber una o dos repeticiones (apellidos)
   * $ - Find de cadena
   */

  // expresion regular para patron del email
  export const emailPattern: string | RegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  /**
 * ^                      - Inicio de cadena
 * [a-z0-9._%+-]+         - Parte local del email (antes del @). Permite letras minúsculas, números y caracteres especiales: . _ % + -
 * @                      - Símbolo obligatorio que separa la parte local del dominio
 * [a-z0-9.-]+            - Dominio principal. Permite letras minúsculas, números, puntos y guiones
 * \.                     - Punto que separa el dominio del TLD
 * [a-z]{2,4}             - TLD (como com, net, es). Debe tener entre 2 y 4 letras
 * $                      - Fin de cadena
 */


  // expresion regular para detectar que NO tenga espacios
  export const notOnlySpaces: string | RegExp = /^[a-zA-Z0-9]+$/;
   /**
   * ^                  - Inicio de cadena
   * [a-zA-Z0-9]+       - Resto de caracteres (en este caso todos) admiten letras mayusculas, minusculas y numeros (no figura espacios)
   * $                  - Find de cadena
   */

   // expresion regular para una password buena (8 caracteres). Mayusculas, Minusculas, Simbolos, Numeros (sin espacios)
export const passwordPattern: string | RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;


   /**
   * ^                  - Inicio de cadena
   * (?=.*[a-z])        - LookAhead positivo. Verifica que se cumpla el contenido. en este caso que haya al menos una letra minuscula
   * (?=.*[A-Z])        - LookAhead positivo. Verifica que se cumpla el contenido. en este caso que haya al menos una letra mayuscula
   * (?=.*\d)           - tercer LookAhead. Verifica que al menos haya un numero. \d es equivalente a [0-9]
   * (?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]) - LookAhead para caracteres especiales
   * [a-zA-Z0-9]{8,}    - Contenido completo que admite letras, numeros con un minimo de 8 caracteres
   * $                  - Find de cadena
    */