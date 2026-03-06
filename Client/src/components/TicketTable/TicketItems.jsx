// TicketItems.jsx
import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { PRIORITY_COLORS, STATUS_STYLES } from './constants'; // Import shared styles

// 1. The List View Component (Row)
export const TicketRow = ({ ticket, onEdit, onDelete }) => {
    return (
        <tr className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 group">
            <td className="px-6 py-4 text-sm font-medium text-gray-900">{ticket.title}</td>
            <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" title={ticket.description}>
                {ticket.description}
            </td>
            <td className="px-6 py-4">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${PRIORITY_COLORS[ticket.priority]}`}>
                    {ticket.priority}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${STATUS_STYLES[ticket.status]}`}>
                    {ticket.status}
                </span>
            </td>
            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                {new Date(ticket.createdAt).toLocaleDateString()}
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                    <button onClick={() => onEdit(ticket)} aria-label="Edit ticket" className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 focus-visible:ring-2 focus-visible:outline-none rounded-lg transition-colors">
                        <Pencil size={16} />
                    </button>
                    <button onClick={() => onDelete(ticket._id)} aria-label="Delete ticket" className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 focus-visible:ring-2 focus-visible:outline-none rounded-lg transition-colors">
                        <Trash2 size={16} />
                    </button>
                </div>
            </td>
        </tr>
    );
};

// 2. The Grid View Component (Card)
export const TicketCard = ({ ticket, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-gray-900 font-semibold truncate pr-4" title={ticket.title}>
                    {ticket.title}
                </h3>
                <div className="flex gap-1">
                    <button onClick={() => onEdit(ticket)} aria-label="Edit ticket" className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 focus-visible:ring-2 focus-visible:outline-none rounded-md transition-colors">
                        <Pencil size={15} />
                    </button>
                    <button onClick={() => onDelete(ticket._id)} aria-label="Delete ticket" className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 focus-visible:ring-2 focus-visible:outline-none rounded-md transition-colors">
                        <Trash2 size={15} />
                    </button>
                </div>
            </div>
            <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-grow">
                {ticket.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-2 py-0.5 rounded-md text-xs font-medium border ${PRIORITY_COLORS[ticket.priority]}`}>
                    {ticket.priority}
                </span>
                <span className={`px-2 py-0.5 rounded-md text-xs font-medium border ${STATUS_STYLES[ticket.status]}`}>
                    {ticket.status}
                </span>
            </div>
            <div className="pt-3 border-t border-gray-100 text-xs text-gray-400 flex items-center justify-between">
                <span>Created Date: {new Date(ticket.createdAt).toLocaleDateString()}</span>
            </div>
        </div>
    );
};