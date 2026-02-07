import { useState } from 'react'
import './App.css'
import TicketList from './components/TicketList'
import CreateTicket from './components/CreateTicket/CreateTicket'

function App() {
  const [isCreating, setIsCreating] = useState(false);
  return (
    <>
      <h1>Ticket Management System</h1>
      <button onClick={() => setIsCreating(true)}>Create Ticket</button>

      {/* 3. Conditionally render the component based on state */}
      {isCreating ? (
        <div className="modal-overlay">
          <CreateTicket onClose={() => setIsCreating(false)} />
        </div>
      ) : (
        <TicketList />
      )}
    </>
  )
}

export default App
