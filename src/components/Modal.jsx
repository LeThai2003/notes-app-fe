import React from 'react'

const Modal = ({isOpen, onClose, title, children}) => {

  if(!isOpen) return;

  return (
    <div className='fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full max-h-full overflow-y-auto overflow-x-hidden bg-black/20 bg-opacity-50'>
  
      <div className='max-w-2xl relative p-4 w-full max-h-full'>
        <div className='relative bg-white rounded-lg shadow-sm'>
          <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200'>
            <h3 className='text-lg font-medium text-gray-900'>{title}</h3>

            <button
              id='close_modal'
              onClick={onClose}
              type='button'
              className='text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg size-8 flex items-center justify-center cursor-pointer'
            >
              X
            </button>
          </div>

          <div className='p-4 md:p-5'>
            {children}
          </div>
        </div>


      </div>

    </div>
  )
}

export default Modal
