import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { registerForm } from '../../forms/register.form';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule
  ],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm : FormGroup;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _formBuilder: FormBuilder,
  ) {
    this.registerForm = this._formBuilder.group({...registerForm})
  }

  submit() {
    this.registerForm.markAllAsTouched();

    if (!this.registerForm.valid) return

    this._authService.register(this.registerForm.value).subscribe({
      next: () => this._router.navigate(['auth/login']),
      error: () => console.log('Registration failed')
    })
  }
}
