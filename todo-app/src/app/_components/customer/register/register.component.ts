import { Component, inject } from '@angular/core';
import { CustomerService } from '../../../_services/customer.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private customerService = inject(CustomerService);
  model: any = {}
  private toastrService = inject(ToastrService);

  register() {
    this.customerService.register(this.model).subscribe({
      next: (user) => {
        console.log(user);
        this.toastrService.success('Success');
      },
      error: (error) => {
        console.log(error);
        this.toastrService.success('Error');
      }
    })
  }
}
