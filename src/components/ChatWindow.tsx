// src/components/ChatWindow.tsx
import React from 'react'
import type { Message } from '../App'
import MessageBubble from './MessageBubble'
import ProductCard from './ProductCard'

type Props = {
  messages: Message[]
}

const ChatWindow: React.FC<Props> = ({ messages }) => {
  return (
<div className="flex-1 overflow-y-auto px-4 py-6 md:px-16 lg:px-32 space-y-6">
      {messages.map((msg, index) => (
  <div key={index} className="w-full">
    {msg.type === 'text' ? (
      <MessageBubble message={msg} />
    ) : (
      <ProductCard data={msg.content} />
    )}
  </div>
))}

    </div>
  )
}

export default ChatWindow
