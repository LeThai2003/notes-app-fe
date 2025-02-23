import React, { useState } from 'react'
import TagInput from '../../components/Input/TagInput'
import { MdClose } from 'react-icons/md';
import axiosInstance from '../../utils/axiosInstance';

const AddEditNote = ({type, noteData, onClose, getAllNotes, handleShownToast}) => {

    const [title, setTitle] = useState(noteData?.title || "");
    const [content, setContent] = useState(noteData?.content || "");
    const [tags, setTags] = useState(noteData?.tags || []);
    const [error, setError] = useState(null);

    const addNewNote = async () => {
        try {
            const response = await axiosInstance.post("notes/add", {title, content, tags});

            if(response.data && response.data.note)
            {
                handleShownToast("add", "Thêm ghi chú thành công")
                getAllNotes();
                onClose();
            }
        } catch (error) {
            if(error.response && error.response.data && error.response.data.message)
            {
                setError(error.response.data.message);
            }
            else
            {
                console.log("Lỗi khác: " + error);
            }
        }
    }

    const editNote = async () => {
        const noteId = noteData._id;

        try {
            const response = await axiosInstance.patch(`notes/edit/${noteId}`, {title, content, tags});

            if(response.data && response.data.note)
            {
                handleShownToast("add", "Cập nhật ghi chú thành công")
                getAllNotes();
                onClose();
            }
        } catch (error) {
            if(error.response && error.response.data && error.response.data.message)
            {
                setError(error.response.data.message);
            }
            else
            {
                console.log("Lỗi khác: " + error);
            }
        }
    }

    const handleAddNote = async () => {
        if(!title.trim())
        {
            setError("Tiêu đề không được để tróng.");
            return;
        }

        if(!content.trim())
        {
            setError("Nội dung không được để tróng.");
            return;
        }

        setError("");

        // -------------------
        if(type == "add")
        {
            addNewNote();
        }
        else
        {
            editNote();
        }
    }

    return (
        <div className="relative">

            <button onClick={onClose} className='absolute top-0 right-0 cursor-pointer w-10 h-10 rounded-full hover:bg-slate-50 flex items-center justify-center'>
                <MdClose className='text-xl text-slate-400'/>
            </button>

            <div className='flex flex-col gap-2'>
                <label className='input-label'>Tiêu Đề</label>
                <input 
                    value={title}
                    type="text" 
                    className='text-2xl text-slate-900 outline-none p-2'
                    placeholder='Nhập tiêu đề ...'
                    onChange={({target}) => {setTitle(target.value)}}
                />
            </div>

            <div className='flex flex-col gap-2 mt-4'>
                <label className='input-label'>Nội Dung</label>
                <textarea 
                    value={content}
                    className='text-sm text-slate-950 outline-none rounded bg-slate-50 p-2'
                    placeholder='Nhập nội dung ...'
                    rows={10}
                    onChange={({target}) => {setContent(target.value)}}
                />
            </div>

            <div className='mt-3'>
                <label className='label-input'>Tags</label>
                <TagInput tags={tags} setTags={setTags}/>
            </div>

            {error && <p className='text-red-500 text-xs pt-4'>{error}</p>}

            <button 
                className='btn-primary font-medium mt-5 p-3'
                onClick={handleAddNote}
            >{type == "add" ? "Thêm Mới" : "Cập Nhật"}</button>

        </div>
    )
}

export default AddEditNote
