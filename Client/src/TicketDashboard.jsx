import EditTicket from './components/EditTicket/EditTicket';
import { useTicketContext } from './context/TicketContext';
import FilterBar from './components/Filters/FilterBar';
import TicketList from './components/TicketTable/TicketList';
import { Loader2, AlertCircle } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

// Configuration constants
const OPTIONS = {
    priorities: ['High', 'Medium', 'Low'],
    statuses: ['Open', 'In Progress', 'Closed']
};

const TicketDashboard = () => {
    // using custom hook to manage ticket data and state
    const { tickets, loading, error, filters, handleFilterChange, removeTicket, updateTicket } = useTicketContext();
    const [editingTicket, setEditingTicket] = useState(null);

    // Initialize view mode from local storage or default to 'list'
    const [viewMode, setViewMode] = useState(() => localStorage.getItem('ticketViewMode') || 'list');

    // Automatically save view mode preference whenever it changes
    useEffect(() => {
        localStorage.setItem('ticketViewMode', viewMode);
    }, [viewMode]);

    // wrapper to handle ticket updates and close modal on success
    const handleUpdate = async (id, data) => {
        const result = await updateTicket(id, data);
        if (result.success) {
            setEditingTicket(null);
        }
        return result;
    };

    // Memoized handlers to prevent unnecessary re-renders of TicketList
    const handleEdit = useCallback((ticket) => {
        setEditingTicket(ticket);
    }, []);

    const handleDelete = useCallback((id) => {
        removeTicket(id);
    }, [removeTicket]);

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
                <FilterBar setViewMode={setViewMode} viewMode={viewMode} filters={filters} onFilterChange={handleFilterChange} options={OPTIONS} />
            </div>

            <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col min-h-0">
                {loading ? (
                    <div className="flex flex-col items-center justify-center flex-1 text-gray-400 gap-3">
                        <Loader2 size={32} className="animate-spin text-indigo-500" />
                        <p className="font-medium text-gray-500">Loading tickets...</p>
                    </div>
                ) : (
                    <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col min-h-0 p-4">
                        {/* TicketList will now handle the scrolling internally */}
                        <TicketList
                            viewMode={viewMode}
                            tickets={tickets}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    </div>


                )}
            </div>

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
