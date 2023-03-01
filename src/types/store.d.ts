export interface Store {
  appError: AppError | null;
  supabase: SupabaseClient<any, 'public', any> | undefined;
  cartItems: OrderItem[];
  paymentMethod: PaymentMethod;
  setAppError: (error: AppError | null) => void;
  addCartItem: (item: OrderItem) => void;
  removeCartItem: (item: number) => void;
  clearCartItems: () => void;
  setPaymentMethod: (item: PaymentMethod) => void;
}
