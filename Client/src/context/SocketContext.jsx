import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            // Determine socket URL based on environment
            const isLocal = window.location.hostname === 'localhost';
            const socketUrl = isLocal
                ? 'http://localhost:5000'
                : 'https://ticket-support11.onrender.com';

            console.log(`Initializing socket connection to: ${socketUrl}`);

            // Initialize socket connection
            const newSocket = io(socketUrl);
            setSocket(newSocket);

            newSocket.on('connect', () => {
                console.log('Connected to socket server');
                // Join user's private room
                newSocket.emit('join_user_room', user._id);
            });

            return () => newSocket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [user]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
