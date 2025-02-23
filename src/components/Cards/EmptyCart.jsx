import React from 'react'

const EmptyCart = ({image, message}) => {
  return (
    <div className='flex items-center justify-center flex-col mt-28'>
      <img src={image} className='w-60'/>
      <p className='w-1/2 text-sm font-medium text-slate-600 text-center leading-7 mt-5'>{message}</p>
    </div>
  )
}

export default EmptyCart
