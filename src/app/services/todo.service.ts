import { Injectable } from '@angular/core';
import { Observable, debounceTime, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { TODOS } from '../data/todos.mock';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  readonly STORAGE_KEY = 'TODO_APP_LIST';
  constructor() {}

  private persistTodos(todos: Todo[]): Observable<Todo[]> {
    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify(this.updatePastDue(todos))
    );
    return of(todos).pipe(debounceTime(500));
  }

  private updatePastDue(todos: Todo[]): Todo[] {
    return todos.map((todo) => ({
      ...todo,
      pastDue: new Date(todo.dueDate) < new Date(),
    }));
  }

  loadTodos() {
    const todoList = localStorage.getItem(this.STORAGE_KEY);
    return todoList
      ? of(JSON.parse(todoList) as Todo[]).pipe(debounceTime(500))
      : this.persistTodos(TODOS);
  }

  toggleTodo(
    id: string,
    completed: boolean,
    todos: Todo[]
  ): Observable<Todo[]> {
    return this.persistTodos(
      todos.map((t) => (t.id === id ? { ...t, completed } : t))
    );
  }
  deleteTodo(id: string, todos: Todo[]): Observable<Todo[]> {
    return this.persistTodos(todos.filter((t) => t.id !== id));
  }
  addTodo(todo: Partial<Todo>, todos: Todo[]): Observable<Todo[]> {
    return this.persistTodos([...todos, { ...todo, id: uuidv4() } as Todo]);
  }
}
