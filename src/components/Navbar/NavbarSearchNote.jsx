import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

const NavbarSearchNote = ({onSearchNote, handleClearSearch}) => {

  const [searchQuery, setSearchQuery] = useState("");
    
  const navigate = useNavigate();
  const location = useLocation();

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

  return (
    <SearchBar 
      value={searchQuery} 
      onChange={(e) => {setSearchQuery(e.target.value)}}
      handleSearch={handleSearch}
      onClearSearch={onClearSearch}
    />
  )
}

export default NavbarSearchNote