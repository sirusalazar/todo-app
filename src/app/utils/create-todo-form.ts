import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoForm } from '../models/todo-form';

export function createTodoForm(): FormGroup<TodoForm> {
  const fb = new FormBuilder().nonNullable;
  return fb.group<TodoForm>({
    title: fb.control('', [Validators.required]),
    dueDate: fb.control(null, [Validators.required]),
  });
}
