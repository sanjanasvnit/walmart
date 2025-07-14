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
    <div className="flex-1 overflow-y-auto px-4 py-6 md:px-16 lg:px-32 space-y-6">
      {messages.map((msg, index) => (
        <div key={index} className="w-full">
          {msg.type === 'text' ? (
            <MessageBubble message={msg} />
          ) : (
            <ProductCard data={normalizeProduct(msg.content)} />
          )}
        </div>
      ))}
    </div>
  )
}

export default ChatWindow
