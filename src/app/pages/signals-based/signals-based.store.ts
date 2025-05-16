import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { toSignal } from '@angular/core/rxjs-interop';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { TodosFilter } from '../../models/todos-filter.type';
import { Signal, computed, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoActions } from '../../state/actions/todo.actions';
import * as todosState from '../../state/todo.state';
import { Todo } from '../../models/todo.model';
import { TODOS } from '../../data/todos.mock';
import { pipe, switchMap, tap } from 'rxjs';
import { openAddTodoForm } from '../../utils/open-add-todo-form';

interface State {
  todos: Todo[];
  filter: TodosFilter;
  loading: boolean;
}

const initialState: State = {
  filter: 'all',
  loading: false,
  todos: TODOS,
};
let filteredTodos: Signal<Todo[]>;
export const TodosStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withProps(() => ({
    ngrxStore: inject(Store),
    matDialog: inject(MatDialog),
  })),
  withMethods(({ ngrxStore, matDialog, ...store }) => ({
    updateFilter(filter: TodosFilter) {
      patchState(store, { filter });
    },
    todoToggled({ id, completed }: { id: string; completed: boolean }) {
      ngrxStore.dispatch(TodoActions.toggleTodo({ id, completed }));
    },
    deleteTodo(id: string) {
      ngrxStore.dispatch(TodoActions.deleteTodo({ id }));
    },
    getFilteredTodos: () => filteredTodos(),
    addTodo: rxMethod<void>(
      pipe(
        switchMap(() => openAddTodoForm(matDialog).afterClosed()),
        tap((values) =>
          ngrxStore.dispatch(TodoActions.addTodo({ todo: values as Todo }))
        )
      )
    ),
  })),
  withHooks((store) => {
    const ngrxStore = inject(Store);

    const todos = toSignal(ngrxStore.select(todosState.selectTodos), {
      initialValue: [],
    });

    filteredTodos = computed(() => {
      const filter = store.filter();
      const allTodos = todos();
      let filteredData;
      switch (filter) {
        case 'all':
          filteredData = allTodos;
          break;
        case 'active':
          filteredData = allTodos?.filter((todo) => !todo.completed);
          break;
        case 'completed':
          filteredData = allTodos?.filter((todo) => todo.completed);
          break;
        case 'past-due':
          filteredData = allTodos?.filter((todo) => todo.pastDue);
          break;
        default:
          filteredData = allTodos;
      }
      return filteredData || [];
    });

    return {};
  })
);
