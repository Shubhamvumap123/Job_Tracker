import React from 'react'
import { useState } from 'react'
import axios from 'axios';
let API_URL = "http://localhost:5000/api/tickets/create";

const CreateTicket = ({ onClose }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Low");
    const [status, setStatus] = useState("Open");
    const handleCreateTicket = () => {
        axios.post(API_URL, {
            title,
            description,
            priority,
            status
        }).then((response) => {
            console.log(response);
        });
    }
    return (
        <div>
            <input type="text" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
            </select>
            <button onClick={handleCreateTicket}>Create Ticket</button>
            <button onClick={onClose}>Close</button>
        </div>
    )
}

export default CreateTicket