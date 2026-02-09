import React from 'react';
import { TicketRow, TicketCard } from './TicketItems';

const TicketList = ({ viewMode, tickets, onEdit, onDelete }) => {

    return (
        <div className="flex flex-col h-full w-full">

            <div className="flex-1 overflow-y-auto min-h-0 pr-2">

                {viewMode === 'list' ? (
                    <div className="border border-gray-200 rounded-lg shadow-sm bg-white">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50 sticky top-0 z-10 shadow-sm">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {tickets.map(ticket => (
                                    <TicketRow
                                        key={ticket._id}
                                        ticket={ticket}
                                        onEdit={onEdit}
                                        onDelete={onDelete}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-4">
                        {tickets.map(ticket => (
                            <TicketCard
                                key={ticket._id}
                                ticket={ticket}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TicketList;