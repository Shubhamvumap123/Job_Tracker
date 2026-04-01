import React, { createContext, useContext, useEffect } from 'react';
import { useJobs } from '../hooks/useJobs';
import { useSocket } from './SocketContext';

const JobContext = createContext();

export const JobProvider = ({ children }) => {
    const jobData = useJobs();
    const { fetchJobs } = jobData;
    const socket = useSocket();

    // Centralized real-time updates
    useEffect(() => {
        if (!socket) return;

        const handleJobEvent = () => {
            console.log('Real-time event received, refreshing jobs...');
            fetchJobs();
        };

        socket.on('ticket_created', handleJobEvent);
        socket.on('ticket_updated', handleJobEvent);
        socket.on('ticket_deleted', handleJobEvent);
        socket.on('dashboard_update', handleJobEvent);

        return () => {
            socket.off('ticket_created', handleJobEvent);
            socket.off('ticket_updated', handleJobEvent);
            socket.off('ticket_deleted', handleJobEvent);
            socket.off('dashboard_update', handleJobEvent);
        };
    }, [socket, fetchJobs]);

    return (
        <JobContext.Provider value={jobData}>
            {children}
        </JobContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useJobContext = () => {
    const context = useContext(JobContext);
    if (!context) {
        throw new Error('useJobContext must be used within a JobProvider');
    }
    return context;
};
