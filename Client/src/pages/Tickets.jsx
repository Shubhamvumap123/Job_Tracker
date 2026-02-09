import TicketDashboard from '../TicketDashboard';

// Wrapper page for the main ticket dashboard
const Tickets = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">All Tickets</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage and track all support tickets.</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <TicketDashboard />
            </div>
        </div>
    );
};

export default Tickets;
