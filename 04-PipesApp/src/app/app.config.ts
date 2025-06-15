import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { registerLocaleData } from '@angular/common';

// !IDIOMAS
import localES from '@angular/common/locales/es';
import localFR from '@angular/common/locales/fr';
import localJP from '@angular/common/locales/ja';
import { LocaleService } from './services/locale.service';

// ! idiomas registrados
registerLocaleData(localES, 'es'); // * ESPANOL ESTANDAR
registerLocaleData(localFR, 'fr'); // * FRANCES ESTANDAR
registerLocaleData(localJP, 'ja'); // * JAPONES ESTANDAR

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),  
    provideRouter(routes),
    {
      provide: LOCALE_ID,
      // useValue: 'es'
      deps: [LocaleService],
      useFactory: (localeService: LocaleService) =>  localeService.getLocale
    }
  ]
};
