import React, { use, useContext } from 'react'
import { UserContext } from '../../context/userContext'
import {useNavigate} from "react-router-dom"
import { SIDE_MENU_DATA } from '../../utils/data';
import CharAvatar from '../Cards/CharAvatar';

const SideMenu = ({activeMenu}) => {

  const {user, clearUser} = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
    return;
  }

  const handleClick = (route) => {
    if(route == "/logout")
    {
      handleLogout();
      return;
    }

    navigate(route);
  }

  return (
    <div id='sideMenu' style={{height: "calc(100vh - 62px)"}} className='w-64 bg-white border-r border-gray-100 p-5 sticky top-[61px] z-20'>
      <div className='flex flex-col items-center justify-center gap-3 mt-3 mb-7'>
        {user?.profileImageUrl ? 
          <img src={user?.profileImageUrl || ""} alt="profile image" className='size-20 bg-slate-400 rounded-full' /> 
          : 
          <CharAvatar fullname={user?.fullName} width="w-20" height="h-20" style="text-xl"/>
        }
        
        <h5 className='font-medium text-slate-950 leading-6'>{user?.fullName || ""}</h5>
      </div>

      {SIDE_MENU_DATA.map((item, index) => (
        <button 
          key={`menu_${index}`}
          id={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] ${activeMenu == item.label ? "text-white bg-primary" : ""} py-3 px-6 rounded-lg mb-3`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className=''/>
          {item.label}
        </button>
      ))}
    </div>
  )
}

export default SideMenu
