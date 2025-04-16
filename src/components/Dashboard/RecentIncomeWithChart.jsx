import React, { useEffect, useState } from 'react'
import CustomPieChart from '../Charts/CustomPieChart'

const RecentIncomeWithChart = ({data, totalIncome}) => {

  const [chartData, setChartData] = useState([]);

  const COLORS = ["#875cf5", "#fa2c37", "#ff6900", "#4f39f6"];

  const prepareChartData = () => {
    const dataArr = data?.map((item) => ({
      name: item?.source,
      amount: item?.amount
    }))

    setChartData(dataArr);
  };

  useEffect(() => {
    prepareChartData();

    return () => {};
  }, [data])



  return (
    <div className='card'>
      <div className='flex items-center justify-center'>
        <h5 className='text-lg'>Khoản thu 60 ngày gần đây</h5>
      </div>

      <CustomPieChart 
        data={chartData}
        label="Tổng thu"
        totalAmount={`${totalIncome.toLocaleString('vi-VN')}đ`}
        colors={COLORS}
        showTextAnchor={true}
      />
    </div>
  )
}

export default RecentIncomeWithChart
