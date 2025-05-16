import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Todo } from '../../models/todo.model';
import { DatePipe, NgStyle } from '@angular/common';

@Component({
  selector: 'todos-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, NgStyle, DatePipe, MatListModule, MatCheckboxModule],
  template: `
    <mat-list class="todos-list">
      @for(todo of todos; track todo.id; let index = $index){
      <mat-list-item class="todo-item">
        <div class="todo-item">
          <mat-icon class="delete-todo" (click)="onDeleteTodo(todo.id, $event)"
            >delete</mat-icon
          >
          <div class="todo-item-description">
            <span
              [ngStyle]="{
                'text-decoration': todo.completed ? 'line-through' : 'none'
              }"
              >{{ todo.title }}</span
            >
            <small [ngStyle]="{ color: todo.pastDue ? 'red' : '' }"
              >Due Date: {{ todo.dueDate | date : 'M/dd/yyyy' }}</small
            >
          </div>
          <mat-checkbox
            class="item-checkbox"
            [checked]="todo.completed"
            (change)="onTodoToggled(todo.id, $event.checked)"
          ></mat-checkbox>
        </div>
      </mat-list-item>
      }
    </mat-list>
  `,
  styles: [
    `
      .todos-list,
      .todo-input {
        width: 100%;
      }

      .todo-item {
        display: flex;
        align-items: center;
      }
      mat-list-item {
        border-bottom: 1px solid var(--mat-standard-button-toggle-divider-color);
        margin-bottom: 10px;
      }

      .delete-todo {
        margin-right: 10px;
        cursor: pointer;
      }

      .todo-item-description {
        display: flex;
        flex-direction: column;
        flex-grow: 1;

        small {
          font-size: 12px;
          line-height: auto;
        }
      }
    `,
  ],
})
export class TodosListComponent {
  @Input({ required: true }) todos!: Todo[];
  @Output() todoToggled = new EventEmitter<{
    id: string;
    completed: boolean;
  }>();

  @Output() deleteTodo = new EventEmitter<string>();

  onTodoToggled(id: string, completed: boolean) {
    this.todoToggled.emit({ id, completed });
  }

  onDeleteTodo(id: string, event: MouseEvent) {
    event.stopPropagation();
    this.deleteTodo.emit(id);
  }
}
