import React, { useState } from 'react'
import EmojiPicker from "emoji-picker-react"
import { LuX, LuImage } from 'react-icons/lu'

const EmojiPickerPopup = ({icon, onSelect}) => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='flex flex-col md:flex-row items-start gap-5 mb-6'>
      <div className='flex items-center gap-4 cursor-pointer' onClick={() => setIsOpen(true)}>
        <div className='size-12 flex items-center justify-center text-2xl bg-purple-50 text-primary rounded-lg'>
          {icon ? (
            <img src={icon} alt="icon" className='size-12'/>
          ) : (
            <LuImage className=''/>
          )}
        </div>

        <p className=''>{icon ? "Thay đổi icon" : "Chọn icon"}</p>
      </div>

      {isOpen && (
        <div className='relative'> 
          <button className='size-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer' onClick={() => setIsOpen(false)}> 
            <LuX className=''/>
          </button>

          <EmojiPicker
            open={isOpen}
            onEmojiClick={(emoji) => onSelect(emoji?.imageUrl || "")}
          />
        </div>
      )}
    </div>
  )
}

export default EmojiPickerPopup