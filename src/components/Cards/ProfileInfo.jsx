import React from 'react'
import { getNameInitials } from '../../utils/helper'

const ProfileInfo = ({userInfo, onLogout}) => {
    return (
        <div className='flex items-center justify-center gap-3'>
            <div className='w-12 h-12 bg-slate-100 text-slate-950 rounded-full flex items-center justify-center font-medium'>
                {getNameInitials(userInfo?.fullName)}
            </div>
            <div>
                <p className='text-sm font-medium'>{userInfo?.fullName}</p>
                <div>
                    <button className='text-sm text-slate-700 underline cursor-pointer' onClick={onLogout}>Đăng xuất</button>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo
