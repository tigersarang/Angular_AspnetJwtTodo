import { Component, inject, model, OnInit } from '@angular/core';
import { TodoService } from '../../../_services/todo.service';
import { ToastrService } from 'ngx-toastr';
import { Todo } from '../../../_models/todo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  imports: [],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {
    private todoService = inject(TodoService);
    private toastrService = inject(ToastrService);
    todos?:  Todo[] = [];
    model: any = {};
    private router = inject(Router);

    ngOnInit(): void {
      this.list();
    }

    list() {
      this.todoService.list().subscribe({
        next: (todos: any) => {
          this.todos = todos;
          console.log('success');
          console.log(todos);
          this.toastrService.success('Success');
        },
        error: (error) => {
          console.log(error);
          this.toastrService.success('Fail');
        }
      })
    }

    delete(id: number) {
      console.log("id : " + id);
      this.todoService.delete(id).subscribe({
        next: _ => {
          this.todos = this.todos?.filter(todo => todo.id !== id);
          this.toastrService.success('success');
        },
        error: (error) => {
          console.log(error);
          this.toastrService.error(error);
        }
      })
    }

    edit(todo: Todo) {
      this.router.navigate(['todoEdit']);
      this.todoService.sendTodo(todo);
    }
}
