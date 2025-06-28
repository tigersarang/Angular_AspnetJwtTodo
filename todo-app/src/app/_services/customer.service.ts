import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Customer } from '../_models/customer';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
  export class CustomerService {
    private http = inject(HttpClient);
    apiUrl = environment.apiUrl;
    currentUser = signal<Customer | null>(null);

    register(customer: Customer) {
      return this.http.post<Customer>(this.apiUrl + 'Customer/register', customer).pipe(
        map(user => {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);
        })
      )
    }

    login(customer: Customer) {
      return this.http.post<Customer>(this.apiUrl + 'Customer/login', customer).pipe(
        map(user => {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);
        })
      )
    }

    logout() {
      localStorage.removeItem('user');
      this.currentUser.set(null);
    }
  }
