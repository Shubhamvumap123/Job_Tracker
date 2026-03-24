import React, { useState } from 'react';
import { useJobContext } from './context/JobContext';
import FilterBar from './components/Filters/FilterBar';
import JobList from './components/JobTable/JobList';
import EditJob from './components/EditJob/EditJob';
import { Loader2 } from 'lucide-react';

const JobDashboard = () => {
    const { jobs, loading, error, removeJob, updateJob, filters, handleFilterChange } = useJobContext();
    const [viewMode, setViewMode] = useState('list');
    const [editingJob, setEditingJob] = useState(null);

    const handleEdit = (job) => setEditingJob(job);
    const handleDelete = (id) => removeJob(id);
    const handleUpdate = async (id, data) => {
        const res = await updateJob(id, data);
        if (res.success) setEditingJob(null);
    };

    if (loading && jobs.length === 0) {
        return (
            <div className="flex items-center justify-center p-12">
                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                <span className="ml-3 text-gray-500 font-medium">Loading jobs...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-100 m-4">
                <p className="font-medium">Error loading jobs</p>
                <p className="text-sm mt-1">{error}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full p-4">
            <FilterBar 
                setViewMode={setViewMode} 
                viewMode={viewMode} 
                filters={filters} 
                onFilterChange={handleFilterChange} 
            />
            
            <div className="flex-1 mt-2">
                <JobList 
                    viewMode={viewMode} 
                    jobs={jobs} 
                    onEdit={handleEdit} 
                    onDelete={handleDelete} 
                />
            </div>

            {editingJob && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="relative w-full max-w-2xl bg-white shadow-2xl rounded-xl mx-4 overflow-hidden animate-in zoom-in-95 duration-200">
                        <EditJob 
                            job={editingJob} 
                            onClose={() => setEditingJob(null)} 
                            onUpdate={handleUpdate} 
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobDashboard;
