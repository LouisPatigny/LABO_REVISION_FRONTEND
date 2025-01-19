import {ShippingAddressModel} from './shipping.address.model';

export interface CheckoutPayload {
  email: string;
  shippingAddress: ShippingAddressModel;
  cartItems: {
    productId: number;
    quantity: number;
    unitPrice: number;
  }[];
  discountApplied: number;
  totalAmount: number;
  status: string;
  orderDate: string;
}
