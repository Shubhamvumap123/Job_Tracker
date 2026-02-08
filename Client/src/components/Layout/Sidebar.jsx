import { Home, Ticket, PlusCircle, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ onCreateClick, isOpen, onClose }) => {
    const navItems = [
        { icon: Home, label: 'Dashboard', path: '/' },
        { icon: Ticket, label: 'All Tickets', path: '/tickets' },
    ];

    const sidebarClasses = `
    fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white border-r border-slate-800 transform transition-transform duration-300 ease-in-out
    md:translate-x-0 md:static md:h-screen md:shadow-none
    ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
  `;

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm transition-opacity"
                    onClick={onClose}
                />
            )}

            <aside className={sidebarClasses}>
                <div className="flex flex-col h-full">
                    <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-indigo-400">
                            <Ticket size={28} strokeWidth={2.5} />
                            <span className="text-xl font-bold tracking-tight text-white">SupportDesk</span>
                        </div>
                        <button onClick={onClose} className="md:hidden text-slate-400 hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-3">Menu</div>
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={onClose} // Close sidebar on mobile when link clicked
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${isActive
                                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20'
                                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                    }`
                                }
                            >
                                <item.icon size={20} className="transition-transform group-hover:scale-110 duration-200" />
                                {item.label}
                            </NavLink>
                        ))}

                        <div className="mt-8 text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-3">Actions</div>
                        <button
                            onClick={() => { onCreateClick(); onClose(); }}
                            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-all duration-200 text-left group"
                        >
                            <PlusCircle size={20} className="text-emerald-500 transition-transform group-hover:scale-110 duration-200" />
                            Create Ticket
                        </button>
                    </nav>

                    <div className="p-4 border-t border-slate-800">
                        {/* Footer content if needed later */}
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
