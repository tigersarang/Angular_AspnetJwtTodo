import { Component, inject } from '@angular/core';
import { TodoService } from '../../../_services/todo.service';
import { ToastrService } from 'ngx-toastr';
import { Todo } from '../../../_models/todo';

@Component({
  selector: 'app-todo-detail',
  imports: [],
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.css'
})
export class TodoDetailComponent {
    private todoService = inject(TodoService);
    private toastrService = inject(ToastrService);
    todo: any = {};


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
