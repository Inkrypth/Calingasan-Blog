import { createContext, useState } from 'react';
import { getToken } from '../hooks/useAuthToken';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setTokenState] = useState(getToken());

    const login = (newToken) => {
        localStorage.setItem('token', newToken);
        setTokenState(newToken);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setTokenState(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};