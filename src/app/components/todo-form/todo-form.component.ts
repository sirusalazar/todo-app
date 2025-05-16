import { Component, inject } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { createTodoForm } from '../../utils/create-todo-form';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'todo-form',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [MatDatepickerModule],
  template: `
    <h1 mat-dialog-title>TODO Details</h1>
    <form mat-dialog-content [formGroup]="form">
      <mat-form-field class="todo-input">
        <mat-label>Enter a TODO</mat-label>
        <input matInput formControlName="title" />
      </mat-form-field>

      <mat-form-field>
        <input
          matInput
          [min]="today"
          [matDatepicker]="picker"
          placeholder="Due date"
          formControlName="dueDate"
        />
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>
    </form>
    <div mat-dialog-actions class="actions">
      <button mat-raised-button mat-dialog-close>Cancel</button>
      <button
        mat-raised-button
        color="primary"
        (click)="onSaveTodo()"
        [disabled]="form.invalid"
      >
        Create
      </button>
    </div>
  `,
  styles: `
    :host, form {
      display: flex;
      flex-direction:column;
    }

    .actions {
      justify-content: end;
      padding: 0 24px 24px;
    }

    h1 {
      text-align: center;
    }
  `,
})
export class TodoFormComponent {
  form = createTodoForm();
  today = new Date();

  private dialogRef = inject(MatDialogRef);

  onSaveTodo() {
    this.dialogRef.close(this.form.getRawValue());
  }
}
