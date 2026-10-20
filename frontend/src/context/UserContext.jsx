
import { createContext, useEffect, useState } from 'react';
export const UserContext = createContext()
import { getAccessToken } from '../utils/auth';
const UserProvider = ({ children }) => {
    const [userName, setUserName] = useState(null)
    const token = getAccessToken()
    useEffect(() => {
        if (token) {
            const fetchUserName = async () => {
                const response = await fetch(`${import.meta.env.VITE_DJANGO_BASE_URL}/api/profile/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (!response.ok) return
                const userData = await response.json()
                setUserName(userData.username)
            }
            fetchUserName()
        }
        
    },[])



    return (
        <UserContext.Provider value={{ userName, setUserName }}>{children}</UserContext.Provider>
    );
};

export default UserProvider;