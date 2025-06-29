import { ToastrService } from 'ngx-toastr';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../../_services/todo.service';
import { Subscription } from 'rxjs';
import { Todo } from '../../../_models/todo';

@Component({
  selector: 'app-todo-edit',
  imports: [FormsModule],
  templateUrl: './todo-edit.component.html',
  styleUrl: './todo-edit.component.css'
})
export class TodoEditComponent implements OnInit, OnDestroy {
  private todoService = inject(TodoService);
  private toastrService = inject(ToastrService);
  private todoSubscription: Subscription | undefined;
  todoEdit?: Todo;

  update() {
    if (this.todoEdit === undefined) {
      this.toastrService.error("Todo 정보 오류");
      return;
    }

    this.todoService.update(this.todoEdit).subscribe({
      next: (todo) => {
        this.toastrService.success("success");
      },
      error: (error) => {
        this.toastrService.error(error);
      }
    })
  }

  ngOnInit(): void {
    console.log('todoedit');
    this.todoSubscription = this.todoService.currentTodoToEdit.subscribe(
      todo => {
        if (todo) {
          this.todoEdit = todo;
          console.log('받은 todo : ' + this.todoEdit);
        }
      }
    )
  }

  ngOnDestroy(): void {
    if (this.todoSubscription) {
      this.todoSubscription.unsubscribe();
    }
  }
}
