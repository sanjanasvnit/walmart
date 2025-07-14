import React from 'react'
import type { Message } from '../App'

type Props = {
  message: Extract<Message, { type: 'text' }>
}

const MessageBubble: React.FC<Props> = ({ message }) => {
  const isUser = message.sender === 'user'
  const MAX_CHARACTERS_PER_LINE = 50 // Adjust this value as needed

  // Replace with actual avatar URLs
  const userAvatar = 'https://i.pravatar.cc/40?img=3'
  const botAvatar = 'https://icon-library.com/images/2018/606841_walmart-imagenes-del-logo-de-walmart-png-download.png'

  // Function to insert line breaks when text exceeds max characters
  const formatTextWithLineBreaks = (text: string) => {
    const words = text.split(' ')
    let currentLine = ''
    let result = ''

    words.forEach(word => {
      if ((currentLine + word).length <= MAX_CHARACTERS_PER_LINE) {
        currentLine += (currentLine ? ' ' : '') + word
      } else {
        result += (result ? '\n' : '') + currentLine
        currentLine = word
      }
    })

    return result + (result ? '\n' : '') + currentLine
  }

  return (
   <div className={`flex w-full px-4 py-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-end gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <img
          src={isUser ? userAvatar : botAvatar}
          alt={`${isUser ? 'User' : 'Bot'} Avatar`}
          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
        />

        {/* Bubble */}
        <div
          className={`
            px-5 py-3 text-sm rounded-2xl
            whitespace-pre-wrap break-words w-fit max-w-[75%]
            ${isUser ? 'bg-[#0071CE] text-white' : 'bg-[#F2F2F2] text-gray-900'}
          `}
          style={{
            lineHeight: "1.8rem",
             paddingLeft: "2.5ch",
             paddingRight: "2.5ch",
            maxWidth: `${MAX_CHARACTERS_PER_LINE + 5}ch`,
          }}
        >
          {message.content}
        </div>
      </div>
    </div>
  )
}

export default MessageBubble