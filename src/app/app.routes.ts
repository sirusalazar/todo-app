import { Routes } from '@angular/router';
import { ComponentStoreBasedComponent } from './pages/component-store-based/component-store-based.component';
import { SignalsBasedComponent } from './pages/signals-based/signals-based.component';

export const routes: Routes = [
  {
    path: '',
    component: ComponentStoreBasedComponent,
  },
  {
    path: 'signals',
    component: SignalsBasedComponent,
  },
];
