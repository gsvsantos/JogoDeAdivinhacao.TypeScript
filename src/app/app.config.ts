import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Routes } from '@angular/router';
import { DifficultyMenu } from './components/difficulty-menu/difficulty-menu';
import { GuessGame } from './components/guess-game/guess-game';
import { MainMenu } from './components/main-menu/main-menu';

const routes: Routes = [
  { path: '', redirectTo: 'main-menu', pathMatch: 'full' },
  { path: 'main-menu', component: MainMenu },
  { path: 'difficulties', component: DifficultyMenu },
  { path: 'guess-game', component: GuessGame },
];

// Configura Injeção de Dependências da Aplicação
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
  ],
};
