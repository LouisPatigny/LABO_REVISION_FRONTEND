import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { loginForm } from '../../forms/login.form';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm : FormGroup;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _formBuilder: FormBuilder,
  ) {
    this.loginForm = this._formBuilder.group({...loginForm})
  }

  submit() {
    this.loginForm.markAllAsTouched();

    if (!this.loginForm.valid) return

    this._authService.login(this.loginForm.value).subscribe({
      next: () => this._router.navigate(['/']),
      error: () => console.log('Login failed')})
  }
}
