export interface Sneaker {
  id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  images: string[]
  description: string
  sizes: string[]
  colors: string[]
  category: "running" | "lifestyle" | "basketball" | "skateboarding" | "limited-edition"
  isNew?: boolean
  isBestSeller?: boolean
  inStock: boolean
  rating: number
  reviewCount: number
}

export interface CartItem {
  sneaker: Sneaker
  size: string
  color: string
  quantity: number
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  address?: {
    street: string
    city: string
    postalCode: string
    country: string
  }
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: "pending" | "confirmed" | "shipped" | "delivered"
  createdAt: Date
  shippingAddress: {
    street: string
    city: string
    postalCode: string
    country: string
  }
}
