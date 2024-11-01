export interface IRestaurant {
  restaurant_id: number;
  name: string;
  description?: string;
  location?: string;
  img: string;
  phone?: string;
  open_time?: string;
  close_time?: string;
}

export interface IMenuItem {
  item_id: number;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
}

export interface ICartItem {
  item_id: number;
  name: string;
  quantity: number;
  price: number;
}

export interface CartContextType {
  cartItems: ICartItem[];
  addToCart: (item: ICartItem) => void;
  clearCart: () => void;
}
