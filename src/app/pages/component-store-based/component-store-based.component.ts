import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TodoFilterComponent } from '../../components/todo-filter/todo-filter.component';
import { TodosListComponent } from '../../components/todos-list/todos-list.component';
import { MatDialog } from '@angular/material/dialog';
import { openAddTodoForm } from '../../utils/open-add-todo-form';

@Component({
  selector: 'component-store-based',
  imports: [
    TodoFilterComponent,
    TodosListComponent,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  template: `
    <div>
      <header>
        <h2>Component Store Based</h2>
        <button mat-raised-button color="primary" (click)="addTodo()">
          New
        </button>
      </header>
      <todo-filter />
      <todos-list />
    </div>
  `,
  styles: ``,
})
export class ComponentStoreBasedComponent {
  constructor(private readonly matDialog: MatDialog) {}

  addTodo() {
    openAddTodoForm(this.matDialog);
  }
}
