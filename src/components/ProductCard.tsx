// src/components/ProductCard.tsx
import React from 'react'
import type { Product } from '../types/Product'

type Props = {
  data: Product
}

const ProductCard: React.FC<Props> = ({ data }) => {
  const handleClick = () => {
    // Generate Walmart product URL - you can customize this format
    const productUrl = `https://www.walmart.com/ip/${data.productId}`
    window.open(productUrl, '_blank')
  }

  return (
    <div 
      onClick={handleClick}
      className="flex flex-col md:flex-row items-start gap-6 p-6 rounded-xl shadow-md bg-white border w-full max-w-[90%] cursor-pointer hover:shadow-lg hover:border-[#0071CE] transition-all duration-200 transform hover:-translate-y-1"
    >
      {/* Image */}
      <img
        src={data.imageUrl}
        alt={data.name}
        className="w-48 h-48 object-cover rounded-lg border"
      />

      {/* Info */}
      <div className="flex-1 space-y-3">
        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 hover:text-[#0071CE] transition-colors">{data.name}</h2>

        {/* Price + Rating */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[#0071CE] font-bold text-2xl">${data.price.toFixed(2)}</span>
          <span className="text-sm text-yellow-600">
            ⭐ {data.rating} <span className="text-gray-500">({data.reviewCount} reviews)</span>
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700 line-clamp-3 mb-4">
          {data.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
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
        <div className="text-sm text-gray-600 space-y-1 mb-3">
          <div><strong>Availability:</strong> {data.stockStatus}</div>
          {data.shippingInfo?.pickup && (
            <div><strong>Pickup:</strong> {data.shippingInfo.pickup}</div>
          )}
          {data.shippingInfo?.delivery && (
            <div><strong>Delivery:</strong> {data.shippingInfo.delivery}</div>
          )}
        </div>

        {/* Location + Offer */}
        <div className="text-sm text-gray-500 space-y-1">
          {data.discount_offers && (
            <div className="text-green-700 font-medium">{data.discount_offers}</div>
          )}
          <div>{data.locationAvailability}</div>
        </div>

        {/* Click indicator */}
        <div className="text-xs text-[#0071CE] font-medium mt-4 opacity-70">
          Click to view on Walmart.com →
        </div>
      </div>
    </div>
  )
}

export default ProductCard
