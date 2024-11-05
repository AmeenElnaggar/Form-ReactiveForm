import { Component } from '@angular/core';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports:[SignupComponent,LoginComponent]
})
export class AppComponent {}
