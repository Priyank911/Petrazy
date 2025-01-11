import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import { AuthProvider, useAuth } from './context/AuthContext';
import './index.css';
import Loading from './components/Loading';
import { PetProvider } from './context/PetContext';
import { SettingsProvider } from './context/SettingsContext';


function AppContent() {
  const { isLoggedIn, loading } = useAuth();
  const navigate = useNavigate();


  if (loading) {
    return <Loading message={"Loading"} />;
  }

    if (!isLoggedIn) {
        navigate('/login');
    }
  return (
    <SettingsProvider>
    <PetProvider>
      <Routes>
        <Route path="/login" element={<Auth />} />
          <Route path="/" element={isLoggedIn ? <Dashboard /> : <Auth />} />
      </Routes>
      </PetProvider>
     </SettingsProvider>
  );
}


function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;