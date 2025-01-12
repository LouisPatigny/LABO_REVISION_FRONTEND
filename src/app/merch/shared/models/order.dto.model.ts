export interface OrderDTOModel {
  id: number;
  email: string;
  orderDate: string;
  status: string;
  totalAmount: number;
  shippingAddressId?: number;
}
