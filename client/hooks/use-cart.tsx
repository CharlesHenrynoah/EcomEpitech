"use client"

import type React from "react"

import { createContext, useContext, useReducer, type ReactNode } from "react"
import type { CartItem, Sneaker } from "@/lib/types"

interface CartState {
  items: CartItem[]
  total: number
}

type CartAction =
  | { type: "ADD_ITEM"; payload: { sneaker: Sneaker; size: string; color: string; quantity: number } }
  | { type: "REMOVE_ITEM"; payload: { id: string; size: string; color: string } }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; size: string; color: string; quantity: number } }
  | { type: "CLEAR_CART" }

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
  addItem: (sneaker: Sneaker, size: string, color: string, quantity?: number) => void
  removeItem: (id: string, size: string, color: string) => void
  updateQuantity: (id: string, size: string, color: string, quantity: number) => void
  clearCart: () => void
  items: CartItem[]
  total: number
} | null>(null)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const { sneaker, size, color, quantity } = action.payload
      const existingItemIndex = state.items.findIndex(
        (item) => item.sneaker.id === sneaker.id && item.size === size && item.color === color,
      )

      if (existingItemIndex > -1) {
        const updatedItems = [...state.items]
        updatedItems[existingItemIndex].quantity += quantity
        const total = updatedItems.reduce((sum, item) => sum + item.sneaker.price * item.quantity, 0)
        return { items: updatedItems, total }
      } else {
        const newItems = [...state.items, { sneaker, size, color, quantity }]
        const total = newItems.reduce((sum, item) => sum + item.sneaker.price * item.quantity, 0)
        return { items: newItems, total }
      }
    }
    case "REMOVE_ITEM": {
      const { id, size, color } = action.payload
      const filteredItems = state.items.filter(
        (item) => !(item.sneaker.id === id && item.size === size && item.color === color),
      )
      const total = filteredItems.reduce((sum, item) => sum + item.sneaker.price * item.quantity, 0)
      return { items: filteredItems, total }
    }
    case "UPDATE_QUANTITY": {
      const { id, size, color, quantity } = action.payload
      if (quantity <= 0) {
        return cartReducer(state, { type: "REMOVE_ITEM", payload: { id, size, color } })
      }
      const updatedItems = state.items.map((item) =>
        item.sneaker.id === id && item.size === size && item.color === color ? { ...item, quantity } : item,
      )
      const total = updatedItems.reduce((sum, item) => sum + item.sneaker.price * item.quantity, 0)
      return { items: updatedItems, total }
    }
    case "CLEAR_CART":
      return { items: [], total: 0 }
    default:
      return state
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 })

  const addItem = (sneaker: Sneaker, size: string, color: string, quantity = 1) => {
    dispatch({ type: "ADD_ITEM", payload: { sneaker, size, color, quantity } })
  }

  const removeItem = (id: string, size: string, color: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id, size, color } })
  }

  const updateQuantity = (id: string, size: string, color: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, size, color, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        items: state.items,
        total: state.total,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
