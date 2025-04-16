import React, { useEffect, useState } from 'react'
import { prepareExpenseBarChartData } from '../../utils/helper';
import CustomBarChar from '../Charts/CustomBarChar';

const Last30DaysExpenses = ({data}) => {

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(data);
    setChartData(result);

    return() => {};
  }, [data]);


  return (
    <div className='card col-span-1'>
      <div className='flex items-center justify-between'>
        <h5 className=''>Chi tiêu 30 ngày gần đây</h5>
      </div>

      <CustomBarChar data={chartData}/>
    </div>
  )
}

export default Last30DaysExpenses
