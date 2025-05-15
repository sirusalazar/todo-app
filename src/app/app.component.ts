import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import {} from '@angular/material/';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatTabsModule, RouterLink, RouterLinkActive],
  standalone: true,
  template: `
    <div class="app">
      <h1>TODO App</h1>
      <nav mat-tab-nav-bar [tabPanel]="tabPanel">
        <a
          mat-tab-link
          routerLink=""
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }"
          #storeRla="routerLinkActive"
          [active]="storeRla.isActive"
        >
          Component Store based
        </a>

        <a
          mat-tab-link
          routerLink="signals"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }"
          #signalsRla="routerLinkActive"
          [active]="signalsRla.isActive"
        >
          Signals based
        </a>
      </nav>
      <mat-tab-nav-panel class="panel" #tabPanel>
        <router-outlet></router-outlet>
      </mat-tab-nav-panel>
    </div>
  `,
  styles: [
    `
      .app {
        display: flex;
        flex-direction: column;
        padding-top: 50px;
        align-items: center;
        min-width: 500px;
      }
    `,
  ],
})
export class AppComponent {
  title = 'todo-list-app';
}
