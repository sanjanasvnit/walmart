// src/components/ProductCard.tsx
import React, { useState } from 'react'
import type { Product } from '../types/Product'

type Props = {
  data: Product
}

const ProductCard: React.FC<Props> = ({ data }) => {
  const [isInCart, setIsInCart] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const handleClick = () => {
    // Generate Walmart product URL - you can customize this format
    const productUrl = `https://www.walmart.com/ip/${data.productId}`
    window.open(productUrl, '_blank')
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsInCart(true)
    setTimeout(() => setIsInCart(false), 2000)
  }

  const handleSaveItem = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsSaved(!isSaved)
  }

  return (
    <div 
      onClick={handleClick}
      className="flex flex-col items-start gap-3 p-4 rounded-xl shadow-md bg-white border cursor-pointer hover:shadow-lg hover:border-[#0071CE] transition-all duration-200 transform hover:-translate-y-1 flex-shrink-0 relative"
      style={{ width: '320px', height: '640px' }}
    >
      {/* Walmart+ Badge */}
      {data.tags.includes('Best seller') && (
        <div className="absolute top-3 left-3 bg-[#0071CE] text-white text-xs px-2 py-1 rounded-full font-bold z-10">
          ✨ Best Seller
        </div>
      )}

      {/* Save Button */}
      <button
        onClick={handleSaveItem}
        className={`absolute top-3 right-3 p-2 rounded-full transition-colors z-10 ${
          isSaved ? 'text-red-500 bg-red-50' : 'text-gray-400 bg-white hover:text-red-500'
        }`}
      >
        {isSaved ? '❤️' : '🤍'}
      </button>
      {/* Image */}
      <img
        src={data.imageUrl}
        alt={data.name}
        className="w-full h-40 object-cover rounded-lg border"
      />

      {/* Info */}
      <div className="flex-1 space-y-2 w-full">
        {/* Title */}
        <h2 className="text-base font-semibold text-gray-900 hover:text-[#0071CE] transition-colors line-clamp-2 leading-tight">{data.name}</h2>

        {/* Price Section */}
        <div className="space-y-1">
          {data.discount_offers && (
            <div className="bg-red-500 text-white text-xs px-2 py-1 rounded inline-block font-bold">
              ROLLBACK ✨
            </div>
          )}
          <div className="flex items-center gap-2">
            <span className="text-[#0071CE] font-bold text-xl">${data.price.toFixed(2)}</span>
            {data.discount_offers && (
              <span className="text-gray-500 line-through text-sm">$5.97</span>
            )}
          </div>
          <div className="text-xs text-gray-600">{data.pricePerUnit}</div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-yellow-600">
            ⭐ {data.rating} <span className="text-gray-500">({data.reviewCount} reviews)</span>
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700 line-clamp-2">
          {data.description}
        </p>

        {/* Shipping Info */}
        <div className="space-y-1">
          {data.shippingInfo?.pickup && (
            <div className="flex items-center gap-1 text-sm text-green-700">
              <span className="text-green-600">📍</span>
              <strong>Free Pickup:</strong> {data.shippingInfo.pickup.replace('Pickup - ', '')}
            </div>
          )}
          {data.shippingInfo?.delivery && (
            <div className="flex items-center gap-1 text-sm text-green-700">
              <span className="text-green-600">🚚</span>
              <strong>Free Delivery:</strong> {data.shippingInfo.delivery.replace('Delivery - ', '')}
            </div>
          )}
        </div>

        {/* Walmart+ Benefits */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
          <div className="text-xs text-[#0071CE] font-semibold">Walmart+ Benefits:</div>
          <div className="text-xs text-gray-600">✓ Free shipping ✓ Member prices ✓ Mobile Scan & Go</div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {data.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="bg-[#FFC220] text-[#004c91] text-xs px-2 py-1 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Quantity and Add to Cart */}
        <div className="mt-auto pt-3 space-y-2">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Qty:</label>
            <select 
              value={quantity} 
              onChange={(e) => setQuantity(Number(e.target.value))}
              onClick={(e) => e.stopPropagation()}
              className="border rounded px-2 py-1 text-sm"
            >
              {[1,2,3,4,5].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          
          <button
            onClick={handleAddToCart}
            className={`w-full py-2 px-4 rounded-full font-semibold text-sm transition-all ${
              isInCart 
                ? 'bg-green-500 text-white' 
                : 'bg-[#FFC220] hover:bg-[#ffb800] text-[#004c91]'
            }`}
          >
            {isInCart ? '✓ Added to Cart!' : 'Add to Cart'}
          </button>
        </div>

        {/* Stock Status */}
        <div className="text-xs text-gray-500 text-center">
          <span className="text-green-600">●</span> {data.stockStatus} in {data.locationAvailability}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
