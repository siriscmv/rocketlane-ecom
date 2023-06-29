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
