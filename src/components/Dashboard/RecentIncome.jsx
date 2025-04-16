import moment from 'moment'
import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'

const RecentIncome = ({transactions, onSeeMore}) => {
  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Khoản thu gần đây</h5>
        
        <button className='card-btn' onClick={onSeeMore}>
          Tất cả <LuArrowRight className='text-base'/>
        </button>
      </div>

      <div className='mt-6'>
        {transactions?.slice(0, 5)?.map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.source}
            icon={item.icon}
            date={moment(item.date).format("DD-MM-yyyy")}
            amount={item.amount}
            type="income"
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  )
}

export default RecentIncome
