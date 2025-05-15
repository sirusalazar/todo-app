import { MatDialog } from '@angular/material/dialog';
import { TodoFormComponent } from '../components/todo-form/todo-form.component';

export function openAddTodoForm(dialog: MatDialog) {
  return dialog.open(TodoFormComponent, {
    autoFocus: true,
    width: '400px',
  });
}
