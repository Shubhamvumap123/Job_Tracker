import { useState } from 'react';
import { useJobContext } from '../../context/JobContext';
import { X, Loader2 } from 'lucide-react';

const CreateJob = ({ onClose }) => {
    const { createJob } = useJobContext();
    const [formData, setFormData] = useState({
        company: '',
        position: '',
        status: 'Applied',
        location: '',
        salary: '',
        notes: ''
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCreateJob = async (e) => {
        if (e) e.preventDefault();
        setIsSubmitting(true);
        setError('');

        const result = await createJob({
            ...formData,
        });

        if (result.success) {
            onClose();
        } else {
            setError(result.error);
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleCreateJob} className="flex flex-col h-full max-h-[90vh]">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Create New Job</h2>
                <button
                    type="button"
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Close"
                >
                    <X size={20} className="text-gray-500" />
                </button>
            </div>

            {/* Form Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {error && (
                    <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                        <input
                            id="company"
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            value={formData.company}
                            onChange={e => setFormData({ ...formData, company: e.target.value })}
                            placeholder="e.g. Google"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                        <input
                            id="position"
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            value={formData.position}
                            onChange={e => setFormData({ ...formData, position: e.target.value })}
                            placeholder="e.g. Frontend Engineer"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                id="status"
                                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                                value={formData.status}
                                onChange={e => setFormData({ ...formData, status: e.target.value })}
                            >
                                <option value="Applied">Applied</option>
                                <option value="Interview">Interview</option>
                                <option value="Offer">Offer</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <input
                                id="location"
                                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                value={formData.location}
                                onChange={e => setFormData({ ...formData, location: e.target.value })}
                                placeholder="e.g. Remote, NY"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
                        <input
                            id="salary"
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            value={formData.salary}
                            onChange={e => setFormData({ ...formData, salary: e.target.value })}
                            placeholder="e.g. $120k - $150k"
                        />
                    </div>

                    <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                        <textarea
                            id="notes"
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none min-h-[120px] resize-y transition-all"
                            value={formData.notes}
                            onChange={e => setFormData({ ...formData, notes: e.target.value })}
                            placeholder="Additional details..."
                        />
                    </div>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 rounded-b-xl">
                <button
                    type="button"
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="px-5 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors disabled:opacity-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors flex items-center justify-center min-w-[120px] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="animate-spin mr-2" size={18} />
                            Creating...
                        </>
                    ) : (
                        'Create Job'
                    )}
                </button>
            </div>
        </form>
    );
};

export default CreateJob
