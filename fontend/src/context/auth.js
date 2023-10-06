import { useState, useEffect, useContext, createContext } from 'react';

const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: ""
    });
    useEffect(() => {
        const data = localStorage.getItem('auth')
        if (data) {
            const passeData = JSON.parse(data);
            setAuth({
                ...auth,
                user: passeData.user,
                token: passeData.token
            })
        }
        // eslint-disable-next-line
    }, [])
    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}


// Custome hooks
const useAuth = () => useContext(AuthContext)

export { useAuth, AuthProvider }