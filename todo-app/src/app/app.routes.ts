import { Routes } from '@angular/router';
import { HomeComponent } from './_components/home/home.component';
import { RegisterComponent } from './_components/customer/register/register.component';
import { LoginComponent } from './_components/customer/login/login.component';
import { TodoListComponent } from './_components/todo/todo-list/todo-list.component';
import { TodoRegisterComponent } from './_components/todo/todo-register/todo-register.component';
import { TodoDetailComponent } from './_components/todo/todo-detail/todo-detail.component';
import { TodoEditComponent } from './_components/todo/todo-edit/todo-edit.component';

  export const routes: Routes = [
    {path:'home', component: HomeComponent},
    {path:'register', component: RegisterComponent},
    {path:'login', component: LoginComponent},
    {path:'todo', component: TodoListComponent},
    {path:'todoAdd', component: TodoRegisterComponent},
    {path:'todoEdit', component: TodoEditComponent},
    {path:'todoDetail/:id', component: TodoDetailComponent},
    {path:'**', redirectTo: 'home', pathMatch:'full'}
  ];
