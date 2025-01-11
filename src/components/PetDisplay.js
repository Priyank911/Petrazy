import React from 'react';

const PetDisplay = ({ petData }) => {
    const { name, energy, mood } = petData || { name: "Unknown", energy: 0, mood: "Unknown" };
  return (
      <div className="pet-display">
        <img
            className="pet-image"
            src="/assets/default_pet.png"
            alt="Pet"
        />
        <p>Energy: <span id="pet-energy-display">{energy}</span></p>
        <p>Mood: <span id="pet-mood-display">{mood}</span></p>
      </div>
  );
};

export default PetDisplay;