import { Routes } from '@angular/router';
import { CounterComponent } from './pages/counter/counter.component';
import { HeroComponent } from './pages/hero/hero.component';
import { HomeComponent } from './pages/home/home.component';
import { DragonballComponent } from './pages/dragonball/dragonball.component';
import { DragonballSuperComponent } from './pages/dragonball-super/dragonball-super.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'counter', component: CounterComponent },
    { path: 'hero', component: HeroComponent },
    { path: 'dragon-ball', component:DragonballComponent },
    { path: 'super', component: DragonballSuperComponent },
    { path: '**', redirectTo: 'home' }
];
