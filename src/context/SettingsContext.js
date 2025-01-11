import React, { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [useRealTimeData, setUseRealTimeData] = useLocalStorage('useRealTimeData', false);

    return (
        <SettingsContext.Provider value={{ useRealTimeData, setUseRealTimeData }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    return useContext(SettingsContext);
};