import React from 'react'
import { LuCheck } from 'react-icons/lu'
import { MdClose, MdDeleteOutline } from 'react-icons/md'

const ConfirmDelete = ({id, onDelete, title, onClose}) => {
  return (
    <div className='flex flex-col relative'>
      <div className='text-center'>
        <h3 className='text-slate-600'>Bạn có muốn xóa ghi chú <span className='text-slate-800 font-medium'>{title.toUpperCase()}</span></h3>
      </div>
      <button onClick={onClose} className='absolute top-[-10px] right-[-5px] cursor-pointer w-10 h-10 rounded-full hover:bg-slate-50 flex items-center justify-center'><MdClose className='text-xl text-slate-400'/>
      </button>
      <div className='grid grid-cols-2 gap-15 mt-4 mx-auto'>
        
        <div className='flex items-center justify-center cursor-pointer px-4 py-1 rounded bg-red-50 hover:bg-red-100' onClick={onClose}>
          <MdDeleteOutline className='text-xl text-red-500 mr-1'/> Hủy
        </div>
        <div className='flex items-center justify-center cursor-pointer px-4 py-1 rounded bg-green-50 hover:bg-green-100' onClick={() => onDelete(id)}>
          <LuCheck className='text-xl text-green-500 mr-1'/>Xóa
        </div>
      </div>
    </div>
  )
}

export default ConfirmDelete
