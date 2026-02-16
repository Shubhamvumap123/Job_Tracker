import React, { useState } from 'react'
import { useTicketContext } from '../../context/TicketContext';
import { X } from 'lucide-react';

const CreateTicket = ({ onClose }) => {
    const { createTicket } = useTicketContext();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Low");
    const [status, setStatus] = useState("Open");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    // handle form submission
    const handleCreateTicket = async () => {
        setIsSubmitting(true);
        setError(null);

        const result = await createTicket({
            title,
            description,
            priority,
            status
        });

        if (result.success) {
            setIsSubmitting(false);
            onClose();
            // No reload needed! Context updates automatically
        } else {
            setError(result.error);
            setIsSubmitting(false);
        }
    }

    const inputClass = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all";
    const labelClass = "block text-sm font-medium text-gray-700 mb-1";

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Create New Ticket</h2>
                <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors" aria-label="Close modal">
                    <X size={20} />
                </button>
            </div>

            <div className="space-y-4">
                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-200">
                        {error}
                    </div>
                )}
                <div>
                    <label htmlFor="create-title" className={labelClass}>Title</label>
                    <input
                        id="create-title"
                        type="text"
                        placeholder="e.g., Login page not loading"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={inputClass}
                    />
                </div>

                <div>
                    <label htmlFor="create-description" className={labelClass}>Description</label>
                    <textarea
                        id="create-description"
                        rows={4}
                        placeholder="Describe the issue in detail..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={inputClass}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="create-priority" className={labelClass}>Priority</label>
                        <select
                            id="create-priority"
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
                        <label htmlFor="create-status" className={labelClass}>Status</label>
                        <select
                            id="create-status"
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
                    onClick={handleCreateTicket}
                    disabled={isSubmitting || !title || !description}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Creating...' : 'Create Ticket'}
                </button>
            </div>
        </div>
    )
}

export default CreateTicket