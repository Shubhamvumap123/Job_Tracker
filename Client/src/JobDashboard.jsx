import React, { useState, useCallback } from 'react';
import EditJob from './components/EditJob/EditJob';
import { useJobContext } from './context/JobContext';
import FilterBar from './components/Filters/FilterBar';
import JobList from './components/JobTable/JobList';
import { Loader2, AlertCircle } from 'lucide-react';

const JobDashboard = () => {
    // extract state and handlers from context
    const { jobs, loading, error, filters, handleFilterChange, removeJob, updateJob } = useJobContext();
    const [editingJob, setEditingJob] = useState(null);
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

    // memoized handlers for JobList
    const handleEdit = useCallback((job) => {
        setEditingJob(job);
    }, []);

    const handleDelete = useCallback((id) => {
        removeJob(id);
    }, [removeJob]);

    // Error UI Component
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-red-500">
                <AlertCircle size={48} className="mb-4" />
                <h3 className="text-xl font-bold">Something went wrong</h3>
                <p>{error}</p>
            </div>
        );
    }

    const handleUpdateJob = async (id, data) => {
        const result = await updateJob(id, data);
        if (result.success) {
            setEditingJob(null);
        } else {
            alert(result.error);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-12rem)] min-h-[500px]">
            {/* Header / Filter Section (Fixed) */}
            <div className="p-4 border-b border-gray-200 bg-white z-10">
                <FilterBar
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                />
            </div>

            {/* Main Content Area (Scrollable) */}
            <div className="flex-1 relative bg-gray-50 overflow-hidden">
                {loading && jobs.length === 0 ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
                        <Loader2 className="animate-spin text-indigo-600" size={40} />
                    </div>
                ) : (
                    <div className="h-full">
                        {/* JobList will now handle the scrolling internally */}
                        <JobList
                            viewMode={viewMode}
                            jobs={jobs}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    </div>
                )}
            </div>

            {/* Edit Modal Overlay */}
            {editingJob && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <EditJob
                            job={editingJob}
                            onClose={() => setEditingJob(null)}
                            onUpdate={handleUpdateJob}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobDashboard;
