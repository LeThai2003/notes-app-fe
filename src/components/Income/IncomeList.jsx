import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'

const IncomeList = ({transactions, onDelete, onDownload}) => {
  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Các khoản thu</h5>

        <button className='card-btn' onClick={onDownload}>
          Tải về <LuDownload className='text-base'/>
        </button>
      </div>

      <div className='mt-3 grid grid-cols-1 md:grid-cols-2'>
        {transactions?.map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.source}
            icon={item.icon}
            date={moment(item.date).format("DD-MM-yyyy")}
            amount={item.amount}
            type="income"
            hideDeleteBtn={false}
            onDelete={() => onDelete(item._id)}
          />
        ))}
      </div>

    </div>
  )
}

export default IncomeList