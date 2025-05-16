import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TodoFilterComponent } from '../../components/todo-filter/todo-filter.component';
import { TodosListComponent } from '../../components/todos-list/todos-list.component';
import { MatDialog } from '@angular/material/dialog';
import { openAddTodoForm } from '../../utils/open-add-todo-form';
import { StoreBasedStore } from './store-based.store.';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'component-store-based',
  imports: [
    TodoFilterComponent,
    TodosListComponent,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    AsyncPipe,
  ],
  providers: [StoreBasedStore],
  template: `
    <div>
      @if(store.vm$ | async; as vm){
      <header>
        <h2>Component Store Based</h2>
        <button mat-raised-button color="primary" (click)="store.addTodo()">
          New
        </button>
      </header>
      <todo-filter
        [currentFilter]="vm.currentFilter"
        (filterChanged)="store.updateFilter($event)"
      />
      <todos-list
        [todos]="vm.todos"
        (deleteTodo)="store.deleteTodo($event)"
        (todoToggled)="store.todoToggled($event)"
      />
      }
    </div>
  `,
  styles: ``,
})
export class ComponentStoreBasedComponent {
  readonly store = inject(StoreBasedStore);
}
