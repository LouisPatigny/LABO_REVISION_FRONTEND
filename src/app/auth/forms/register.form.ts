import { Validators } from '@angular/forms';

export const registerForm = {
  email: ['', Validators.required],
  password: ['', Validators.required],
  passwordConfirm: ['', Validators.required],
};
