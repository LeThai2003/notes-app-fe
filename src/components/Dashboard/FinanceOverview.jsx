import React from 'react'
import CustomPieChart from '../Charts/CustomPieChart';

const FinanceOverview = ({totalBalance, totalIncome, totalExpense}) => {

  const COLORS = ["#875cf5", "#fa2c37", "#ff6900"];

  const balanceData = [
    {name: "Số dư", amount: totalBalance},
    {name: "Tổng thu", amount: totalIncome},
    {name: "Tổng chi", amount: totalExpense},
  ]

  return (
    <div className='card'>
      <div className='flex items-center justify-center'>
        <h5 className='text-lg'>Tổng quan tài chính</h5>
      </div>

      <CustomPieChart 
        data={balanceData}
        label="Số dư"
        totalAmount={`${totalBalance.toLocaleString('vi-VN')}đ`}
        colors={COLORS}
        showTextAnchor={true}
      />
    </div>
  )
}

export default FinanceOverview
