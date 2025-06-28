import { Component, inject } from '@angular/core';
import { CustomerService } from '../../../_services/customer.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private customerService = inject(CustomerService);
  model: any = {}
  private toastrService = inject(ToastrService);
  private router = inject(Router);

  login() {
    this.customerService.login(this.model).subscribe({
      next: (user) => {
        console.log(user);
        this.toastrService.success('Success');
        this.router.navigateByUrl("home");
      },
      error: (error) => {
        console.log(error);
        this.toastrService.success('Error');
      }
    })
  }
}
