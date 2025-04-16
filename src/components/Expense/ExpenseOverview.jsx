import React, { useEffect, useState } from 'react'
import { prepareExpenseLineChartData } from '../../utils/helper';
import { LuPlus } from 'react-icons/lu';
import CustomLineChart from '../Charts/CustomLineChart';

const ExpenseOverview = ({transactions, onAddExpense}) => {

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    setChartData(result);
  }, [transactions])

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <div>
          <h5 className='text-lg'>Tổng quan chi tiêu</h5>
          <p className='text-xs text-gray-400 mt-1'>Theo dõi chi tiêu của bạn để biết bạn đã chi tiêu những gì</p>
        </div>
        <button className='add-btn' onClick={onAddExpense}>
          <LuPlus size={20}/> Thêm
        </button>
      </div>  

      <div className='mt-10'>
        <CustomLineChart data={chartData}/>
      </div>

    </div>
  )
}

export default ExpenseOverview