// src/App.tsx
import { useState } from 'react'
import ChatWindow from './components/ChatWindow'
import ChatInput from './components/ChatInput'
import type { Product } from './types/Product' // make sure you create this type

type TextMessage = {
  sender: 'user' | 'bot'
  type: 'text'
  content: string
}

type ProductMessage = {
  sender: 'bot'
  type: 'product'
  content: Product | Product[]
}

export type Message = TextMessage | ProductMessage

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      type: 'text',
      content: "Hi there! I'm your AI shopping assistant at Walmart. Save Money. Live Better. ✨ How can I help you find what you're looking for today?",
    }
  ])

  const sendMessage = async (text: string) => {
    const userMessage: TextMessage = { sender: 'user', type: 'text', content: text }
    setMessages(prev => [...prev, userMessage])

    // Show a loading message while waiting for the backend
    setMessages(prev => [...prev, { sender: 'bot', type: 'text', content: 'Finding the right product...' }])

    try {
      const res = await fetch('http://localhost:3000/api/v1/retrieve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: "any", query: text }),
      })
      const data = await res.json()
console.log("data:",data);
      // Remove the loading message
      setMessages(prev => {
        const withoutLoading = prev.filter(
          m => !(m.sender === 'bot' && m.type === 'text' && m.content === 'Finding the right product...')
        )
        return withoutLoading
      })

      // Add assistant chat reply
      if (data.chat) {
        setMessages(prev => [...prev, { sender: 'bot', type: 'text', content: data.chat }])
      }

      // Add product cards for selectedProducts only
      if (data.selectedProducts && Array.isArray(data.selectedProducts) && data.selectedProducts.length > 0) {
        // Fetch product details for each selected productId
        Promise.all(
          data.selectedProducts.map((id: string) =>
            fetch(`http://localhost:3000/api/v1/product/${id}`)
              .then(res => res.ok ? res.json() : null)
              .catch(() => null)
          )
        ).then((products: any[]) => {
          // Filter out failed fetches
          const validProducts = products.filter(Boolean)
          if (validProducts.length > 0) {
            setMessages(prev => [...prev, { sender: 'bot', type: 'product', content: validProducts }])
          }
        })
      }
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'bot', type: 'text', content: 'Sorry, there was an error retrieving products.' }])
    }
  }

  return (
    <div className="flex flex-col h-screen bg-[#f7f8fa]">
      {/* Walmart Header */}
      <div className="bg-[#0071CE] text-white px-4 py-3 shadow-md">
        <div className="flex items-center justify-between max-w-6xl mx-auto py-2">
          <div className="flex items-center gap-3">
            <img
              src="https://icon-library.com/images/2018/606841_walmart-imagenes-del-logo-de-walmart-png-download.png"
              alt="Walmart"
              className="h-10 w-10 bg-white rounded px-2 py-2 object-contain"
            />
            <div>
              <h1 className="text-xl font-bold">Walmart Shopping Assistant</h1>
              <p className="text-sm text-blue-100">Save Money. Live Better. ✨</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[#FFC220] font-semibold">Free Pickup & Delivery</div>
            <div className="text-sm text-blue-100">Available on orders $35+</div>
          </div>
        </div>
         
      </div>
      
      <ChatWindow messages={messages} />
      <ChatInput onSend={sendMessage} />
    </div>
  )
}

export default App
