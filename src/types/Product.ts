// src/types/Product.ts (recommended location)
export type Product = {
  productId: string
  name: string
  brand: string
  category: string
  description: string
  price: number
  rating: number
  reviewCount: number
  imageUrl: string
  specifications: Record<string, string>
  size_weight: string // mapped from "size/weight"
  ingredients: string
  stockStatus: string
  shippingInfo: {
    shipping: string
    pickup: string
    delivery: string
  }
  nutritionFacts: null | any
  pricePerUnit: string
  discount_offers: string // mapped from "discount/offers"
  locationAvailability: string
  tags: string[]
  lastUpdated: string
}
