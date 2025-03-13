import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Navigate, useNavigate } from 'react-router-dom'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNote from './AddEditNote'
import Modal from "react-modal"
import { getInfoUser } from '../../services/user'
import axiosInstance from '../../utils/axiosInstance'
import Toast from '../../components/ToastMessage/Toast'
import EmptyCart from '../../components/Cards/EmptyCart'
import addNote from "../../assets/add_note.png"
import noNote from "../../assets/no_note.png" 

const Home = () => {

    const navigate = useNavigate();

    const [showToastMessage, setShowToastMessage] = useState({
        isShown: false,
        type: "add",
        message: ""
    })

    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: "add",
        data: null
    })

    const [isSearch, setIsSearch] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [allNotes, setAllNotes] = useState([]);


    //-------------------- info user------------------
    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get("users/get-info");
            if(response.data && response.data.userExist)
            {
                setUserInfo(response.data.userExist);
            }
        } catch (error) {
            if(error.response.status === 401)
            {
                localStorage.clear();
                navigate("/login");
            }
        }
    }

    //-------------------- note------------------
    const getAllNotes = async () => {
        try {
            const response = await axiosInstance.get("notes/get-all");
            if(response.data && response.data.notes)
            {
                setAllNotes(response.data.notes);
            }
        } catch (error) {
            console.log(error);   
        }
    }

    const handleEdit = async (noteDetailt) => {
        setOpenAddEditModal({isShown: true, type: "edit", data: noteDetailt});
    }


    const deleteNote = async (id) => {
        try {
            const response = await axiosInstance.delete(`notes/delete/${id}`);

            if(response.data && !response.data.error)
            {
                handleShownToast("delete", response.data.message);
                getAllNotes();
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

    const onSearchNote = async (query) => {
        try {
            const response = await axiosInstance.get("notes/searching", {
                params: {query}
            });
    
            if(response.data && response.data.notes)
            {
                setIsSearch(true);
                setAllNotes(response.data.notes);
            }
        } catch (error) {
            console.log(error);
        }

    }

    const handleClearSearch = () => {
        setIsSearch(false);
        getAllNotes();
    }

    const updatePinned = async (id) => {

        try {
            const response = await axiosInstance.patch(`notes/update-pinned/${id}`);

            if(response.data && !response.data.error)
            {
                handleShownToast("add", response.data.message)
                getAllNotes();
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

    //-------------------- toast------------------
    const handleShownToast = (type, message) => {
        setShowToastMessage({isShown: true, message: message, type: type});
    }

    const handleCloseToast = () => {
        const type = showToastMessage.type;
        setShowToastMessage({isShown: false, message: "", type: type});  // để khỏi đổi mày khi tắt
    }
    
    useEffect(() => {
        getUserInfo();
        getAllNotes();
    }, [])

    return (
        <>
            <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch}/>

            <div className='container mx-auto px-8'>
                {   allNotes.length > 0 ?
                    <div className='grid lg:grid-cols-3 md:grid-cols-2 xs-grid-cols-1 gap-4 mt-8 '>
                        {allNotes.map((item, index) => (
                            <NoteCard 
                                key={item._id}
                                title={item.title}
                                date={item.createdAt}
                                dateUpdate={item.updatedAt}
                                content={item.content}
                                tags={item.tags}
                                isPinded={item.isPinned}
                                onEdit={() => handleEdit(item)}
                                onDelete={() => deleteNote(item._id)}
                                onPinNote={() => updatePinned(item._id)}
                            />
                        ))}
                    </div> : <EmptyCart image={isSearch ? noNote : addNote} message={isSearch ? "Không tìm thấy dữ liệu" : "Nhấn vào nút 'Thêm' ở gốc dưới cùng bên phải để tạo những ghi chú, ý tưởng ... đầu tiên của bạn"}/>
                }
            </div>

            <button className='w-16 h-16 bg-primary hover:bg-blue-600 cursor-pointer rounded-2xl flex items-center justify-center absolute right-10 bottom-10' onClick={() => {setOpenAddEditModal({
                isShown: true,
                type: "add",
                data: null
            })}}>
                <MdAdd className='text-[32px] text-white'/>
            </button>

            <Modal
                isOpen={openAddEditModal.isShown}
                onRequestclose={() => {}}
                style={
                    {
                        overlay: {
                            backgroundColor: "rgba(0, 0, 0, 0.2)",
                        },
                    }
                }
                contentLable=""
                className="w-[40%] max-h-3/4 bg-white mt-14 mx-auto p-4 rounded-md overflow-auto "
            >
                <AddEditNote
                    type={openAddEditModal.type}
                    noteData={openAddEditModal.data}
                    onClose={() => {setOpenAddEditModal({isShown: false, type: "add", data: null})}}
                    getAllNotes={getAllNotes}
                    handleShownToast={handleShownToast}
                />
            </Modal>
            
            <Toast
                isShown={showToastMessage.isShown}
                message={showToastMessage.message}
                type={showToastMessage.type}
                onClose={handleCloseToast}
            />
        </>
    )
}

export default Home
