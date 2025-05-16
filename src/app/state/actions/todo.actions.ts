import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Todo } from '../../models/todo.model';

export const TodoActions = createActionGroup({
  source: 'Todo App',
  events: {
    loadTodos: emptyProps(),
    toggleTodo: props<{ id: string; completed: boolean }>(),
    deleteTodo: props<{ id: string }>(),
    addTodo: props<{ todo: Partial<Todo> }>(),
  },
});

export const TodoApiActions = createActionGroup({
  source: 'Todo Api',
  events: {
    loadTodosSuccess: props<{ todos: Todo[] }>(),
    loadTodosFailure: props<{ error: string }>(),
    updateTodosSuccess: props<{ todos: Todo[] }>(),
  },
});
