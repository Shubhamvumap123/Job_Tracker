import React, { createContext, useContext } from 'react';
import { useTickets } from '../hooks/useTickets';

const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
    const ticketData = useTickets();

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
