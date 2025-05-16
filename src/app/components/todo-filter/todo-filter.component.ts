import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TodosFilter } from '../../models/todos-filter.type';

@Component({
  selector: 'todo-filter',
  imports: [MatButtonToggleModule],
  template: `
    <mat-button-toggle-group
      [value]="currentFilter"
      (change)="filterChanged.emit($event.value)"
    >
      <mat-button-toggle value="all">All</mat-button-toggle>
      <mat-button-toggle value="active">Pending</mat-button-toggle>
      <mat-button-toggle value="completed">Completed</mat-button-toggle>
      <mat-button-toggle value="past-due">Past due</mat-button-toggle>
    </mat-button-toggle-group>
  `,
  styles: ``,
})
export class TodoFilterComponent {
  @Input({ required: true }) currentFilter!: TodosFilter;
  @Output() filterChanged = new EventEmitter<TodosFilter>();
}
