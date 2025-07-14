import React from 'react'
import type { Message } from '../App'

type Props = {
  message: Extract<Message, { type: 'text' }>
}

const MessageBubble: React.FC<Props> = ({ message }) => {
  const isUser = message.sender === 'user'

  // Replace with actual avatar URLs
  const userAvatar = 'https://i.pravatar.cc/40?img=3'
  const botAvatar = 'https://icon-library.com/images/2018/606841_walmart-imagenes-del-logo-de-walmart-png-download.png'

  return (
   <div className={`flex w-full py-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-end gap-3 max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <img
          src={isUser ? userAvatar : botAvatar}
          alt={`${isUser ? 'User' : 'Bot'} Avatar`}
          className={`w-8 h-8 rounded-full flex-shrink-0 ${isUser ? 'object-cover' : 'object-contain bg-white p-1'}`}
        />

        {/* Bubble */}
        <div
          style={{
            lineHeight: "1.8rem",
            paddingLeft: "2.5ch",
            paddingRight: "2.5ch",
          }}
          className={`
            px-4 py-3 text-sm rounded-2xl max-w-fit
            whitespace-pre-wrap break-words
            ${isUser ? 'bg-[#0071CE] text-white' : 'bg-[#F2F2F2] text-gray-900'}
          `}
        >
          {message.content}
        </div>
      </div>
    </div>
  )
}

export default MessageBubble