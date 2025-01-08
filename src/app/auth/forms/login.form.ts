import { Validators } from '@angular/forms';

export const loginForm = {
  email: ['', Validators.required],
  password: ['', Validators.required],
};
