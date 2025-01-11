import React, { createContext, useContext, useState, useEffect } from 'react';
import contractService from '../services/contractService';
import { useAuth } from './AuthContext';
import { usePolkadot } from '../hooks/usePolkadot';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const PetContext = createContext();

export const PetProvider = ({ children }) => {
    const { loggedInUser } = useAuth();
    const { selectedAccount } = usePolkadot();
    const [pet, setPet] = useState(null);
    const [petCount, setPetCount] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [userPets, setUserPets] = useLocalStorage('user_pets', {});

    useEffect(() => {
      if (loggedInUser && userPets && userPets[loggedInUser.uid]) {
        setPet(userPets[loggedInUser.uid])
      } else {
        setPet(null)
      }
    }, [userPets, loggedInUser]);


    useEffect(() => {
         const fetchPetCount = async () => {
            try {
               setLoading(true);
                const count = await contractService.fetchPetCount();
                setPetCount(count)
            } catch (error) {
                setErrorMessage("Failed to fetch pet count")
                console.error("Failed to fetch pet count", error)
            } finally {
                 setLoading(false);
            }
         }
         fetchPetCount();
    }, []);

    const createPet = async (petName) => {
      if (!selectedAccount) {
        setErrorMessage("Please connect your polkadot account first")
        return;
      }
        try {
            setLoading(true);
            setErrorMessage(null);
            const newPet = await contractService.createPet(petName, selectedAccount, loggedInUser.uid);
            setUserPets({...userPets, [loggedInUser.uid]: newPet})
        } catch (error) {
            setErrorMessage('Failed to create pet.');
            console.error("Error creating the pet: ", error)
        } finally {
          setLoading(false);
        }
    };

    const feedPet = async () => {
      if (!selectedAccount) {
        setErrorMessage("Please connect your polkadot account first")
        return;
      }
        if (!pet) {
          setErrorMessage('You need to create a pet first.');
          return;
        }
        try {
           setLoading(true);
            setErrorMessage(null);
          const updatedPet = await contractService.feedPet(pet.id, selectedAccount);
           setUserPets({...userPets, [loggedInUser.uid]: updatedPet});
        } catch (error) {
            setErrorMessage('Failed to feed pet.');
            console.error("Error feeding the pet: ", error)
        } finally {
           setLoading(false)
        }
    };

    const changeMood = async (mood) => {
       if (!selectedAccount) {
            setErrorMessage("Please connect your polkadot account first")
            return;
        }
        if (!pet) {
            setErrorMessage('You need to create a pet first.');
            return;
        }
        try {
           setLoading(true);
            setErrorMessage(null);
           const updatedPet = await contractService.changePetMood(pet.id, mood, selectedAccount);
            setUserPets({...userPets, [loggedInUser.uid]: updatedPet});
        } catch (error) {
            setErrorMessage('Failed to change mood.');
           console.error("Error changing the mood: ", error)
        } finally {
           setLoading(false)
        }

    }

    return (
        <PetContext.Provider value={{ pet, loading, createPet, feedPet, changeMood, errorMessage, setErrorMessage, petCount, setPetCount }}>
            {children}
        </PetContext.Provider>
    );
};

export const usePet = () => {
    return useContext(PetContext);
};