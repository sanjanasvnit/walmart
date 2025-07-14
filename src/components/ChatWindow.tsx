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
    <div className="flex-1 overflow-y-auto px-4 pt-8 pb-6 space-y-6 max-w-full">
      {messages.map((msg, index) => (
        <div key={index} className="w-full">
          {index > 0 && <br />}
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
                    msg.content.map((product, idx) => (
                      <ProductCard key={idx} data={normalizeProduct(product)} />
                    ))
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
