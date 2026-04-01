import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            // Use relative path for proxy/gateway routing
            const socketUrl = '/';

            console.log(`Initializing socket connection to: ${socketUrl}`);

            // Initialize socket connection
            const newSocket = io(socketUrl);
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSocket(newSocket);

            newSocket.on('connect', () => {
                console.log('✅ Connected to Notification Service (Socket.io)');
                // Join user's private room
                newSocket.emit('join_user_room', user._id);
            });

            newSocket.on('connect_error', (err) => {
                console.error('❌ Socket Connection Error:', err.message);
            });

            newSocket.on('disconnect', (reason) => {
                console.warn('⚠️ Socket Disconnected:', reason);
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
