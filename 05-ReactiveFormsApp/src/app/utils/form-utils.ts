// archivo utilitario de formulario personalizado
// delcaramos una clase

import { FormGroup, FormArray, ValidationErrors } from "@angular/forms";

export class FormUtils {
   // dado que no queremos llamar a las funciones de la clase de forma en la que creamos la instancia
   // declaramos los metodos como estaticos

   // * aislamos la logica de asignacion de mensajes de error para ser reutilizable
   static getTextError(errors: ValidationErrors) {
      for (const key of Object.keys(errors)) {
         switch (key) {
            case "required":
               return "Este campo es obligatorio";
            case "minlength":
               return `Mínimo ${errors["minlength"].requiredLength} caracteres.`;
            case "min":
               return `El valor mínimo es ${errors["min"].min}.`;
            // podemos añadir mas casos segun los validadores que tengamos
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

      // iteramos el objeto de los errores
      // for (const key of Object.keys(errors)) {
      //    switch (key) {
      //       case "required":
      //          return "Este campo es obligatorio";
      //       case "minlength":
      //          return `Mínimo ${errors["minlength"].requiredLength} caracteres.`;
      //       case "min":
      //          return `El valor mínimo es ${errors["min"].min}.`;
      //       // podemos añadir mas casos segun los validadores que tengamos
      //    }
      // }

      return this.getTextError(errors);
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
}
