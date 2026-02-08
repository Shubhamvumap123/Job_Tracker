import React, { memo } from 'react';
import { Pencil, Trash2 } from 'lucide-react';

const TicketRow = ({ ticket, onEdit, onDelete }) => {
    const priorityColors = {
        High: 'text-red-600 bg-red-50',
        Medium: 'text-orange-600 bg-orange-50',
        Low: 'text-green-600 bg-green-50'
    };

    const statusStyles = {
        Open: 'bg-blue-100 text-blue-700',
        'In Progress': 'bg-purple-100 text-purple-700',
        Closed: 'bg-gray-100 text-gray-700',
        Closed: 'bg-green-100 text-green-700'
    };

    return (
        <tr className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
            <td className="px-6 py-4 text-sm font-medium text-gray-900">{ticket.title}</td>
            <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" title={ticket.description}>
                {ticket.description}
            </td>
            <td className="px-6 py-4">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${priorityColors[ticket.priority] || 'text-gray-600 bg-gray-50'}`}>
                    {ticket.priority}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border border-transparent ${statusStyles[ticket.status] || 'bg-gray-100 text-gray-700'}`}>
                    {ticket.status}
                </span>
            </td>
            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{new Date(ticket.createdAt).toLocaleDateString()}</td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onEdit(ticket)}
                        className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Edit Ticket"
                    >
                        <Pencil size={16} />
                    </button>
                    <button
                        onClick={() => onDelete(ticket._id)}
                        className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Ticket"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default memo(TicketRow);