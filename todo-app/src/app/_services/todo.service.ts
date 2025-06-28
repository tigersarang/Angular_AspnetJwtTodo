import { Customer } from './../_models/customer';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { map } from 'rxjs';
import { Todo } from '../_models/todo';

@Injectable({
  providedIn: 'root'
})
  export class TodoService {
    private http = inject(HttpClient);
    apiUrl = environment.apiUrl;

    add(todoItem : Todo) {
      return this.http.post<Todo>(this.apiUrl + 'todo/add', todoItem);
    }

    list() {
      return this.http.get(this.apiUrl + 'todo/all');
    }

    get(id: number) {
      return this.http.get(this.apiUrl + 'todo/' + id);
    }
  }
