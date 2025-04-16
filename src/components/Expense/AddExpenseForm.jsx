import React, { useState } from 'react'
import Input from '../Input/Input';
import EmojiPickerPopup from '../EmojiPickerPopup';

const AddExpenseForm = ({onAddExpense}) => {

  const [expense, setExpense] = useState({
      category: "",
      amount: "",
      date: "",
      icon: "",
    });
  
    const handleChange = (key, value) => {
      setExpense({
        ...expense,
        [key]: value
      })
    } 

  return (
    <div>
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={expense.category}
        onChange={(e) => handleChange("category", e.target.value)}
        lable="Khoản chi"
        placeholder="Thuê nhà, mua sắm,..."
        type="text"
      />

      <Input
        value={expense.amount}
        onChange={(e) => handleChange("amount", e.target.value)}
        lable="Số tiền"
        placeholder=""
        type="number"
      />

      <Input
        value={expense.date}
        onChange={(e) => handleChange("date", e.target.value)}
        lable="Ngày chi"
        placeholder=""
        type="date"
      />

      <div className='flex justify-end mt-6'> 
        <button className='add-btn add-btn-fill' type='button' onClick={() => onAddExpense(expense)}>
          Thêm
        </button>
      </div>

    </div>
  )
}

export default AddExpenseForm