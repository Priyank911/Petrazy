import { useState, useEffect } from 'react';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';


export const usePolkadot = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadAccounts = async () => {
      try {
        setLoading(true)
        await web3Enable('Digital Pets App');
        const availableAccounts = await web3Accounts();
        setAccounts(availableAccounts);
        if(availableAccounts.length > 0){
            setSelectedAccount(availableAccounts[0].address)
        } else {
            setError("No polkadot accounts are available. Please make sure that you have installed the Polkadot extension.")
        }
      } catch (error) {
          setError(error.message);
        console.error("Error when loading Polkadot Accounts: ", error);
      } finally {
        setLoading(false)
      }
    };
    loadAccounts();
  }, []);


  const handleAccountChange = (account) => {
    setSelectedAccount(account);
  }


  return { accounts, selectedAccount, handleAccountChange, loading, error };
};