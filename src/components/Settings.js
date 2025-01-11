import React from 'react';
import { useSettings } from '../context/SettingsContext';

const Settings = () => {
    const { useRealTimeData, setUseRealTimeData } = useSettings();


  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={useRealTimeData}
          onChange={(e) => setUseRealTimeData(e.target.checked)}
        />
        Use Real-Time Data
      </label>
    </div>
  );
};

export default Settings;