import { Component, inject } from '@angular/core';
import { TodoService } from '../../../_services/todo.service';
import { ToastrService } from 'ngx-toastr';
import { Todo } from '../../../_models/todo';

@Component({
  selector: 'app-todo-list',
  imports: [],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
    private todoService = inject(TodoService);
    private toastrService = inject(ToastrService);
    todos?:  Todo[] = [];

    list() {
      this.todoService.list().subscribe({
        next: (todos: any) => {
          this.todos = todos;
          console.log('success');
          this.toastrService.success('Success');
        },
        error: (error) => {
          console.log(error);
          this.toastrService.success('Fail');
        }
      })
    }
}
