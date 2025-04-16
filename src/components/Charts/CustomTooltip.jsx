import React from 'react'

const CustomTooltip = ({active, payload}) => {
  if(active && payload && payload.length)
  {
    return (
      <div className='bg-white shadow-md rounded-lg p-2 border border-gray-300'>
        <p className='text-sx text-purple-800 font-semibold mb-1'>{payload[0].name}</p>
        <p className='text-sm text-gray-600'>
          Số tiền: <span className='text-sm text-gray-900 font-medium'>{payload[0].value.toLocaleString('vi-VN')}đ</span>
        </p>
      </div>
    )
  }
}

export const CustomTooltipOverviewIncome = ({active, payload}) => {
  if(active && payload && payload.length)
  {
    // console.log(payload[0].payload);
    return (
      <div className='bg-white shadow-md rounded-lg p-2 border border-gray-300'>
        <p className='text-sx text-purple-800 font-semibold mb-1'>{payload[0].payload["Nguồn"]}</p>
        <p className='text-sm text-gray-600'>
          Số tiền: <span className='text-sm text-gray-900 font-medium'>{payload[0].payload["Tiền"].toLocaleString('vi-VN')}đ</span>
        </p>
      </div>
    )
  }
}

export const CustomTooltipExpenseBar = ({active, payload}) => {
  if(active && payload && payload.length)
  {
    // console.log(payload[0].payload);
    return (
      <div className='bg-white shadow-md rounded-lg p-2 border border-gray-300'>
        <p className='text-sx text-purple-800 font-semibold mb-1'>{payload[0].payload["Loại"]}</p>
        <p className='text-sm text-gray-600'>
          Số tiền: <span className='text-sm text-gray-900 font-medium'>{payload[0].payload["Tiền"].toLocaleString('vi-VN')}đ</span>
        </p>
      </div>
    )
  }
}

export const CustomTooltipOverviewExpense = ({active, payload}) => {
  if(active && payload && payload.length)
  {
    // console.log(payload[0].payload);
    return (
      <div className='bg-white shadow-md rounded-lg p-2 border border-gray-300'>
        <p className='text-sx text-purple-800 font-semibold mb-1'>{payload[0].payload["Loại"]}</p>
        <p className='text-sm text-gray-600'>
          Số tiền: <span className='text-sm text-gray-900 font-medium'>{payload[0].payload["Tiền"].toLocaleString('vi-VN')}đ</span>
        </p>
      </div>
    )
  }
}

export default CustomTooltip
