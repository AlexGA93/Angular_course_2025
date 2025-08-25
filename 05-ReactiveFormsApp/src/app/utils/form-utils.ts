// archivo utilitario de formulario personalizado
// delcaramos una clase

import { FormGroup, FormArray, ValidationErrors, AbstractControl } from "@angular/forms";
import { emailPattern, passwordPattern } from "./regular-expressions";

// funcion para simular una respuesta asincorna del servidor
async function sleep() {
   return new Promise( resolve => {
      setTimeout( () => {
         resolve(true);
      }, 2500 );
   } )
}

export class FormUtils {
   // dado que no queremos llamar a las funciones de la clase de forma en la que creamos la instancia
   // declaramos los metodos como estaticos

   // * aislamos la logica de asignacion de mensajes de error para ser reutilizable
   static getTextError(errors: ValidationErrors, fieldName?: string) {

      for (const key of Object.keys(errors)) {
         switch (key) {
            case "required":
               return "Este campo es obligatorio";

            case "minlength":
               return `Mínimo ${errors["minlength"].requiredLength} caracteres.`;

            case "min":
               return `El valor mínimo es ${errors["min"].min}.`;

            // podemos añadir mas casos segun los validadores que tengamos
            case "pattern":
               // Convierte RegExp a string si es necesario
               const requiredPattern: string =
                  errors["pattern"].requiredPattern;
               const emailPatternStr: string =
                  emailPattern instanceof RegExp
                     ? emailPattern.source
                     : emailPattern.toString();
               const passwordPatternStr: string =
                  passwordPattern instanceof RegExp
                     ? passwordPattern.source
                     : passwordPattern.toString();

               // Limpia las barras /.../ si existen
               const cleanPattern = (pattern: string) =>
                  pattern.replace(/^\/|\/$/g, "");

               if (
                  cleanPattern(requiredPattern) ===
                  cleanPattern(emailPatternStr)
               ) {
                  return "El correo electrónico no tiene un formato válido";
               } else if (
                  cleanPattern(requiredPattern) ===
                  cleanPattern(passwordPatternStr)
               ) {
                  return "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial";
               }

               return `El valor introducido no tiene el formato correcto`;

            case "email":
               return "EL email debe tener el formato correcto";

            case "emailTaken":
               return "El email ya está en uso";
            
            case "fieldsNotEquals":
               return "Los campos no son iguales";

            case "notStrider":
               return "Violacion de politicas de la empresa. El valor no puede ser 'strider'";

            default:
               return `Error no controlado: ${key}`;
         }
      }

      return null;
   }

   static isValidField(myForm: FormGroup, fieldName: string): boolean | null {
      return (
         myForm.controls[fieldName].errors && myForm.controls[fieldName].touched
      );
   }

   static getFieldError(myForm: FormGroup, fieldName: string): string | null {
      // caso en el que no exista el campo abortamos operacion
      if (!myForm.controls[fieldName]) return null;

      //obtenemos los errores del campo
      const errors = myForm.controls[fieldName].errors ?? {}; // en caso de no tener errores devolvemos un objeto vacio

      return this.getTextError(errors, fieldName);
   }

   static isValidFieldInArray(
      formArray: FormArray,
      index: number
   ): boolean | null {
      return (
         formArray.controls[index].errors && formArray.controls[index].touched
      );
   }

   static getFieldErrorInArray(formArray: FormArray, index: number) {
      // si no tenemos controles (array vacio) devolvemos null
      if (!formArray.controls[index] || formArray.controls.length === 0)
         return null;

      //obtenemos los errores del campo
      const errors = formArray.controls[index].errors ?? {}; // en caso de no tener errores devolvemos un objeto vacio

      return this.getTextError(errors);
   }

   static isFieldOneEqualToFieldTwo( field: string, field2: string ) {
    return ( formGroup: AbstractControl ) => {
      const fields1Value = formGroup.get(field)?.value;
      const fields2Value = formGroup.get(field2)?.value;

      return fields1Value === fields2Value ? null : { fieldsNotEquals: true };
    }
  }

  // funcion para comprobar respuesta del servidor y usarla como validador
  static async checkingServerResponse( control: AbstractControl ): Promise<ValidationErrors | null> {

   console.log('Checking server response...');
   

   await sleep();

   const formValue = control.value;

   if(formValue === 'hola@mundo.com') {
      return { emailTaken: true };
   }

   return null;
  }

  // validacion sincrona para le usuario
  static notStrider( control: AbstractControl ): ValidationErrors | null {

   const formValue = control.value as string;

   if(formValue.toLowerCase().trim() === 'strider') {
      return { notStrider: true };
   }

   return null;
  }
}
