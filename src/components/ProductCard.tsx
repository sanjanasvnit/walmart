// src/components/ProductCard.tsx
import React from 'react'
import type { Product } from '../types/Product'

type Props = {
  data: Product
}

const ProductCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="flex flex-col md:flex-row items-start gap-4 p-4 rounded-xl shadow-md bg-white border w-full max-w-[90%]">
      {/* Image */}
      <img
        src={data.imageUrl}
        alt={data.name}
        className="w-40 h-40 object-cover rounded-lg border"
      />

      {/* Info */}
      <div className="flex-1 space-y-2">
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900">{data.name}</h2>

        {/* Price + Rating */}
        <div className="flex items-center justify-between">
          <span className="text-[#0071CE] font-bold text-xl">${data.price.toFixed(2)}</span>
          <span className="text-sm text-yellow-600">
            ⭐ {data.rating} <span className="text-gray-500">({data.reviewCount} reviews)</span>
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700 line-clamp-3">
          {data.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-2">
          {data.tags.slice(0, 4).map((tag, index) => (
            <span
              key={index}
              className="bg-[#FFC220] text-[#004c91] text-xs px-2 py-1 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stock + Shipping */}
        <div className="text-xs text-gray-600 mt-2">
          <div><strong>Availability:</strong> {data.stockStatus}</div>
          {data.shippingInfo?.pickup && (
            <div><strong>Pickup:</strong> {data.shippingInfo.pickup}</div>
          )}
          {data.shippingInfo?.delivery && (
            <div><strong>Delivery:</strong> {data.shippingInfo.delivery}</div>
          )}
        </div>

        {/* Location + Offer */}
        <div className="text-xs text-gray-500 mt-1">
          {data.discount_offers && (
            <div className="text-green-700 font-medium">{data.discount_offers}</div>
          )}
          <div>{data.locationAvailability}</div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
