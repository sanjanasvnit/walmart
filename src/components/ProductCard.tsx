// src/components/ProductCard.tsx
import React from 'react'

type Product = {
  title: string
  description: string
  price: string
  rating: number
  reviews: number
  image: string
}

type Props = {
  data: Product
}

const ProductCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm">
      <img src={data.image} alt={data.title} className="w-40 h-40 object-cover rounded" />
      <h2 className="font-semibold text-lg mt-2">{data.title}</h2>
      <p className="text-sm text-gray-600">{data.description}</p>
      <p className="text-md mt-2 font-medium">Price: {data.price}</p>
      <p className="text-sm text-gray-500">⭐ {data.rating} ({data.reviews} reviews)</p>
    </div>
  )
}

export default ProductCard
