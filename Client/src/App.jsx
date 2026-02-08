import { useState } from 'react'
import './App.css'
import CreateTicket from './components/CreateTicket/CreateTicket'
import TicketDashboard from './TicketDashboard'
function App() {
  const [isCreating, setIsCreating] = useState(false);
  return (
    <>
      <h1>Ticket Management System</h1>
      <button onClick={() => setIsCreating(true)}>Create Ticket</button>

      {isCreating ? (
        <div className="modal-overlay">
          <CreateTicket onClose={() => setIsCreating(false)} />
        </div>
      ) : (
        <TicketDashboard />
      )}
    </>
  )
}

export default App
