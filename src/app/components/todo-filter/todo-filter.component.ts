import { Component } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'todo-filter',
  imports: [MatButtonToggleModule],
  template: `
    <mat-button-toggle-group>
      <mat-button-toggle value="all">All</mat-button-toggle>
      <mat-button-toggle value="active">Pending</mat-button-toggle>
      <mat-button-toggle value="completed">Completed</mat-button-toggle>
      <mat-button-toggle value="past-due">Past due</mat-button-toggle>
    </mat-button-toggle-group>
  `,
  styles: ``,
})
export class TodoFilterComponent {}
