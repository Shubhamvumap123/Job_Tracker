import { useState, useEffect, useCallback, useMemo } from 'react';
import { jobService } from '../API/jobService';
import { useDebounce } from './useDebounce';

export const useJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({ status: '', search: '' });

    // delay search to avoid too many api calls
    const debouncedSearch = useDebounce(filters.search, 500);

    // fetch jobs whenever filters or search changes
    const fetchJobs = useCallback(async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.token) {
            // Do not fetch jobs if user is not authenticated
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const params = { status: filters.status, search: debouncedSearch };
            const data = await jobService.getAll(params);
            // The API returns { success: true, tickets: [...] } for legacy reasons, mapping to jobs
            // In Server we kept tickets: jobs so frontend doesn't break.
            // We should use data.tickets or data.jobs depending on what server sends.
            // Server was updated to send { success: true, tickets: jobs }
            const jobsData = data.tickets || data.data || data;
            setJobs(jobsData);
            setError(null);
        } catch {
            setError('Failed to load jobs');
        } finally {
            setLoading(false);
        }
    }, [filters.status, debouncedSearch]);

    // initial extraction
    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);

    // optimistic UI update for deletion
    const removeJob = useCallback(async (id) => {
        const originalJobs = [...jobs];
        setJobs(jobs.filter(t => t._id !== id));

        try {
            await jobService.delete(id);
        } catch {
            // revert if api fails
            setJobs(originalJobs);
            setError("Could not delete job");
        }
    }, [jobs]);

    // handle job creation
    const createJob = useCallback(async (jobData) => {
        try {
            await jobService.create(jobData);
            fetchJobs(); // Refresh list to respect current filters/sort
            return { success: true };
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.response?.data?.error || "Could not create job";
            return { success: false, error: errorMessage };
        }
    }, [fetchJobs]);

    // handle job updates and refresh list
    const updateJob = useCallback(async (id, updatedData) => {
        try {
            await jobService.update(id, updatedData);
            fetchJobs(); // Refetch to ensure sorted order/server logic if any
            return { success: true };
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.response?.data?.error || "Could not update job";
            return { success: false, error: errorMessage };
        }
    }, [fetchJobs]);

    // helper to update filter state
    const handleFilterChange = useCallback((key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    }, []);

    // ⚡ Bolt: Memoize the context value to prevent full-app re-renders.
    // When App.jsx re-renders (e.g., toggling the CreateJob modal), JobProvider also re-renders.
    // Without useMemo, this hook returns a new object reference every time, forcing all
    // consumers (like the entire dashboard) to re-render unnecessarily.
    const contextValue = useMemo(() => ({
        jobs,
        loading,
        error,
        filters,
        handleFilterChange,
        removeJob,
        updateJob,
        createJob,
        fetchJobs
    }), [jobs, loading, error, filters, handleFilterChange, removeJob, updateJob, createJob, fetchJobs]);

    return contextValue;
};