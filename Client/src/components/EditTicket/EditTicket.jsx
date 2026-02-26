import React, { useState } from 'react'
import { X, Loader2 } from 'lucide-react';

const EditTicket = ({ ticket, onClose, onUpdate }) => {
    const [title, setTitle] = useState(ticket?.title || "");
    const [description, setDescription] = useState(ticket?.description || "");
    const [priority, setPriority] = useState(ticket?.priority || "Low");
    const [status, setStatus] = useState(ticket?.status || "Open");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    // submit updated ticket data
    const handleUpdateTicket = async () => {
        setIsSubmitting(true);
        setError(null);
        try {
            const result = await onUpdate(ticket._id, {
                title,
                description,
                priority,
                status
            });

            if (result && !result.success) {
                setError(result.error);
                setIsSubmitting(false);
            } else {
                // Success handled by parent (closing modal), but we can safe guard
                setIsSubmitting(false);
                onClose();
            }
        } catch (error) {
            console.error(error);
            setError("An unexpected error occurred");
            setIsSubmitting(false);
        }
    }

    const inputClass = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all";
    const labelClass = "block text-sm font-medium text-gray-700 mb-1";

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Edit Ticket</h2>
                <button onClick={onClose} aria-label="Close modal" className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
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
                    <label htmlFor="edit-title" className={labelClass}>Title</label>
                    <input
                        id="edit-title"
                        type="text"
                        placeholder="e.g., Login page not loading"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        disabled={status === 'Closed'}
                        className={`${inputClass} ${status === 'Closed' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}`}
                        title={status === 'Closed' ? "Change status to Open to edit title" : ""}
                    />
                </div>

                <div>
                    <label htmlFor="edit-description" className={labelClass}>Description</label>
                    <textarea
                        id="edit-description"
                        rows={4}
                        placeholder="Describe the issue in detail..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        disabled={status === 'Closed'}
                        className={`${inputClass} ${status === 'Closed' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}`}
                        title={status === 'Closed' ? "Change status to Open to edit description" : ""}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="edit-priority" className={labelClass}>Priority</label>
                        <select
                            id="edit-priority"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            disabled={status === 'Closed'}
                            className={`${inputClass} ${status === 'Closed' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}`}
                            title={status === 'Closed' ? "Change status to Open to edit priority" : ""}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="edit-status" className={labelClass}>Status</label>
                        <select
                            id="edit-status"
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
                    className="flex items-center justify-center min-w-[120px] px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : 'Save Changes'}
                </button>
            </div>
        </div>
    )
}

export default EditTicket
