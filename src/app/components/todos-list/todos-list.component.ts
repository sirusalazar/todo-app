import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { MatSelectionList, MatListOption } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Todo } from '../../models/todo.model';
import { DatePipe, NgStyle } from '@angular/common';

@Component({
  selector: 'todos-list',
  imports: [MatSelectionList, MatListOption, MatIconModule, NgStyle, DatePipe],
  template: `
    <mat-selection-list class="todos-list">
      @for(todo of todos; track todo.id; let index = $index){
      <mat-list-option
        [selected]="todo.completed"
        (selectedChange)="onTodoToggled(todo.id, $event)"
      >
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
        </div>
      </mat-list-option>

      }
    </mat-selection-list>
  `,
  styles: [
    `
      mat-list-option {
        margin-bottom: 10px;
      }
      .todos-list,
      .todo-input {
        width: 100%;
      }

      .todo-item {
        display: flex;
        align-items: center;
      }

      .delete-todo {
        margin-right: 10px;
        cursor: pointer;
      }

      .todo-item-description {
        display: flex;
        flex-direction: column;

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
