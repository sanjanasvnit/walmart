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

    setMessages(prev => [...prev, { sender: 'bot', type: 'text', content: 'Finding the right product...' }])

    setTimeout(() => {
      const sampleProduct = {
        productId: '127348738',
        name: 'Pantene Pro-V Classic Clean Shampoo, 17.9 oz/530 mL',
        brand: 'Visit the Pantene Store',
        category: 'Beauty > Hair Care > Shampoo > All Shampoo',
        description: '72-HR NOURISHMENT: Provides hours of intense moisture vs. non-conditioning shampoo. Formulated with Pro-Vitamin B5 and antioxidants for healthy-looking hair.',
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
        discount_offers: 'Was $5.97, Now $4.97',
        locationAvailability: 'Sacramento, 95829',
        tags: [
          'Color Protection',
          'All Hair Types',
          'Alcohol-Free',
          '100+ bought since yesterday',
          'Best seller',
          'Popular pick'
        ],
        lastUpdated: new Date().toISOString()
      }

      const productMessage: ProductMessage = {
        sender: 'bot',
        type: 'product',
        content: [
          sampleProduct,
          {
            ...sampleProduct,
            productId: '127348739',
            name: 'Pantene Pro-V Daily Moisture Renewal Shampoo, 25.4 oz',
            price: 6.47,
            rating: 4.4,
            reviewCount: 312,
            size_weight: '25.4 fl oz',
            pricePerUnit: '25.5 ¢/fl oz',
            discount_offers: 'Was $7.47, Now $6.47',
            tags: ['Daily Moisture', 'All Hair Types', 'Value Size', 'Popular pick']
          },
          {
            ...sampleProduct,
            productId: '127348740',
            name: 'Pantene Pro-V Smooth & Sleek Shampoo, 17.9 oz',
            price: 4.97,
            rating: 4.5,
            reviewCount: 428,
            description: 'SMOOTH & SLEEK: Helps tame frizz and flyaways for smoother, more manageable hair. Formulated with argan oil for added shine.',
            tags: ['Frizz Control', 'Smooth & Sleek', 'Argan Oil', 'Best seller']
          }
        ]
      }

      setMessages(prev => [...prev.slice(0, -1), productMessage])
    }, 1500)
  }

  return (
    <div className="flex flex-col h-screen bg-[#f7f8fa]">
      {/* Walmart Header */}
      <div className="bg-[#0071CE] text-white px-4 py-3 shadow-md">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <img
              src="https://icon-library.com/images/2018/606841_walmart-imagenes-del-logo-de-walmart-png-download.png"
              alt="Walmart"
              className="h-8 w-8 bg-white rounded px-1.5 py-1.5 object-contain"
            />
            <div>
              <h1 className="text-lg font-bold">Walmart Shopping Assistant</h1>
              <p className="text-xs text-blue-100">Save Money. Live Better. ✨</p>
            </div>
          </div>
          <div className="text-right text-sm">
            <div className="text-[#FFC220] font-semibold">Free Pickup & Delivery</div>
            <div className="text-xs text-blue-100">Available on orders $35+</div>
          </div>
        </div>
         
      </div>
      <br/>
      
      <ChatWindow messages={messages} />
      <ChatInput onSend={sendMessage} />
    </div>
  )
}

export default App
