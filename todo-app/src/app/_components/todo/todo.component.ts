  import { Component, inject } from '@angular/core';
  import { TodoService } from '../../_services/todo.service';
  import { ToastrService } from 'ngx-toastr';
  import { Todo } from '../../_models/todo';

  @Component({
    selector: 'app-todo',
    imports: [],
    templateUrl: './todo.component.html',
    styleUrl: './todo.component.css'
  })
  export class TodoComponent {
    private todoService = inject(TodoService);
    private toastrService = inject(ToastrService);
    model: any = {};
    todos?:  Todo[] = [];
    todo: any = {};

    add() {
      this.todoService.add(this.model).subscribe({
        next:() => {
          console.log('success');
          this.toastrService.success('Success');
        },
        error: (error) => {
          console.log(error);
          this.toastrService.success('Fail');
        }
      })
    }

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

    get(id: number) {
      this.todoService.get(id).subscribe({
        next: (todo: any) => {
          this.todo = todo;
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
