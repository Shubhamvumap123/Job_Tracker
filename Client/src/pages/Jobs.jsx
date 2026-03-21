import JobDashboard from '../JobDashboard';

// Wrapper page for the main job dashboard
const Jobs = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">All Jobs</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage and track all job applications.</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <JobDashboard />
            </div>
        </div>
    );
};

export default Jobs;
