import { State, createReducer, on } from '@ngrx/store';
import { Todo } from '../../models/todo.model';
import { TodoApiActions } from '../actions/todo.actions';

export interface TodosState {
  todos: Todo[];
  error: string;
}

export const initialState: TodosState = {
  todos: [],
  error: '',
};

export const todosReducer = createReducer(
  initialState,
  on(
    TodoApiActions.loadTodosSuccess,
    TodoApiActions.updateTodosSuccess,
    (state, { todos }): TodosState => {
      return { ...state, todos };
    }
  ),
  on(TodoApiActions.loadTodosFailure, (state, { error }): TodosState => {
    return { ...state, error };
  })
);
