import { useState, useEffect, useCallback } from 'react';
import { ticketService } from '../API/ticketService';
import { useDebounce } from './useDebounce';

export const useTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({ status: '', priority: '', search: '' });

    // delay search to avoid too many api calls
    const debouncedSearch = useDebounce(filters.search, 500);

    // fetch tickets whenever filters or search changes
    const fetchTickets = useCallback(async () => {
        setLoading(true);
        try {
            const params = { ...filters, search: debouncedSearch };
            const data = await ticketService.getAll(params);
            setTickets(data.data || data);
            setError(null);
        } catch (err) {
            setError('Failed to load tickets');
        } finally {
            setLoading(false);
        }
    }, [filters.status, filters.priority, debouncedSearch]);

    // initial extraction
    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);

    // optimistic UI update for deletion
    const removeTicket = async (id) => {
        const originalTickets = [...tickets];
        setTickets(tickets.filter(t => t._id !== id));

        try {
            await ticketService.delete(id);
        } catch (err) {
            // revert if api fails
            setTickets(originalTickets);
            setError("Could not delete ticket");
        }
    };

    // handle ticket creation
    const createTicket = async (ticketData) => {
        try {
            await ticketService.create(ticketData);
            fetchTickets(); // Refresh list to respect current filters/sort
            return { success: true };
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.response?.data?.error || "Could not create ticket";
            return { success: false, error: errorMessage };
        }
    };

    // handle ticket updates and refresh list
    const updateTicket = async (id, updatedData) => {
        try {
            await ticketService.update(id, updatedData);
            fetchTickets(); // Refetch to ensure sorted order/server logic if any
            return { success: true };
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.response?.data?.error || "Could not update ticket";
            return { success: false, error: errorMessage };
        }
    };

    // helper to update filter state
    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return { tickets, loading, error, filters, handleFilterChange, removeTicket, updateTicket, createTicket, fetchTickets };
};