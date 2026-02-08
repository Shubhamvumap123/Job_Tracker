import React, { memo } from 'react';

const TicketRow = ({ ticket, onEdit, onDelete }) => {
    // Determine color based on priority (Visual improvement)
    const priorityColor = ticket.priority === 'High' ? 'red' : ticket.priority === 'Medium' ? 'orange' : 'green';

    return (
        <tr>
            <td>{ticket.title}</td>
            <td>{ticket.description}</td>
            <td style={{ color: priorityColor, fontWeight: 'bold' }}>{ticket.priority}</td>
            <td>
                <span className={`badge status-${ticket.status.toLowerCase()}`}>
                    {ticket.status}
                </span>
            </td>
            <td>{ticket.shape}</td>
            <td>
                <button onClick={() => onEdit(ticket)} className="edit-btn">✏️ Edit</button>
                <button onClick={() => onDelete(ticket._id)} className="delete-btn">🗑️ Delete</button>
            </td>
        </tr>
    );
};

// Only re-render if ticket data changes
export default memo(TicketRow);