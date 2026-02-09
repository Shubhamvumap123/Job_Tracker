import EditTicket from './components/EditTicket/EditTicket';
import { useTickets } from './hooks/useTickets';
import FilterBar from './components/Filters/FilterBar';
import TicketRow from './components/TicketTable/TicketRow';
import { Loader2, AlertCircle } from 'lucide-react';
import { useState } from 'react';

// Configuration constants
const OPTIONS = {
    priorities: ['High', 'Medium', 'Low'],
    statuses: ['Open', 'In Progress', 'Closed']
};

const TicketDashboard = () => {
    const { tickets, loading, error, filters, handleFilterChange, removeTicket, updateTicket } = useTickets();
    const [editingTicket, setEditingTicket] = useState(null);

    const handleUpdate = async (id, data) => {
        const result = await updateTicket(id, data);
        if (result.success) {
            setEditingTicket(null);
            window.location.reload();
        }
        return result;
    };

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-red-500 gap-2">
                <AlertCircle size={32} />
                <p className="font-semibold">Error loading tickets</p>
                <p className="text-sm text-red-400">{error}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-[calc(100vh-140px)]">
            <div className="flex-none">
                <FilterBar filters={filters} onFilterChange={handleFilterChange} options={OPTIONS} />
            </div>

            <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col min-h-0">
                {loading ? (
                    <div className="flex flex-col items-center justify-center flex-1 text-gray-400 gap-3">
                        <Loader2 size={32} className="animate-spin text-indigo-500" />
                        <p className="font-medium text-gray-500">Loading tickets...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto overflow-y-auto flex-1 h-full">
                        <table className="w-full text-left border-collapse min-w-[800px] relative">
                            <thead className="bg-gray-50 border-b border-gray-100 sticky top-0 z-10 shadow-sm">
                                <tr className="text-xs uppercase text-gray-500 font-semibold tracking-wider">
                                    <th className="px-6 py-4 rounded-tl-lg bg-gray-50">Title</th>
                                    <th className="px-6 py-4 bg-gray-50">Description</th>
                                    <th className="px-6 py-4 bg-gray-50">Priority</th>
                                    <th className="px-6 py-4 bg-gray-50">Status</th>
                                    <th className="px-6 py-4 bg-gray-50 whitespace-nowrap">Created At</th>
                                    <th className="px-6 py-4 rounded-tr-lg bg-gray-50 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {tickets.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                            No tickets found matching your filters.
                                        </td>
                                    </tr>
                                ) : (
                                    tickets.map(ticket => (
                                        <TicketRow
                                            key={ticket._id}
                                            ticket={ticket}
                                            onEdit={() => setEditingTicket(ticket)}
                                            onDelete={() => removeTicket(ticket._id)}
                                        />
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Edit Ticket Modal */}
            {editingTicket && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl p-6 mx-4 animate-in zoom-in-95 duration-200">
                        <EditTicket
                            ticket={editingTicket}
                            onClose={() => setEditingTicket(null)}
                            onUpdate={handleUpdate}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default TicketDashboard;
