import React, { useState } from 'react';
import { usePet } from '../context/PetContext';
import Loading from './Loading';

const CreatePetForm = () => {
  const [petName, setPetName] = useState('');
  const { loading, createPet, errorMessage, setErrorMessage } = usePet();


    const handleCreatePet = async () => {
        if(!petName) {
           setErrorMessage("Please enter the name")
            return;
        }

       try {
           await createPet(petName)
            setPetName('')
       } catch (error) {
           setErrorMessage(error.message)
       }
    };


  if (loading) {
    return <Loading message={"Creating Pet..."} />
  }
  return (
    <div >
        <h2>Create a New Pet</h2>
        <input
            type="text"
            placeholder="Pet Name"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
        />
        <button onClick={handleCreatePet}>Create Pet</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default CreatePetForm;