import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Docs from './pages/Docs';
import CreateJob from './components/CreateJob/CreateJob';
import { JobProvider } from './context/JobContext';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

// Main application entry point setting up routes and layout
function App() {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <BrowserRouter>
      <AuthProvider>
        <SocketProvider>
          <JobProvider>
            {/* Defined routes for the application */}
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route path="/" element={
                <ProtectedRoute>
                  <Layout onCreateClick={() => setIsCreating(true)} />
                </ProtectedRoute>
              }>
                <Route index element={<Home />} />
                <Route path="jobs" element={<Jobs />} />
                <Route path="docs" element={<Docs />} />
              </Route>

            </Routes>

            {isCreating && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl p-6 mx-4 animate-in zoom-in-95 duration-200">
                  <CreateJob onClose={() => setIsCreating(false)} />
                </div>
              </div>
            )}
          </JobProvider>
        </SocketProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
