import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import CreatePetForm from './CreatePetForm';
import PetArea from './PetArea';
import NoPetMessage from './NoPetMessage';
import { usePet } from '../context/PetContext';
import AccountSelector from './AccountSelector';
import Settings from './Settings';

const Dashboard = () => {
    const { logout, loggedInUser } = useAuth();
    const { pet } = usePet();
    const navigate = useNavigate();


    const handleLogout = async () => {
      try {
        await logout();
         navigate('/login')
      } catch (error) {
        console.error(error)
      }

    }

    return (
        <div >
            <header>
                <h1>Digital Pet Dashboard</h1>
                <button onClick={handleLogout}>Logout</button>
            </header>

             <AccountSelector/>
              <Settings/>
             {pet ? (
                <PetArea />
                ) : (
                <NoPetMessage />
                )}

            {!pet && <CreatePetForm />}
        </div>
    );
};

export default Dashboard;