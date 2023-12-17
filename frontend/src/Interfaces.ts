export interface Token {
  user_id: number;
  exp: number;
  is_staff: boolean;
  email: string;
  name: string;
  last_name: string;
  avatar: File | null;
}

export interface Product {
  id?: number;
  name: string;
  slug?: string;
  description: string;
  price: number;
  rating?: number;
  count_in_stock: number;
  category: string;
  image: File | null;
  quantity?: number;
  num_reviews?: number;
}

export interface User {
  id: number;
  email: string;
  name: string;
  last_name: string;
  avatar: File | null;
  is_staff: boolean;
}

export interface Order {
  id: number;
  total_price: number;
  address: string;
  city: string;
  postal_code: string;
  order_items: Product[];
  is_delivered: boolean;
  created_at: string;
  delivered_at: string;
}
