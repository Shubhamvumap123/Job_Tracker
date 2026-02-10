import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Tickets from './pages/Tickets';
import CreateTicket from './components/CreateTicket/CreateTicket';
import { TicketProvider } from './context/TicketContext';

// Main application entry point setting up routes and layout
function App() {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <BrowserRouter>
      <TicketProvider>
        {/* Defined routes for the application */}
        <Routes>
          <Route path="/" element={<Layout onCreateClick={() => setIsCreating(true)} />}>
            <Route index element={<Home />} />
            <Route path="tickets" element={<Tickets />} />
          </Route>
        </Routes>

        {isCreating && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl p-6 mx-4 animate-in zoom-in-95 duration-200">
              <CreateTicket onClose={() => setIsCreating(false)} />
            </div>
          </div>
        )}
      </TicketProvider>
    </BrowserRouter>
  )
}

export default App
