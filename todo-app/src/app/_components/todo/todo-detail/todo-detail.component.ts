import { Component, inject, OnInit } from '@angular/core';
import { TodoService } from '../../../_services/todo.service';
import { ToastrService } from 'ngx-toastr';
import { Todo } from '../../../_models/todo';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo-detail',
  imports: [FormsModule, CommonModule],
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.css'
})
export class TodoDetailComponent implements OnInit {
    private todoService = inject(TodoService);
    private toastrService = inject(ToastrService);
    todo: any = {};
    private route = inject(ActivatedRoute);

    ngOnInit(): void {
      this.route.paramMap.subscribe(
        params => {
          const idParam = params.get("id");
          if (idParam) {
            this.get(Number(idParam));
          }
        }
      )
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
