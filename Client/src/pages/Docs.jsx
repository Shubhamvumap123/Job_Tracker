import React, { useState } from 'react';
import { Book, Code, Box, Layers, Activity, Server, FileText, ChevronRight, ChevronDown } from 'lucide-react';

const Docs = () => {
    const [activeSection, setActiveSection] = useState('overview');

    const sections = [
        {
            id: 'overview',
            title: 'Overview',
            icon: Book,
            content: (
                <div className="space-y-4 text-gray-600">
                    <p>
                        Welcome to the <strong>Support Ticket Management System</strong> developer documentation.
                        This application is built using the MERN stack (MongoDB, Express, React, Node.js).
                    </p>
                    <p>
                        The frontend is designed with <strong>React + Vite</strong> and uses <strong>Tailwind CSS</strong> for styling.
                        It features a clean architecture with separate layers for API handling, state management, and UI components.
                    </p>
                    <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                        <h4 className="font-semibold text-indigo-700 mb-2">Key Highlights</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li><strong>State Management:</strong> Context API + Custom Hooks</li>
                            <li><strong>Performance:</strong> Debouncing, Optimistic UI</li>
                            <li><strong>Routing:</strong> React Router DOM v6</li>
                            <li><strong>Styling:</strong> Utility-first CSS with Tailwind</li>
                        </ul>
                    </div>
                </div>
            )
        },
        {
            id: 'hooks',
            title: 'Custom Hooks',
            icon: Activity,
            subItems: [
                {
                    name: 'useTickets',
                    desc: 'Central hook for ticket logic',
                    details: [
                        { name: 'tickets', type: 'Array', desc: 'Current list of ticket objects.' },
                        { name: 'loading', type: 'Boolean', desc: 'True when fetching data.' },
                        { name: 'error', type: 'String|Null', desc: 'Error message if request fails.' },
                        { name: 'createTicket(data)', type: 'Function', desc: 'Sends POST request to create a ticket.' },
                        { name: 'updateTicket(id, data)', type: 'Function', desc: 'Sends PUT request to update ticket.' },
                        { name: 'removeTicket(id)', type: 'Function', desc: 'Optimistically removes ticket from UI, then sends DELETE request.' },
                        { name: 'filters', type: 'Object', desc: 'Current filter state { status, priority, search }.' },
                    ]
                },
                {
                    name: 'useDebounce',
                    desc: 'Performance utility',
                    details: [
                        { name: 'value', type: 'any', desc: 'The value to debounce.' },
                        { name: 'delay', type: 'Number', desc: 'Delay in milliseconds (default 500ms).' },
                        { name: 'returns', type: 'any', desc: 'The debounced value that updates only after delay.' }
                    ]
                }
            ]
        },
        {
            id: 'context',
            title: 'Context API',
            icon: Layers,
            subItems: [
                {
                    name: 'TicketContext',
                    desc: 'Global State Provider',
                    details: [
                        { name: 'TicketProvider', type: 'Component', desc: 'Wraps the app to provide ticket state.' },
                        { name: 'useTicketContext', type: 'Hook', desc: 'Consumes context to give access to tickets, loading, etc.' }
                    ]
                }
            ]
        },
        {
            id: 'api',
            title: 'API Service',
            icon: Server,
            subItems: [
                {
                    name: 'ticketService',
                    desc: 'Axios wrapper for HTTP requests',
                    details: [
                        { name: 'getAll(params)', type: 'GET', desc: 'Fetches tickets with query params.' },
                        { name: 'create(data)', type: 'POST', desc: 'Creates new ticket payload.' },
                        { name: 'update(id, data)', type: 'PUT', desc: 'Updates existing ticket.' },
                        { name: 'delete(id)', type: 'DELETE', desc: 'Removes ticket by ID.' }
                    ]
                }
            ]
        },
        {
            id: 'components',
            title: 'Components',
            icon: Box,
            subItems: [
                {
                    name: 'TicketDashboard',
                    desc: 'Main container',
                    details: [
                        { name: 'viewMode', type: 'State', desc: "Toggle between 'list' and 'grid' view." },
                        { name: 'editingTicket', type: 'State', desc: 'Holds ticket object currently being edited.' }
                    ]
                },
                {
                    name: 'EditTicket',
                    desc: 'Modal form',
                    details: [
                        { name: 'props.ticket', type: 'Object', desc: 'The ticket data to pre-fill.' },
                        { name: 'props.onClose', type: 'Function', desc: 'Callback to close modal.' },
                        { name: 'Logic', type: 'Feature', desc: 'Disables fields if status is Closed.' }
                    ]
                },
                {
                    name: 'CreateTicket',
                    desc: 'Creation form',
                    details: [
                        { name: 'props.onClose', type: 'Function', desc: 'Callback to close modal.' }
                    ]
                }
            ]
        }
    ];

    return (
        <div className="flex flex-col h-[calc(100vh-140px)] md:flex-row gap-6">
            {/* Outline Sidebar */}
            <div className="md:w-64 flex-none bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-fit">
                <div className="p-4 bg-gray-50 border-b border-gray-100 font-semibold text-gray-700">
                    Documentation
                </div>
                <div className="p-2 space-y-1">
                    {sections.map(section => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeSection === section.id
                                ? 'bg-indigo-50 text-indigo-700'
                                : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            <section.icon size={18} />
                            {section.title}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 p-6 overflow-y-auto">
                {sections.map(section => {
                    if (section.id !== activeSection) return null;
                    return (
                        <div key={section.id} className="animate-in fade-in duration-300">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                                    <section.icon size={24} />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                            </div>

                            {section.content}

                            {section.subItems && (
                                <div className="space-y-8">
                                    {section.subItems.map(item => (
                                        <div key={item.name} className="border border-gray-200 rounded-xl overflow-hidden">
                                            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                                                <div className="font-mono font-bold text-indigo-600 flex items-center gap-2">
                                                    <Code size={16} />
                                                    {item.name}
                                                </div>
                                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{item.desc}</span>
                                            </div>
                                            <div className="p-4">
                                                <table className="min-w-full text-sm">
                                                    <thead>
                                                        <tr className="text-left text-gray-500 border-b border-gray-100">
                                                            <th className="pb-2 font-medium">Name</th>
                                                            <th className="pb-2 font-medium">Type</th>
                                                            <th className="pb-2 font-medium w-full">Description</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-50">
                                                        {item.details.map((detail, idx) => (
                                                            <tr key={idx} className="group hover:bg-gray-50 transition-colors">
                                                                <td className="py-2.5 px-1 font-mono text-gray-700">{detail.name}</td>
                                                                <td className="py-2.5 px-1">
                                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-800">
                                                                        {detail.type}
                                                                    </span>
                                                                </td>
                                                                <td className="py-2.5 px-1 text-gray-600 leading-relaxed">{detail.desc}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Docs;
