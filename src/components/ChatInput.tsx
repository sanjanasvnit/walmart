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
    <form onSubmit={handleSubmit} className="p-4 border-t bg-white flex gap-2">
      <input
        type="text"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-[#0071CE] focus:ring-1 focus:ring-[#0071CE]"
        placeholder="Type your message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="bg-[#0071CE] hover:bg-[#005ba1] text-white px-4 py-2 rounded-full text-sm transition-colors">
        Send
      </button>
    </form>
  )
}

export default ChatInput
