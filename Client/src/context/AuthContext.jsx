import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
// const isLocal = window.location.hostname === 'localhost';
// const API_BASE_URL = isLocal
//     ? 'http://localhost:5000'
//     : 'https://ticket-support11.onrender.com';
// Use relative paths for proxy/gateway routing
const API_URL = '/api/auth';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if user is logged in on load
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setUser(JSON.parse(storedUser));
        }

        setLoading(false);
    }, []);

    // Register user
    const register = async (userData) => {
        try {
            const response = await axios.post(`${API_URL}/`, userData);
            if (response.data) {
                localStorage.setItem('user', JSON.stringify(response.data));
                setUser(response.data);
            }
            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || error.response?.data?.error || 'Registration failed';
            return { success: false, message };
        }
    };

    // Login user
    const login = async (userData) => {
        try {
            const response = await axios.post(`${API_URL}/login`, userData);
            if (response.data) {
                localStorage.setItem('user', JSON.stringify(response.data));
                setUser(response.data);
            }
            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || error.response?.data?.error || 'Login failed';
            return { success: false, message };
        }
    };

    // Logout user
    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, register, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
