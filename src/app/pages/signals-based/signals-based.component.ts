import { Component, Injector, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TodoFilterComponent } from '../../components/todo-filter/todo-filter.component';
import { TodosListComponent } from '../../components/todos-list/todos-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TodosStore } from './signals-based.store';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'signals-based',
  imports: [
    TodoFilterComponent,
    TodosListComponent,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
  ],
  template: `<div>
    <header>
      <h2>Signals Based</h2>
      <button mat-raised-button color="primary" (click)="store.addTodo()">
        New
      </button>
    </header>
    <todo-filter
      [currentFilter]="store.filter()"
      (filterChanged)="store.updateFilter($event)"
    />
    <todos-list
      [todos]="store.getFilteredTodos()"
      (deleteTodo)="store.deleteTodo($event)"
      (todoToggled)="store.todoToggled($event)"
    />
  </div>`,
  styles: ``,
})
export class SignalsBasedComponent {
  store = inject(TodosStore);
}
