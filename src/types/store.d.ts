
export interface Store {
  appError: AppError | null;
  cartItems: OrderItem[];
  paymentMethod: PaymentMethod;
  setAppError: (error: AppError | null) => void;
  addCartItem: (item: OrderItem) => void;
  removeCartItem: (item: number) => void;
  setPaymentMethod: (item: PaymentMethod) => void;
}