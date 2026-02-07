import React, { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react';
let API_URL = "http://localhost:5000/api/tickets/list";


const TicketList = () => {
    const [tickets, setTickets] = useState([]);
    useEffect(() => {
        axios.get(API_URL).then((response) => {
            setTickets(response?.data?.tickets);
        });
    }, []);
    return (

        <div className="ticket-list-container">
            <div className="table-header-actions">
                <input
                    type="text"
                    placeholder="Filter by title or status..."
                    className="search-input"
                />
                <div className="sort-options">
                    <button className="sort-btn">Sort by Priority</button>
                    <button className="sort-btn">Sort by Status</button>
                </div>
            </div>
            <table className="ticket-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Shape</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map((i, k) => (
                        <tr key={k}>
                            <td>{i?.title}</td>
                            <td>{i?.description}</td>
                            <td>{i?.priority}</td>
                            <td>{i?.status}</td>
                            <td>{i?.shape}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TicketList