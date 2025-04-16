import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'

const ExpenseTransactions = ({transactions, onSeeMore}) => {
  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Chi tiêu</h5>

        <button className='card-btn' onClick={onSeeMore}>
          Tất cả <LuArrowRight className='text-base'/>
        </button>
      </div>

      <div className='mt-6'>
        {transactions?.slice(0, 5)?.map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.category}
            icon={item.icon}
            date={moment(item.date).format("DD-MM-yyyy")}
            amount={item.amount}
            type="expense"
            hideDeleteBtn
          />
        ))}
      </div>

    </div>
  )
}

export default ExpenseTransactions
