import { Customer } from './../_models/customer';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, map, Subject } from 'rxjs';
import { Todo } from '../_models/todo';

@Injectable({
  providedIn: 'root'
})
  export class TodoService {
    private http = inject(HttpClient);
    apiUrl = environment.apiUrl;
    private todoToEditSource = new BehaviorSubject<Todo | null>(null);
    currentTodoToEdit = this.todoToEditSource.asObservable();

    add(todoItem : Todo) {
      return this.http.post<Todo>(this.apiUrl + 'todo/add', todoItem);
    }

    list() {
      return this.http.get(this.apiUrl + 'todo/all');
    }

    get(id: number) {
      return this.http.get(this.apiUrl + 'todo/' + id);
    }

    delete(id: number) {
      return this.http.delete(this.apiUrl + 'todo/'+ id);
    }

    update(todoItem: Todo) {
      return this.http.put<Todo>(this.apiUrl + 'todo/update', todoItem);
    }

    sendTodo(todo: Todo) {
      this.todoToEditSource.next(todo);
    }
  }
