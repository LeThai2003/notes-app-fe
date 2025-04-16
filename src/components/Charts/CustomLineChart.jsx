import React from 'react'
import {XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart} from "recharts"
import CustomTooltip, { CustomTooltipOverviewExpense } from './CustomTooltip'

const CustomLineChart = ({data}) => {

  console.log(data);

  return (
    <div className='bg-white'>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id='expenseGradient' x1={"0"} y1={"0"} x2={"0"} y2={"1"}>
              <stop offset="5%" stopColor='#875cf5' stopOpacity={0.4}/>
              <stop offset="95%" stopColor='#875cf5' stopOpacity={0}/>
            </linearGradient>
          </defs>

          <CartesianGrid stroke='none'/>
          <XAxis dataKey={"month"} tick={{fontSize: 12, fill: "#555"}} stroke='none'/>
          <YAxis tick={{fontSize: 12, fill: "#555"}} stroke='none'/>
          <Tooltip content={CustomTooltipOverviewExpense}/>

          <Area type="monotone" dataKey="Tiền" fill="url(#expenseGradient)" stroke='#875cf5' strokeWidth={3} dot={{r: 3, fill: "#ab8df8"}}/>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomLineChart