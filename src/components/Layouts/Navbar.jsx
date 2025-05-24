import React, { useState } from 'react'
import {HiOutlineMenu, HiOutlineX} from "react-icons/hi";
import SideMenu from './SideMenu';

const Navbar = ({activeMenu}) => {

  const [openSideMenu, setOpenSideMenu] = useState(false);

  

  return (
    <div className='flex gap-5 bg-white border border-b border-gray-100 py-4 px-8 sticky top-0 z-20 backdrop-blur-[2px]'>
      <button className='block lg:hidden text-black' onClick={() => setOpenSideMenu(!openSideMenu)}>
        {openSideMenu ? (
          <HiOutlineX id='x_menu' className='text-2xl'/>
        ) : (
          <HiOutlineMenu id='o_menu' className='text-2xl'/>
        )}
      </button>
      
      <h2 className='text-lg font-medium'>ExpNotes</h2>
        
      {openSideMenu && (
        <div className='fixed top-[61px] -ml-8 bg-white'>
          <SideMenu activeMenu={activeMenu}/>
        </div>
      )}

    </div>
  )
}

export default Navbar
