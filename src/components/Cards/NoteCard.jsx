import React, { useState } from 'react';
import moment from "moment"
import Modal from "react-modal"
import {MdOutlinePushPin, MdCreate, MdDelete} from "react-icons/md";
import ConfirmDelete from '../ConfirmLog/ConfirmDelete';

const NoteCard = ({key, title, date, dateUpdate, content, tags, isPinded, onEdit, onDelete, onPinNote }) => {

    const [openConfirmDelete, setOpenConfirmDelete] = useState({isShown: false})

    const handleConfirmDelete = () => {
        setOpenConfirmDelete({isShown: true})
    }

    const onCloseDelete = () => {
        setOpenConfirmDelete({isShown: false})
    }

    return (
        <div className='border rounded border-gray-300 hover:shadow-xl bg-white p-4 transition-all ease-in-out'>
            <div className='flex items-center justify-between'>
                <div>
                    <h6 className='text-sm font-medium'>{title}</h6>
                    <span className='text-xs text-slate-500'>{date == dateUpdate ? moment(date).format('DD/MM/YYYY h:mm:ss a') : moment(dateUpdate).format('DD/MM/YYYY h:mm:ss a')}</span>
                </div>

                <MdOutlinePushPin className={'icon-btn hover:text-primary ' + (isPinded ? "text-primary" : "text-slate-300")} onClick={onPinNote}/>
            </div>

            <p className='text-xs text-slate-600 mt-2 line-clamp-1'>{content}</p>

            <div className='flex items-center justify-between mt-2'>
                <div className='flex gap-1'>    
                    {tags.length > 0 && <>
                    
                        {tags.map((item, index) => (
                            <span key={index} className='bg-slate-100 text-slate-900 text-xs font-medium px-3 py-1 rounded gap-1'>
                                #{item}{" "}
                            </span>
                        ))}
                    </>}
                </div>
                
                <div className='flex items-center gap-2'>
                    <MdCreate className='icon-btn hover:text-green-500' onClick={onEdit}/>

                    <MdDelete className='icon-btn hover:text-red-500' onClick={handleConfirmDelete}/>
                </div>
            </div>

            <Modal
                isOpen={openConfirmDelete.isShown}
                onRequestclose={() => {}}
                style={
                    {
                        overlay: {
                            backgroundColor: "rgba(0, 0, 0, 0.4)",
                        },
                    }
                }
                contentLable=""
                className="w-[30%] max-h-3/4 bg-white mt-28 mx-auto p-4 rounded-md overflow-auto "
            >
                <ConfirmDelete id={key} onDelete={onDelete} title={title} onClose={onCloseDelete}/>
            </Modal>

        </div>
    )
}

export default NoteCard
