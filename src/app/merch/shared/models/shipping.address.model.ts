export interface ShippingAddressModel {
  id?: number;              // null when creating a new one
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postalCode: string;
  country: string;
  phoneNumber?: string;

  // For guest email
  email?: string;
}
