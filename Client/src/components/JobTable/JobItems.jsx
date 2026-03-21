import React from 'react';
import { Pencil, Trash2, MapPin, DollarSign } from 'lucide-react';
import { STATUS_STYLES } from './constants';

// 1. The List View Component (Row)
export const JobRow = React.memo(({ job, onEdit, onDelete }) => {
    return (
        <tr className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 group">
            <td className="px-6 py-4 text-sm font-medium text-gray-900">{job.company}</td>
            <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" title={job.position}>
                {job.position}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${STATUS_STYLES[job.status] || 'bg-gray-100 text-gray-700'}`}>
                    {job.status}
                </span>
            </td>
            <td className="px-6 py-4 text-sm text-gray-500 truncate" title={job.location}>
                {job.location || 'N/A'}
            </td>
            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                {new Date(job.createdAt).toLocaleDateString()}
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                    <button aria-label={`Edit job ${job.company}`} onClick={() => onEdit(job)} className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg transition-colors">
                        <Pencil size={16} />
                    </button>
                    <button aria-label={`Delete job ${job.company}`} onClick={() => onDelete(job._id)} className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-lg transition-colors">
                        <Trash2 size={16} />
                    </button>
                </div>
            </td>
        </tr>
    );
});

// 2. The Grid View Component (Card)
export const JobCard = React.memo(({ job, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-gray-900 font-semibold truncate pr-4" title={job.company}>
                    {job.company}
                </h3>
                <div className="flex gap-1">
                    <button aria-label={`Edit job ${job.company}`} onClick={() => onEdit(job)} className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md transition-colors">
                        <Pencil size={15} />
                    </button>
                    <button aria-label={`Delete job ${job.company}`} onClick={() => onDelete(job._id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-md transition-colors">
                        <Trash2 size={15} />
                    </button>
                </div>
            </div>

            <p className="text-sm text-gray-900 font-medium mb-2 truncate">
                {job.position}
            </p>

            <div className="flex items-center text-xs text-gray-500 mb-4 truncate">
                <MapPin size={12} className="mr-1 inline" />
                <span className="truncate mr-3">{job.location || 'Location N/A'}</span>
                {job.salary && (
                    <>
                        <DollarSign size={12} className="mr-1 inline" />
                        <span className="truncate">{job.salary}</span>
                    </>
                )}
            </div>

            <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                <span className={`px-2 py-0.5 rounded-md text-xs font-medium border ${STATUS_STYLES[job.status] || 'bg-gray-100 text-gray-700'}`}>
                    {job.status}
                </span>
            </div>
            <div className="pt-3 border-t border-gray-100 text-xs text-gray-400 flex items-center justify-between">
                <span>Applied: {new Date(job.createdAt).toLocaleDateString()}</span>
            </div>
        </div>
    );
});