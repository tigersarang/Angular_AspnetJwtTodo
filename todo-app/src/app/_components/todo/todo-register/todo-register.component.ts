import { Component, inject } from '@angular/core';
import { TodoService } from '../../../_services/todo.service';
import { ToastrService } from 'ngx-toastr';
import { Todo } from '../../../_models/todo';

@Component({
  selector: 'app-todo-register',
  imports: [],
  templateUrl: './todo-register.component.html',
  styleUrl: './todo-register.component.css'
})
export class TodoRegisterComponent {
    private todoService = inject(TodoService);
    private toastrService = inject(ToastrService);
    model: any = {};

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
}
