import React, { useState } from 'react';
import { usePet } from '../context/PetContext';
import Loading from './Loading';

const MoodSelector = () => {
    const [moodInput, setMoodInput] = useState('');
    const { changeMood, loading, errorMessage, setErrorMessage } = usePet();


    const handleChangeMood = async () => {
        try {
            await changeMood(moodInput);
            setMoodInput('');
        } catch (error) {
           setErrorMessage(error.message)
        }
    }

    if (loading) {
        return <Loading message={"Updating Mood..."} />
    }

  return (
    <div className="mood-selector">
       <input
            className="mood-input"
            type="text"
            placeholder="Enter Mood"
            value={moodInput}
            onChange={(e) => setMoodInput(e.target.value)}
        />
        <button onClick={handleChangeMood}>Change Mood</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default MoodSelector;