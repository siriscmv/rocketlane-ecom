export interface Item {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
}

export interface ShallowCartItem {
  id: number;
  quantity: number;
}

export interface CartItem extends ShallowCartItem {
  productItem: Item;
}

export interface Order {
  id: number;
  productDescriptions: CartItem[];
  orderedAt: number;
}

export interface Details {
  name: string;
  phone: string;
  address: string;
}
