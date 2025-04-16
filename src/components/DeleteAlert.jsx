import React from 'react'

const DeleteAlert = ({content, onDelete}) => {
  return (
    <div>
      <p className='text-sm'>{content}</p>

      <div className='flex justify-end mt-6'>
        <button className='add-btn add-btn-fill' type='button' onClick={onDelete}>
          Xóa
        </button>
      </div>
    </div>
  )
}

export default DeleteAlert