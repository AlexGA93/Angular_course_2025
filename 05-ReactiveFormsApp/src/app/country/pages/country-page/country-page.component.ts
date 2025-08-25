import { JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { filter, switchMap, tap } from 'rxjs';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent {
  // injectamos el servicio de ForumBuilder
  formBuilder = inject(FormBuilder);
  // inyectamos el servicio de CountryService
  countryService = inject(CountryService);

  // declaramos el signal de regiones, paises por region y fronteras
  regions = signal(this.countryService.regions);
  countries = signal<Country[]>([]);
  borders = signal<Country[]>([]);

  // declaramos el formulario
  myForm = this.formBuilder.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required]
  });

  // declaramos en una variable el valor del campo regio ndel formulario cuando este cambia el valor
  // ! problema: subscripcion que no se elimina, sol ocambia
  // formRegionChanged = this.myForm.get('region')?.valueChanges
  // .subscribe( region => {
  //   console.log({ region })
  // });

  // * mejor con signal
  onFormChanged = effect(( oncleanup ) => {
    const regionSubscription = this.onRegionChanged();
    const countrySubscription = this.onCountryChanged();

    // limpiamos la subscripcion anterior
    oncleanup(() => {
      regionSubscription.unsubscribe();
      countrySubscription.unsubscribe();
      console.log('cleanup done');
    })
  });

  // creamos una funcion que devuelva la subscripcion al valor del campo region
  onRegionChanged() {
    return this.myForm
    .get('region')!
    .valueChanges.pipe(
      // concatenamos operaciones mediante rxjs
      // en este caso queremos limpiar todos los valores de los campos del formulario
      tap(() => this.myForm.get('country')!.setValue('')),
      tap(() => this.myForm.get('border')!.setValue('')),
      tap(() => {
        this.borders.set([]);
        this.countries.set([]);
      }),
      // realizamos la peticion http para obtener los paises de la region seleccionada
      switchMap(region => this.countryService.getCountriesByRegion(region!))
    )
    // una vez limpiado los valores procedemos con la suscripcion
    .subscribe((countries) => {
      console.log(countries);
      this.countries.set(countries);
    })
  }

  // para detectar los cambios en pais y obtener el codigo
  onCountryChanged() {
    return this.myForm
      .get('country')!
      .valueChanges.pipe(
        tap(() => this.myForm.get('border')!.setValue('')),
        filter((value) => value!.length > 0),
        switchMap((alphaCode) =>
          this.countryService.getCountriesByAlphaCode(alphaCode ?? '')
        ),
        switchMap((country) =>
          this.countryService.getCountryNamesByCodeArray(country.borders)
        )
      )

      .subscribe((borders) => {
        this.borders.set(borders);
      });
  }
}
