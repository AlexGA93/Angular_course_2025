import { ApplicationConfig, provideExperimentalZonelessChangeDetection, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    // This function allows you to configure the application to not use the state/state changes of ZoneJS to schedule change detection in the application.
    provideExperimentalZonelessChangeDetection()
  ]
};
