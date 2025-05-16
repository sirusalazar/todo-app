import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
  isDevMode,
  APP_INITIALIZER,
  runInInjectionContext,
  Injector,
  provideAppInitializer,
  inject,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { Store, provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { MatNativeDateModule } from '@angular/material/core';

import * as todoEffects from './state/effects/todo.effects';
import * as todoState from './state/todo.state';
import { TodoActions } from './state/actions/todo.actions';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(),
    provideState(todoState.FEATURE_KEY, todoState.reducers),
    provideEffects(todoEffects),
    importProvidersFrom(MatNativeDateModule),
    provideStoreDevtools({ logOnly: isDevMode() }),
    provideAppInitializer(() => {
      const store = inject(Store);
      store.dispatch(TodoActions.loadTodos());
    }),
  ],
};
