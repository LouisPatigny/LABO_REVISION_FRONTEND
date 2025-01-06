export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  status: string;
  createdAt: Date;
  deletedAt: Date | null;
  categoryId: number;
}
