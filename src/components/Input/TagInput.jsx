import React, { useState } from 'react'
import { MdAdd, MdClose } from 'react-icons/md'

const TagInput = ({tags, setTags}) => {

    const [inputValue, setInputValue] = useState("");

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    const addNewTag = () => {
        if(inputValue.trim() !== "")
        {
            setTags([...tags, inputValue.trim()]);
            setInputValue("");
        }
    }

    const handleKeyDown = (e) => {
        if(e.key == "Enter")
        {
            addNewTag();
        }
    }

    const handleRemoveTag = (tagRemove) => {
        setTags(tags.filter(tag => tag !== tagRemove));
    }

    return (
        <>
            <div>
                {tags?.length > 0 && (
                    <div className='flex gap-2 items-center flex-wrap'>
                        {
                            tags.map((tag, index) => (
                                <span className='flex items-center gap-1 bg-slate-100 text-sm text-slate-900 rounded px-3 py-1 ' key={index}>
                                    #{tag}
        
                                    <button className='w-4 h-4 rounded-full flex items-center justify-center hover:bg-white cursor-pointer' onClick={() => {handleRemoveTag(tag)}}>
                                        <MdClose/>
                                    </button>
                                </span>
                            ))
                        }
                </div>)}
            </div>

            <div className='flex items-center gap-4 mt-2'>
                <input
                    value={inputValue}
                    type='text'
                    className='outline-none border border-gray-200 rounded px-3 py-2 text-sm'
                    placeholder='Thêm thẻ ...'
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />

                <button className='w-8 h-8 rounded flex items-center justify-center border border-blue-700 cursor-pointer hover:bg-blue-700'
                    onClick={addNewTag}
                >
                    <MdAdd className='text-2xl text-blue-700 hover:text-white cursor-pointer'/>
                </button>
            </div>
        </>
    )
}

export default TagInput