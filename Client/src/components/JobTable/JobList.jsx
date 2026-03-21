import React from 'react';
import { JobRow, JobCard } from './JobItems';
import { FileQuestion } from 'lucide-react';

const JobList = React.memo(({ viewMode, jobs, onEdit, onDelete }) => {

    return (
        <div className="flex flex-col h-full w-full">

            <div className="flex-1 overflow-y-auto min-h-0 pr-2">

                {/* Render list or grid view based on preference */}
                {jobs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500 bg-white rounded-lg border border-dashed border-gray-300">
                        <FileQuestion className="w-12 h-12 mb-2 text-gray-300" />
                        <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
                        <p className="text-sm">Create a new job application to get started.</p>
                    </div>
                ) : viewMode === 'list' ? (
                    <div className="border border-gray-200 rounded-lg shadow-sm bg-white">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50 sticky top-0 z-10 shadow-sm">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {jobs.map(job => (
                                    <JobRow
                                        key={job._id}
                                        job={job}
                                        onEdit={onEdit}
                                        onDelete={onDelete}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-4">
                        {jobs.map(job => (
                            <JobCard
                                key={job._id}
                                job={job}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
});

export default JobList;