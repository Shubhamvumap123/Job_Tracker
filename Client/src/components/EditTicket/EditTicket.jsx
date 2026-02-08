import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react';

const EditTicket = ({ ticket, onClose, onUpdate }) => {
    const [title, setTitle] = useState(ticket?.title || "");
    const [description, setDescription] = useState(ticket?.description || "");
    const [priority, setPriority] = useState(ticket?.priority || "Low");
    const [status, setStatus] = useState(ticket?.status || "Open");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (ticket) {
            setTitle(ticket.title);
            setDescription(ticket.description);
            setPriority(ticket.priority);
            setStatus(ticket.status);
        }
    }, [ticket]);

    const handleUpdateTicket = async () => {
        setIsSubmitting(true);
        try {
            await onUpdate(ticket._id, {
                title,
                description,
                priority,
                status
            });
            setIsSubmitting(false);
            onClose();
        } catch (error) {
            console.error(error);
            setIsSubmitting(false);
        }
    }

    const inputClass = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all";
    const labelClass = "block text-sm font-medium text-gray-700 mb-1";

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Edit Ticket</h2>
                <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                    <X size={20} />
                </button>
            </div>

            <div className="space-y-4">
                <div>
                    <label className={labelClass}>Title</label>
                    <input
                        type="text"
                        placeholder="e.g., Login page not loading"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={inputClass}
                    />
                </div>

                <div>
                    <label className={labelClass}>Description</label>
                    <textarea
                        rows={4}
                        placeholder="Describe the issue in detail..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={inputClass}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>Priority</label>
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className={inputClass}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <div>
                        <label className={labelClass}>Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className={inputClass}
                        >
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex items-center justify-end gap-3">
                <button
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={handleUpdateTicket}
                    disabled={isSubmitting || !title || !description}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </div>
    )
}

export default EditTicket
