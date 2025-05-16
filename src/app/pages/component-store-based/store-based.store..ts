import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { TodosFilter } from '../../models/todos-filter.type';
import { Store } from '@ngrx/store';
import * as todosState from '../../state/todo.state';
import { TodoActions } from '../../state/actions/todo.actions';
import { debounceTime, switchMap, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { openAddTodoForm } from '../../utils/open-add-todo-form';
import { Todo } from '../../models/todo.model';

interface State {
  filter: TodosFilter;
  loading: boolean;
}

const initialState: State = {
  filter: 'all',
  loading: false,
};

@Injectable()
export class StoreBasedStore extends ComponentStore<State> {
  private readonly store = inject(Store);
  private readonly matDialog = inject(MatDialog);

  constructor() {
    super(initialState);
  }

  //#region  selectors
  readonly filteredTodos$ = this.select(
    this.select((state) => state.filter),
    this.store.select(todosState.selectTodos),
    (filter, todos) => {
      switch (filter) {
        case 'all':
          return todos;
        case 'active':
          return todos.filter((todo) => !todo.completed);
        case 'completed':
          return todos.filter((todo) => todo.completed);
        case 'past-due':
          return todos.filter((todo) => todo.pastDue);
      }
    }
  );
  readonly vm$ = this.select(
    this.select((state) => state.filter),
    this.select((state) => state.loading),
    this.filteredTodos$,
    (currentFilter, isLoading, todos) => ({
      currentFilter,
      isLoading,
      todos,
    })
  );
  //#endregion

  readonly updateFilter = this.effect<TodosFilter>((filter$) =>
    filter$.pipe(
      debounceTime(500), //simulates endpoint request
      tap((filter) => this.patchState({ filter }))
    )
  );

  readonly deleteTodo = this.effect<string>((id$) =>
    id$.pipe(tap((id) => this.store.dispatch(TodoActions.deleteTodo({ id }))))
  );

  readonly todoToggled = this.effect<{ id: string; completed: boolean }>(
    (toggled$) =>
      toggled$.pipe(
        tap(({ id, completed }) =>
          this.store.dispatch(TodoActions.toggleTodo({ completed, id }))
        )
      )
  );

  readonly addTodo = this.effect<void>(($) =>
    $.pipe(
      switchMap(() => openAddTodoForm(this.matDialog).afterClosed()),
      tap((values) =>
        this.store.dispatch(TodoActions.addTodo({ todo: values as Todo }))
      )
    )
  );
}
