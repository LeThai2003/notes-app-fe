import React from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6";
import {IoMdClose} from "react-icons/io"

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {

    const handleKeyDown = (e) => {
        if(e.key == "Enter")
        {
            handleSearch();
        }
    }

    return (
        <div className='w-80 flex items-center justify-center px-4 bg-slate-100 rounded-md'>
            <input
                value={value}
                type='text'
                placeholder='Tìm kiếm ghi chú'
                className='w-full text-sm bg-transparent py-[11px] outline-none rounded'
                onChange={onChange}
                onKeyDown={handleKeyDown}
            />

            {value && <IoMdClose className='cursor-pointer text-slate-500 mr-2 hover:text-black text-xl' onClick={onClearSearch}/>}

            <FaMagnifyingGlass className='cursor-pointer text-slate-400 hover:text-black' onClick={handleSearch}/>
        </div>
    )
}

export default SearchBar
