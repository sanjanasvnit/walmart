// src/components/ChatWindow.tsx
import React from 'react'
import type { Message } from '../App'
import MessageBubble from './MessageBubble'
import ProductCard from './ProductCard'
import type { Product } from '../types/Product' // update path as needed

type Props = {
  messages: Message[]
}

// Optional: map raw product data to match ProductCard expectations
const normalizeProduct = (raw: any): Product => ({
  productId: raw.productId || raw['Product ID'] || '',
  name: raw.name || raw['Name'] || '',
  brand: raw.brand || raw['Brand'] || '',
  category: raw.category || raw['Category'] || '',
  description: raw.description || raw['Description'] || '',
  price: typeof raw.price === 'number' ? raw.price : parseFloat(raw.price) || 0,
  rating: typeof raw.rating === 'number' ? raw.rating : parseFloat(raw.rating) || 0,
  reviewCount: typeof raw.reviewCount === 'number' ? raw.reviewCount : parseInt(raw.reviewCount) || 0,
  imageUrl: raw.imageUrl || raw['Image URL'] || '',
  specifications: raw.specifications || {},
  size_weight: raw.size_weight || raw['Size/Weight'] || raw['size/weight'] || '',
  ingredients: raw.ingredients || raw['Ingredients'] || '',
  stockStatus: raw.stockStatus || raw['Stock Status'] || '',
  shippingInfo: raw.shippingInfo || {},
  nutritionFacts: raw.nutritionFacts || null,
  pricePerUnit: raw.pricePerUnit || raw['Price/Unit'] || '',
  discount_offers: raw.discount_offers || raw['Discount/Offers'] || raw['discount/offers'] || '',
  locationAvailability: raw.locationAvailability || raw['Location Availability'] || '',
  tags: raw.tags || [],
  lastUpdated: raw.lastUpdated || '',
});
 
const ChatWindow: React.FC<Props> = ({ messages }) => {
  console.log(messages);
  return (
    <div className="flex-1 overflow-y-auto px-4 pt-8 pb-6 space-y-6 max-w-full">
      {messages.map((msg, index) => (
        <div key={index} className="w-full">
          <br />
          {msg.type === 'text' ? (
            <MessageBubble message={msg} />
          ) : (
            <div className="flex w-full justify-start">
              <div className="flex items-start gap-3 flex-row max-w-full">
                {/* Bot Avatar */}
                <img
                  src="https://icon-library.com/images/2018/606841_walmart-imagenes-del-logo-de-walmart-png-download.png"
                  alt="Bot Avatar"
                  className="w-8 h-8 rounded-full object-contain flex-shrink-0 mt-1 bg-white p-1.5"
                />
                {/* Product Cards Container */}
                <div className="flex-1 overflow-x-auto">
                  <div className="flex gap-4 pb-2 w-max">
                  {Array.isArray(msg.content) ? (
                    msg.content.map((product, idx) => {
                      // If product has a 'data' property, use it; else use product directly
                      const prodData = product && typeof product === 'object' && 'data' in product ? product.data : product;
                      return <ProductCard key={idx} data={normalizeProduct(prodData)} />
                    })
                  ) : (
                    <ProductCard data={normalizeProduct(msg.content)} />
                  )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default ChatWindow
