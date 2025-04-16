import React from 'react'
import { LuUtensils, LuTrendingUp, LuTrendingDown, LuTrash2 } from 'react-icons/lu'

const TransactionInfoCard = ({title, icon, date, amount, type, hideDeleteBtn, onDelete}) => {

  return (
    <div className='group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100 '>
      <div className='size-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full'>
        {icon ? (
          <img src={icon} className='size-6'/>
        ) : (
          <LuUtensils className=''/>
        )}
      </div>

      <div className='flex-1 flex items-center justify-between'>
        <div className=''> 
          <p className='text-sm font-medium text-gray-700'>{title}</p>
          <p className='text-xs text-gray-500 mt-1'>{date}</p>
        </div>

        <div className='flex items-center gap-2 '>
          {!hideDeleteBtn && (
            <button className='hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer' onClick={onDelete}> 
              <LuTrash2 size={18}/>
            </button>
          )}

          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${type == "income" ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500"}`}>
            <h6 className='text-xs font-medium'>
              {type == "income" ? "+" : "-"} {amount.toLocaleString('vi-VN')}đ
            </h6>
            {type == "income" ? <LuTrendingUp/> : <LuTrendingDown/>}
          </div>

        </div>

      </div> 

    </div>
  )
}

export default TransactionInfoCard
