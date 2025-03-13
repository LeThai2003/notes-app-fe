import React, { useState } from 'react'
import ProfileInfo from '../Cards/ProfileInfo'
import { useLocation, useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

const Navbar = ({userInfo, onSearchNote, handleClearSearch}) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const navigate = useNavigate();
  const location = useLocation();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  }

  const handleSearch = () => {
    if(searchQuery)
    {
      onSearchNote(searchQuery);
    }
  }

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  }

  const hiddenInfo = location.pathname === "/login" || location.pathname === "/signup" || location.pathname ==="/forgot-password" || location.pathname.includes("/otp-password") || location.pathname ==="/reset-password";

  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
        <h2 className="font-medium text-xl text-black py-2">Notes</h2>

        {!hiddenInfo && <>
          <SearchBar 
            value={searchQuery} 
            onChange={(e) => {setSearchQuery(e.target.value)}}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
          />

          <ProfileInfo userInfo={userInfo} onLogout={onLogout}/>
        </>
        }
    </div>
  )
}

export default Navbar
