// src/components/ChatInput.tsx
import React, { useState } from 'react'

type Props = {
  onSend: (message: string) => void
}

const ChatInput: React.FC<Props> = ({ onSend }) => {
  const [text, setText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    onSend(text)
    setText('')
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t bg-white flex gap-3 shadow-lg">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span>💬</span>
        <span>Ask about products, prices, or availability</span>
      </div>
      <input
        type="text"
        className="flex-1 px-4 py-3 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-[#0071CE] focus:ring-2 focus:ring-[#0071CE] focus:ring-opacity-20"
        placeholder="Search for products or ask questions..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button 
        type="submit" 
        className="bg-[#0071CE] hover:bg-[#005ba1] text-white px-6 py-3 rounded-full text-sm font-semibold transition-all transform hover:scale-105 shadow-md"
      >
        🔍 Search
      </button>
    </form>
  )
}

export default ChatInput
