import { Component } from '@angular/core';
import { MatSelectionList, MatListOption } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'todos-list',
  imports: [MatSelectionList, MatListOption, MatIconModule],
  template: `
    <mat-selection-list class="todos-list">
      <mat-list-option>
        <div class="todo-item">
          <mat-icon class="delete-todo">delete</mat-icon>
          <span>Test item1</span>
        </div>
      </mat-list-option>
      <mat-list-option>
        <div class="todo-item">
          <mat-icon class="delete-todo">delete</mat-icon>
          <span>Test item2</span>
        </div>
      </mat-list-option>
    </mat-selection-list>
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

      .delete-todo {
        margin-right: 10px;
        cursor: pointer;
      }
    `,
  ],
})
export class TodosListComponent {}
