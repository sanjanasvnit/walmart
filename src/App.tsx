// src/App.tsx
import { useState } from 'react'
import ChatWindow from './components/ChatWindow'
import ChatInput from './components/ChatInput'

type TextMessage = {
  sender: 'user' | 'bot'
  type: 'text'
  content: string
}

type ProductMessage = {
  sender: 'bot'
  type: 'product'
  content: {
    title: string
    description: string
    price: string
    rating: number
    reviews: number
    image: string
  }
}

export type Message = TextMessage | ProductMessage

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      type: 'text',
      content: "Hi there I'm Wally and I'm your AI shopping assistant at Walmart. I hope you're having a good day. How can I help you today?"
    }
  ])

  const sendMessage = async (text: string) => {
    const userMessage: TextMessage = { sender: 'user', type: 'text', content: text }
    setMessages(prev => [...prev, userMessage])

    setMessages(prev => [...prev, { sender: 'bot', type: 'text', content: 'Finding the right product...' }])

    setTimeout(() => {
      const productMessage: ProductMessage = {
        sender: 'bot',
        type: 'product',
        content: {
          title: 'Wireless Noise-Canceling Headphones',
          description: 'Experience immersive sound with advanced noise-canceling technology.',
          price: '$249.99',
          rating: 4.6,
          reviews: 125,
          image: 'https://www.bhphotovideo.com/images/images2500x2500/beats_by_dr_dre_900_00183_01_studio_wireless_over_ear_headphone_1037578.jpg'
        }
      }

      setMessages(prev => [...prev.slice(0, -1), productMessage])
    }, 1500)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <ChatWindow messages={messages} />
      <ChatInput onSend={sendMessage} />
    </div>
  )
}

export default App
