// src/components/ProductCard.tsx
import React, { useState } from 'react'
import type { Product } from '../types/Product'

type Props = {
  data: Product
}

const ProductCard: React.FC<Props> = ({ data }) => {
  const [isSaved, setIsSaved] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [details, setDetails] = useState<Product | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  console.log(data);
  const handleClick = () => {
    // Generate Walmart product URL - you can customize this format
    const productUrl = `https://www.walmart.com/ip/${data.productId}`
    window.open(productUrl, '_blank')
  }

  const handleSaveItem = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsSaved(!isSaved)
  }

  const handleDetails = async (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowModal(true)
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`http://localhost:3000/api/v1/product/${data.productId}`)
      console.log(res);
      if (!res.ok) throw new Error('Failed to fetch product details')
      const detailData = await res.json()
      setDetails(detailData)
    } catch (err: any) {
      setError(err.message || 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const closeModal = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowModal(false)
    setDetails(null)
    setError(null)
  }

  return (
    <div 
      onClick={handleClick}
      className="flex flex-col items-start gap-3 p-4 rounded-xl shadow-md bg-white border cursor-pointer hover:shadow-lg hover:border-[#0071CE] transition-all duration-200 transform hover:-translate-y-1 flex-shrink-0 relative"
      style={{ width: '280px', height: '420px' }}
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
      {data.imageUrl ? (
        <img
          src={data.imageUrl}
          alt={data.name}
          className="w-full h-24 object-cover rounded-lg border"
        />
      ) : (
        <div className="w-full h-24 flex items-center justify-center bg-gray-100 rounded-lg border text-gray-400 text-xs">
          No Image
        </div>
      )}

      {/* Info */}
      <div className="flex-1 space-y-2 w-full">
        {/* Title */}
        <h2 className="text-sm font-semibold text-gray-900 hover:text-[#0071CE] transition-colors line-clamp-2 leading-tight">{data.name}</h2>

        {/* Price and Rating Section */}
        <div className="space-y-2">
          {data.discount_offers && (
            <div className="bg-red-500 text-white text-xs px-2 py-1 rounded inline-block font-bold">
              ROLLBACK ✨
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[#0071CE] font-bold text-lg">${data.price.toFixed(2)}</span>
              {data.discount_offers && (
                <span className="text-gray-500 line-through text-sm">$5.97</span>
              )}
            </div>
            <span className="text-sm text-yellow-600">
              ⭐ {data.rating} <span className="text-gray-400">({data.reviewCount})</span>
            </span>
          </div>
          <div className="text-xs text-gray-500">{data.pricePerUnit}</div>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-600 line-clamp-2">
          {data.description}
        </p>

        {/* Location Info */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-2">
          <div className="flex items-center gap-1 text-xs text-green-700">
            <span className="text-green-600">📍</span>
            <strong>In Stock:</strong> {data.locationAvailability}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {data.tags.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className="bg-[#FFC220] text-[#004c91] text-xs px-2 py-0.5 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        {/* Details Button */}
        <button
          onClick={handleDetails}
          className="mt-2 px-3 py-1 bg-[#0071CE] text-white rounded-full text-xs font-semibold hover:bg-[#005ba1] transition-all"
        >
          Details
        </button>
      </div>
      {/* Modal for details */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" onClick={closeModal}>
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative" onClick={e => e.stopPropagation()}>
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={closeModal}>✖</button>
            {loading && <div>Loading...</div>}
            {error && <div className="text-red-500">{error}</div>}
            {details && (
              <div>
                <h2 className="text-lg font-bold mb-2">{details.name}</h2>
                <img src={details.imageUrl} alt={details.name} className="w-40 h-40 object-cover rounded mb-2" />
                <p className="mb-2">{details.description}</p>
                <div className="mb-2">Price: <span className="font-semibold">${details.price.toFixed(2)}</span></div>
                <div className="mb-2">Rating: <span className="font-semibold">{details.rating}</span> ({details.reviewCount} reviews)</div>
                <div className="mb-2">Stock: <span className="font-semibold">{details.stockStatus}</span></div>
                <div className="mb-2">Tags: {details.tags.join(', ')}</div>
                {/* Add more details as needed */}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductCard
