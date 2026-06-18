export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  createdAt: string
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  imageUrl: string | null
  stock: number
  categoryId: string
  category?: Category
  createdAt: string
  updatedAt: string
}

export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  product?: Product
  quantity: number
  unitPrice: number
}

export interface Order {
  id: string
  status: OrderStatus
  total: number
  customerName: string
  customerEmail: string
  customerAddress: string
  items?: OrderItem[]
  createdAt: string
}

export interface CartItem {
  productId: string
  name: string
  price: number
  imageUrl: string | null
  quantity: number
}

export interface CartState {
  items: CartItem[]
  total: number
}

export interface CheckoutPayload {
  customerName: string
  customerEmail: string
  customerAddress: string
  items: Array<{ productId: string; quantity: number }>
}

export interface ApiListResponse<T> {
  data: T[]
  total: number
}

export interface ApiItemResponse<T> {
  data: T
}

export interface ApiErrorResponse {
  error: string
  details?: unknown
}
