import React, { useState } from 'react'
import Input from '../Input/Input';
import EmojiPickerPopup from '../EmojiPickerPopup';

const AddInComeForm = ({onAddIncome}) => {

  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => {
    setIncome({
      ...income,
      [key]: value
    })
  } 

  return (
    <div>
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={income.source}
        onChange={(e) => handleChange("source", e.target.value)}
        lable="Nguồn thu"
        placeholder="Lương, đầu từ,..."
        type="text"
      />

      <Input
        value={income.amount}
        onChange={(e) => handleChange("amount", e.target.value)}
        lable="Số tiền"
        placeholder=""
        type="number"
      />

      <Input
        value={income.date}
        onChange={(e) => handleChange("date", e.target.value)}
        lable="Ngày thêm"
        placeholder=""
        type="date"
      />

      <div className='flex justify-end mt-6'> 
        <button className='add-btn add-btn-fill' type='button' onClick={() => onAddIncome(income)}>
          Add Income
        </button>
      </div>

    </div>
  )
}

export default AddInComeForm
