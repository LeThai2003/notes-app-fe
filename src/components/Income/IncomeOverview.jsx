import React, { use, useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import CustomBarChar from '../Charts/CustomBarChar'
import { prepareIncomeBarChartData } from '../../utils/helper';

const IncomeOverview = ({transactions, onAddIncome}) => {

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    setChartData(result);
  }, [transactions]);

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <div>
          <h5 className='text-lg'>Tổng quan thu nhập</h5>
          <p className='text-xs text-gray-400 mt-1'>Theo dõi khoản thu của bạn theo thời gian và từ đâu</p>
        </div>
        <button className='add-btn' onClick={onAddIncome}>
          <LuPlus size={20}/> Thêm
        </button>
      </div>  

      <div className='mt-10'>
        <CustomBarChar
          data={chartData}
        />
      </div>

    </div>
  )
}

export default IncomeOverview
