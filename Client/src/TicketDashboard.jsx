import React, { useState } from 'react';
import { useTickets } from './hooks/useTickets.jsx';
import FilterBar from './components/Filters/FilterBar';
import TicketRow from './components/TicketTable/TicketRow';
import EditableRow from './components/TicketTable/EditableRow';

// Configuration constants
const OPTIONS = {
    priorities: ['High', 'Medium', 'Low'],
    statuses: ['Open', 'In Progress', 'Closed'],
    shapes: ['Square', 'Circle', 'Triangle']
};

const TicketDashboard = () => {
    const {
        tickets, loading, error, filters,
        handleFilterChange, removeTicket, updateTicket
    } = useTickets();

    const [editingId, setEditingId] = useState(null);

    const handleSave = async (id, data) => {
        const success = await updateTicket(id, data);
        if (success) setEditingId(null);
    };

    return (
        <div className="ticket-dashboard">
            <h2>Ticket Management</h2>

            {error && <div className="error-banner">{error}</div>}

            <FilterBar
                filters={filters}
                onFilterChange={handleFilterChange}
                options={OPTIONS}
            />

            {loading ? (
                <div className="loader">Loading tickets...</div>
            ) : (
                <table className="ticket-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Shape</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.length > 0 ? tickets.map((ticket) => (
                            editingId === ticket._id ? (
                                <EditableRow
                                    key={ticket._id}
                                    ticket={ticket}
                                    options={OPTIONS}
                                    onSave={handleSave}
                                    onCancel={() => setEditingId(null)}
                                />
                            ) : (
                                <TicketRow
                                    key={ticket._id}
                                    ticket={ticket}
                                    onEdit={(t) => setEditingId(t._id)}
                                    onDelete={removeTicket}
                                />
                            )
                        )) : (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center' }}>No tickets found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TicketDashboard;