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
  ...raw,
  size_weight: raw['size/weight'],
  discount_offers: raw['discount/offers'],
  shippingInfo: raw.shippingInfo || {},
})
 
const ChatWindow: React.FC<Props> = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 md:px-16 lg:px-32 space-y-4">
      {messages.map((msg, index) => (
        <div key={index} className="w-full">
          {msg.type === 'text' ? (
            <MessageBubble message={msg} />
          ) : (
            <div className="flex w-full px-4 py-6 justify-start">
              <div className="flex items-start gap-3 flex-row">
                {/* Bot Avatar */}
                <img
                  src="https://i.pravatar.cc/40?img=5"
                  alt="Bot Avatar"
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-1"
                />
                {/* Product Cards Container */}
                <div className="space-y-4">
                  {Array.isArray(msg.content) ? (
                    msg.content.map((product, idx) => (
                      <ProductCard key={idx} data={normalizeProduct(product)} />
                    ))
                  ) : (
                    <ProductCard data={normalizeProduct(msg.content)} />
                  )}
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
