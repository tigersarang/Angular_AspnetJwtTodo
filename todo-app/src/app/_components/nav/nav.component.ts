import { Component, inject } from '@angular/core';
import { CustomerService } from '../../_services/customer.service';

@Component({
  selector: 'app-nav',
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  customerService = inject(CustomerService);

  logout() {
    this.customerService.logout();
  }

}
