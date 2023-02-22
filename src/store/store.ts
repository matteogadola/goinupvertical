import { Store } from '@/types/store'
import { create } from 'zustand'

export const useStore = create<Store>((set) => ({
  appError: null,
  cartItems: [],
  paymentMethod: 'stripe',
  setAppError: (error) => set((state) => ({ ...state, error })),
  addCartItem: (item) => set((state) => ({ cartItems: [...state.cartItems, item]})),
  removeCartItem: (itemIndex) => set((state) => ({ ...state, cartItems: state.cartItems.filter((item, index) => index !== itemIndex) })),
  setPaymentMethod: (item) => set((state) => ({ ...state, paymentMethod: item })),
}))