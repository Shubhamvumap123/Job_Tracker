import { Ticket, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTicketContext } from '../context/TicketContext';
import { useSocket } from '../context/SocketContext';
import { useEffect } from 'react';

const Home = () => {
    const navigate = useNavigate();
    const { tickets, fetchTickets } = useTicketContext(); // We should use fetchTickets to refresh
    const socket = useSocket();

    // Real-time updates are now handled globally in TicketContext


    // calculate quick statistics for the dashboard
    const totalTickets = tickets.length;
    const openTickets = tickets.filter(t => t.status === 'Open' || t.status === 'New').length;
    const inProgressTickets = tickets.filter(t => t.status === 'In Progress').length;
    const resolvedTickets = tickets.filter(t => ['Closed', 'Resolved'].includes(t.status)).length;

    const stats = [
        { label: 'Total Tickets', value: totalTickets, icon: Ticket, color: 'bg-blue-500' },
        { label: 'Active', value: openTickets, icon: AlertCircle, color: 'bg-yellow-500' },
        { label: 'In Progress', value: inProgressTickets, icon: Clock, color: 'bg-indigo-500' },
        { label: 'Closed', value: resolvedTickets, icon: CheckCircle, color: 'bg-green-500' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Welcome To Tickets Dashboard</h1>
                <p className="text-gray-500">Here's what's happening with your tickets today.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-transform hover:scale-105">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                            </div>
                            <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                                <stat.icon size={24} className={`${stat.color.replace('bg-', 'text-')}`} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10 max-w-2xl">
                    <h2 className="text-xl md:text-2xl font-bold mb-4">Need to report a new issue?</h2>
                    <p className="text-indigo-100 mb-6 text-sm md:text-base">
                        Create a ticket to track bugs, feature requests, or general inquiries. Our support team is ready to help!
                    </p>
                    <button
                        onClick={() => navigate('/tickets')}
                        className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors shadow-md"
                    >
                        Go to Ticket System
                    </button>
                </div>

                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-20 -mb-20 w-60 h-60 bg-purple-400 opacity-20 rounded-full blur-2xl"></div>
            </div>
        </div>
    );
};

export default Home;
