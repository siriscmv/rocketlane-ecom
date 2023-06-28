export interface Item {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
}

export interface Cart {
  id: number;
  quantity: number;
  productItem: Item;
}
