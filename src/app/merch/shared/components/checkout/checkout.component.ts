import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../auth/services/auth.service';
import { MerchService } from '../../services/merch.service';
import { CartService } from '../../services/cart.service';
import { ShippingAddressModel } from '../../models/shipping.address.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  checkoutForm!: FormGroup; // Define type explicitly
  cartTotal = 0;
  potentialDiscount = 0;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private merchService: MerchService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.checkoutForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required],
      phoneNumber: [''],
    });

    const userEmail = this.authService.getCurrentUserEmail();
    if (userEmail) {
      this.checkoutForm.patchValue({ email: userEmail });
      this.checkoutForm.controls['email'].disable(); // Disable the email field
    }

    this.cartTotal = this.cartService.getTotal();

    this.merchService.getCurrentFidelityPointsIfLoggedIn().subscribe(points => {
      if (points === 3) {
        this.potentialDiscount = 5;
      }
    });
  }

  onSubmit() {
    if (this.checkoutForm.invalid) {
      return;
    }

    const shippingAddress: ShippingAddressModel = {
      firstName: this.checkoutForm.value.firstName!,
      lastName: this.checkoutForm.value.lastName!,
      addressLine1: this.checkoutForm.value.addressLine1!,
      addressLine2: this.checkoutForm.value.addressLine2 || undefined,
      city: this.checkoutForm.value.city!,
      postalCode: this.checkoutForm.value.postalCode!,
      country: this.checkoutForm.value.country!,
      phoneNumber: this.checkoutForm.value.phoneNumber || undefined,
      email: this.checkoutForm.value.email
    };

    // If you're logged in, you can optionally ignore the form's email
    // but for a guest, you need it:
    let email = this.checkoutForm.value.email!;

    this.merchService.checkoutOrder(shippingAddress).subscribe({
      next: () => {
        alert('Votre commande a bien été effectuée !');
        this.router.navigate(['/merch']);
      },
      error: (err) => {
        console.error('Une erreur est survenue:', err);
        alert('Erreur lors de la création de la commande.');
      }
    });
  }
}
