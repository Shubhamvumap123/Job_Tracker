import React, { createContext, useContext, useEffect } from 'react';
import { useTickets } from '../hooks/useTickets';
import { useSocket } from './SocketContext';

const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
    const ticketData = useTickets();
    const { fetchTickets } = ticketData;
    const socket = useSocket();

    // Centralized real-time updates
    useEffect(() => {
        if (!socket) return;

        const handleTicketEvent = () => {
            console.log('Real-time event received, refreshing tickets...');
            fetchTickets();
        };

        socket.on('ticket_created', handleTicketEvent);
        socket.on('ticket_updated', handleTicketEvent);
        socket.on('ticket_deleted', handleTicketEvent);
        socket.on('dashboard_update', handleTicketEvent);

        return () => {
            socket.off('ticket_created', handleTicketEvent);
            socket.off('ticket_updated', handleTicketEvent);
            socket.off('ticket_deleted', handleTicketEvent);
            socket.off('dashboard_update', handleTicketEvent);
        };
    }, [socket, fetchTickets]);

    return (
        <TicketContext.Provider value={ticketData}>
            {children}
        </TicketContext.Provider>
    );
};

export const useTicketContext = () => {
    const context = useContext(TicketContext);
    if (!context) {
        throw new Error('useTicketContext must be used within a TicketProvider');
    }
    return context;
};
