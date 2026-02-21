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
    const handleCreateTicket = async (e) => {
        if (e) e.preventDefault();
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
                <button onClick={onClose} aria-label="Close modal" className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                    <X size={20} />
                </button>
            </div>

            <form onSubmit={handleCreateTicket} className="flex flex-col flex-1 min-h-0">
                <div className="space-y-4 flex-1 overflow-y-auto pr-1">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-200">
                            {error}
                        </div>
                    )}
                    <div>
                        <label htmlFor="title" className={labelClass}>Title</label>
                        <input
                            id="title"
                            type="text"
                            placeholder="e.g., Login page not loading"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className={labelClass}>Description</label>
                        <textarea
                            id="description"
                            rows={4}
                            placeholder="Describe the issue in detail..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className={inputClass}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="priority" className={labelClass}>Priority</label>
                            <select
                                id="priority"
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
                            <label htmlFor="status" className={labelClass}>Status</label>
                            <select
                                id="status"
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

                <div className="mt-8 flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting || !title || !description}
                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Creating...' : 'Create Ticket'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateTicket
