import React, { useRef, useState } from 'react';
import {LuUser, LuUpload, LuTrash} from "react-icons/lu";

const ProfilePictureSelector = ({image, setImage}) => {

  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(file)
    {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  }

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  }

  const onChooseFile = () => {
    inputRef.current.click();
  }

  return (
    <div className='flex justify-center mb-6 '>
      <input type="file" accept='image/*' ref={inputRef} onChange={handleImageChange} className='hidden'/>

      {!image ? (
        <div className='size-20 flex items-center justify-center bg-purple-100 rounded-full relative'>
          <LuUser className='text-4xl text-primary'/>
          <button type='button' className='size-8 flex items-center justify-center bg-primary text-white rounded-full cursor-pointer absolute -right-1 -bottom-1' onClick={onChooseFile}>
            <LuUpload/>
          </button>
        </div>
      ) : (
        <div className='relative'>
          <img src={previewUrl} alt='profile image' className='object-center rounded-full size-20'/>
          <button className='size-8 flex items-center justify-center bg-red-500 text-white rounded-full cursor-pointer absolute -right-1 -bottom-1' type='button' onClick={handleRemoveImage}>
            <LuTrash/>
          </button>
        </div>
      )}
    </div>
  )
}

export default ProfilePictureSelector
