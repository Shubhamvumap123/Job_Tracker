import React, { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react';
const API_URL = "http://localhost:5000/api/tickets";

const PRIORITY_OPTIONS = ['High', 'Medium', 'Low'];
const STATUS_OPTIONS = ['Open', 'In Progress', 'Resolved'];
const SHAPE_OPTIONS = ['Square', 'Circle', 'Triangle'];

const TicketList = () => {
    const [tickets, setTickets] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editFormData, setEditFormData] = useState({});
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    useEffect(() => {
        fetchTickets(status, priority);
    }, [status, priority]);

    const fetchTickets = (status, priority) => {
        axios.get(`${API_URL}/list?status=${status}&priority=${priority}`)
            .then((response) => {
                setTickets(response?.data?.tickets || []);
            })
            .catch((error) => console.error("Error fetching tickets:", error));
    };

    const handleDelete = (id) => {
        axios.delete(`${API_URL}/delete/${id}`)
            .then(() => {
                setTickets((prev) => prev.filter((ticket) => ticket._id !== id));
            })
            .catch((error) => console.error("Error deleting ticket:", error));
    };

    const handleEditClick = (ticket) => {
        setEditingId(ticket._id);
        const formValues = {
            title: ticket.title,
            description: ticket.description,
            priority: ticket.priority,
            status: ticket.status,
            shape: ticket.shape,
        };
        setEditFormData(formValues);
    };

    const handleCancelClick = () => {
        setEditingId(null);
        setEditFormData({});
    };

    const handleEditFormChange = (event) => {
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    };

    const handleSaveClick = (id) => {
        const validatedData = {
            title: editFormData.title,
            description: editFormData.description,
            priority: editFormData.priority,
            status: editFormData.status,
            shape: editFormData.shape
        };

        axios.put(`${API_URL}/update/${id}`, validatedData)
            .then((response) => {
                if (response?.data?.tickets) {
                    setTickets(response.data.tickets);
                } else {
                    fetchTickets();
                }
                setEditingId(null);
                setEditFormData({});
            })
            .catch((error) => console.error("Error updating ticket:", error));
    };
    return (
        <div className="ticket-list-container">
            <div className="table-header-actions">
                <input
                    type="text"
                    placeholder="Filter by title or status..."
                    className="search-input"
                />
                <div className="sort-options">
                    <label htmlFor="priority-select">Priority:</label>
                    <select id="priority-select" className="sort-btn" onChange={(e) => setPriority(e.target.value)}>
                        <option value="">Select Priority</option>
                        {PRIORITY_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="status-select">Status:</label>
                    <select id="status-select" className="sort-btn" onChange={(e) => setStatus(e.target.value)}>
                        <option value="">Select Status</option>
                        {STATUS_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
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
                        {tickets.map((ticket) => (
                            <React.Fragment key={ticket._id}>
                                {editingId === ticket._id ? (
                                    <tr>
                                        <td>
                                            <input
                                                type="text"
                                                required="required"
                                                placeholder="Enter a title..."
                                                name="title"
                                                value={editFormData.title || ''}
                                                onChange={handleEditFormChange}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                required="required"
                                                placeholder="Enter a description..."
                                                name="description"
                                                value={editFormData.description || ''}
                                                onChange={handleEditFormChange}
                                            />
                                        </td>
                                        <td>
                                            <select
                                                name="priority"
                                                value={editFormData.priority || ''}
                                                onChange={handleEditFormChange}
                                            >
                                                {PRIORITY_OPTIONS.map(opt => (
                                                    <option key={opt} value={opt}>{opt}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <select
                                                name="status"
                                                value={editFormData.status || ''}
                                                onChange={handleEditFormChange}
                                            >
                                                {STATUS_OPTIONS.map(opt => (
                                                    <option key={opt} value={opt}>{opt}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <select
                                                name="shape"
                                                value={editFormData.shape || ''}
                                                onChange={handleEditFormChange}
                                            >
                                                {SHAPE_OPTIONS.map(opt => (
                                                    <option key={opt} value={opt}>{opt}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <button type="button" onClick={() => handleSaveClick(ticket._id)} className="save-btn">Save</button>
                                            <button type="button" onClick={handleCancelClick} className="cancel-btn">Cancel</button>
                                        </td>
                                    </tr>
                                ) : (
                                    <tr>
                                        <td>{ticket.title}</td>
                                        <td>{ticket.description}</td>
                                        <td>{ticket.priority}</td>
                                        <td>{ticket.status}</td>
                                        <td>{ticket.shape}</td>
                                        <td>
                                            <button type="button" onClick={() => handleEditClick(ticket)} className="edit-btn">Edit</button>
                                            <button type="button" onClick={() => handleDelete(ticket._id)} className="delete-btn">Delete</button>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default TicketList;