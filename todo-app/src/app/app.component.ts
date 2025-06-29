import { AutoLogoutService } from './_services/auto-logout/auto-logout.service';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NavComponent } from "./_components/nav/nav.component";
import { CustomerService } from './_services/customer.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BsDropdownModule, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'todo-app';
  private customerService = inject(CustomerService);
  private autoLogoutService = inject(AutoLogoutService);

  setCurrentUser() {
    const userString = localStorage.getItem('user');

    if (userString) {
      const user = JSON.parse(userString);
      this.customerService.currentUser.set(user);
    }

    this.autoLogoutService.init();
  }

  ngOnInit(): void {
    this.setCurrentUser();
  }

}


