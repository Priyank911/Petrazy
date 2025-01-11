import React from 'react';
import { usePolkadot } from '../hooks/usePolkadot';

const AccountSelector = () => {
  const { accounts, selectedAccount, handleAccountChange, loading, error } = usePolkadot();

  if (loading) {
    return <p>Loading accounts...</p>;
  }

  if(error) {
    return <p>{error}</p>
  }

  return (
    <div>
      <label>Selected Account:</label>
      <select
        value={selectedAccount}
        onChange={(e) => handleAccountChange(e.target.value)}
      >
        {accounts.map((account) => (
          <option key={account.address} value={account.address}>
            {account.meta.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AccountSelector;