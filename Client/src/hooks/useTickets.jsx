import { useState, useEffect, useCallback } from 'react';
import { ticketService } from '../API/ticketService';
import { useDebounce } from './useDebounce';

export const useTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({ status: '', priority: '', search: '' });
    const debouncedSearch = useDebounce(filters.search, 500);

    const fetchTickets = useCallback(async () => {
        setLoading(true);
        try {
            const params = { ...filters, search: debouncedSearch };
            const data = await ticketService.getAll(params);
            setTickets(data);
            setError(null);
        } catch (err) {
            setError('Failed to load tickets');
        } finally {
            setLoading(false);
        }
    }, [filters.status, filters.priority, debouncedSearch]);

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);

    const removeTicket = async (id) => {
        // Optimistic UI update: Remove from UI immediately before API finishes
        const originalTickets = [...tickets];
        setTickets(tickets.filter(t => t._id !== id));

        try {
            await ticketService.delete(id);
        } catch (err) {
            // Revert if API fails
            setTickets(originalTickets);
            setError("Could not delete ticket");
        }
    };

    const updateTicket = async (id, updatedData) => {
        try {
            await ticketService.update(id, updatedData);
            // Refresh list to ensure sync or update local state manually
            fetchTickets();
            return { success: true };
        } catch (err) {
            const errorMessage = err.response?.data?.error || "Could not update ticket";
            // We return the error so the component can display it
            return { success: false, error: errorMessage };
        }
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return { tickets, loading, error, filters, handleFilterChange, removeTicket, updateTicket };
};