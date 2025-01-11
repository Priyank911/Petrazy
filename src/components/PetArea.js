import React from 'react';
import PetDisplay from './PetDisplay';
import MoodSelector from './MoodSelector';
import { usePet } from '../context/PetContext';
import Loading from './Loading';

const PetArea = () => {
    const { pet, feedPet, loading, errorMessage, setErrorMessage, levelUp } = usePet();

    const handleFeed = async () => {
      try {
       await feedPet()
      } catch (error) {
        setErrorMessage(error.message)
      }

    };

     const handleLevelUp = async () => {
       try {
       await levelUp()
      } catch (error) {
         setErrorMessage(error.message)
      }

    };

    if(loading){
        return <Loading message={"Loading"}/>
    }
    return (
        <div >
            <h2>My Pet: <span id="pet-name-display">{pet?.name}</span></h2>
            <PetDisplay petData={pet} />
            <MoodSelector />

            <div id="pet-controls">
                <button onClick={handleFeed}>Feed</button>
               <button onClick={handleLevelUp}>Level Up</button>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}

        </div>
    );
};

export default PetArea;