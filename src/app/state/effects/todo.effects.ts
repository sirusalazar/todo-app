import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodoService } from '../../services/todo.service';
import { TodoActions, TodoApiActions } from '../actions/todo.actions';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import * as todosState from '../../state/todo.state';

export const loadTodos$ = createEffect(
  (actions$ = inject(Actions), todosService = inject(TodoService)) => {
    return actions$.pipe(
      ofType(TodoActions.loadTodos),
      switchMap(() =>
        todosService.loadTodos().pipe(
          map((todos) => TodoApiActions.loadTodosSuccess({ todos })),
          catchError((error: Error) =>
            of(TodoApiActions.loadTodosFailure({ error: error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const toggleTodo$ = createEffect(
  (
    actions$ = inject(Actions),
    todosService = inject(TodoService),
    store = inject(Store)
  ) => {
    return actions$.pipe(
      ofType(TodoActions.toggleTodo),
      withLatestFrom(store.select(todosState.selectTodos)),
      switchMap(([{ id, completed }, todos]) =>
        todosService
          .toggleTodo(id, completed, todos)
          .pipe(map((todos) => TodoApiActions.updateTodosSuccess({ todos })))
      )
    );
  },
  { functional: true }
);

export const deleteTodo$ = createEffect(
  (
    actions$ = inject(Actions),
    todosService = inject(TodoService),
    store = inject(Store)
  ) => {
    return actions$.pipe(
      ofType(TodoActions.deleteTodo),
      withLatestFrom(store.select(todosState.selectTodos)),
      switchMap(([{ id }, todos]) =>
        todosService
          .deleteTodo(id, todos)
          .pipe(map((todos) => TodoApiActions.updateTodosSuccess({ todos })))
      )
    );
  },
  { functional: true }
);

export const addTodo$ = createEffect(
  (
    actions$ = inject(Actions),
    todosService = inject(TodoService),
    store = inject(Store)
  ) => {
    return actions$.pipe(
      ofType(TodoActions.addTodo),
      withLatestFrom(store.select(todosState.selectTodos)),
      switchMap(([{ todo }, todos]) =>
        todosService
          .addTodo(todo, todos)
          .pipe(map((todos) => TodoApiActions.updateTodosSuccess({ todos })))
      )
    );
  },
  { functional: true }
);
