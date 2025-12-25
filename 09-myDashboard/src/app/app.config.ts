// File: 09-myDashboard/src/app/app.config.ts
import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {BrickWallShield, GitGraph, Logs, View, User, Users, ArrowLeftRight, LucideAngularModule} from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(LucideAngularModule.pick({ BrickWallShield, GitGraph, Logs, View, User, Users, ArrowLeftRight }))
  ]
};
