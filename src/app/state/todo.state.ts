import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodosState, todosReducer } from './reducers/todos.reducer';

export const FEATURE_KEY = 'todos';

export const reducers = todosReducer;

export const selectTodosState = createFeatureSelector<TodosState>(FEATURE_KEY);

export const selectTodos = createSelector(
  selectTodosState,
  (state) => state.todos
);

export const selectError = createSelector(
  selectTodosState,
  (state) => state.error
);
