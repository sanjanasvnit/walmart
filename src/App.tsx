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
  content: Product
}

export type Message = TextMessage | ProductMessage

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      type: 'text',
      content: "Hi there I'm Wally and I'm your AI shopping assistant at Walmart. I hope you're having a good day. How can I help you today?",
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
          productId: '127348738',
          name: 'Pantene Pro-V Classic Clean Shampoo, 17.9 oz/530 mL',
          brand: 'Visit the Pantene Store',
          category: 'Beauty > Hair Care > Shampoo > All Shampoo',
          description: '72-HR NOURISHMENT: Provides hours of intense moisture vs. non-conditioning shampoo...',
          price: 4.97,
          rating: 4.6,
          reviewCount: 549,
          imageUrl: 'https://i5.walmartimages.com/seo/Pantene-Pro-V-Classic-Clean-Shampoo-17-9-oz-530-mL_eb8f4a1a-144d-47ef-80a9-7b52d5fdcac7.8eb53dee1da14f8b004c91f6e3203c51.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF',
          specifications: {
            Brand: 'Pantene',
            'Hair care key benefits': 'Color Protection',
            'Hair type': 'All Hair Types',
            'Ingredient preference': 'Alcohol-Free',
            Size: '17.9 fl oz'
          },
          size_weight: '17.9 fl oz',
          ingredients: 'Water, Sodium Lauryl Sulfate, Sodium Laureth Sulfate, ...',
          stockStatus: 'In Stock',
          shippingInfo: {
            shipping: 'Shipping - Arrives today - Order within 3 hr 44 min',
            pickup: 'Pickup - As soon as 11am - today',
            delivery: 'Delivery - As soon as 1 hour',
          },
          nutritionFacts: null,
          pricePerUnit: '27.8 ¢/fl oz',
          discount_offers: 'Was , Now $4.97',
          locationAvailability: 'Sacramento, 95829',
          tags: [
            'Color Protection',
            'All Hair Types',
            'Alcohol-Free',
            '100+ bought since yesterday, try a subscription',
            'Best seller',
            'Popular pick'
          ],
          lastUpdated: new Date().toISOString()
        }
      }

      setMessages(prev => [...prev.slice(0, -1), productMessage])
    }, 1500)
  }

  return (
    <div className="flex flex-col h-screen bg-[#f7f8fa]">
      <ChatWindow messages={messages} />
      <ChatInput onSend={sendMessage} />
    </div>
  )
}

export default App
