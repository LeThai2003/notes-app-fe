import {  createContext, useState } from "react"


export const UserContext = createContext();


const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);

  // func to update user
  const updateUser = (userData) => {
    setUser(userData);
  }

  // func to cleare user
  const clearUser = () => {
    setUser(null);
  }

  return(
    <UserContext.Provider
      value={{
        user,
        updateUser,
        clearUser
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider;