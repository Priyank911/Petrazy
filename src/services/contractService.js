import { ApiPromise, WsProvider } from '@polkadot/api';
import { Abi, ContractPromise } from '@polkadot/api-contract';
import abiJson from './contract.json'; // Your compiled contract ABI

const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with your contract address
const wsProvider = new WsProvider('wss://vara-rpc.vara-network.io'); // Replace with your network's websocket provider

const contractService = {
    async getContract() {
        try {
            const api = await ApiPromise.create({ provider: wsProvider });
            const abi = new Abi(abiJson);
            const contract = new ContractPromise(api, abi, contractAddress);
            return contract;
        } catch (error) {
           throw new Error(`Failed to get contract: ${error}`);
        }
    },
    async fetchPetCount() {
        try {
            const contract = await this.getContract();
             const { output } = await contract.query.getPetCount();
             if (output) {
                return output.toHuman();
             } else {
                 return 0;
             }

        } catch (error) {
             throw new Error(`Failed to get pet count: ${error}`);
        }

    },
     async createPet(petName, account, userId) {
        try {
          const contract = await this.getContract();
          const tx = await contract.tx.createPet(petName).signAndSend(account);

           return new Promise((resolve) => {
              tx.on('finalized', async (result) => {
                   const pet = { id: userId, name: petName, energy: 100, mood: 'Happy', level:1, lastFedTime: Date.now(), rarity: "Common", special_traits: [] };
                 resolve(pet);
              })
              tx.on('failed', (error) => {
                throw new Error(`Transaction failed: ${error}`);
              })
          })

       } catch (error) {
            throw new Error(`Failed to create pet: ${error}`);
        }
    },
    async feedPet(petId, account) {
         try {
             const contract = await this.getContract();
             const tx = await contract.tx.feedPet().signAndSend(account)

            return new Promise((resolve) => {
               tx.on('finalized', async (result) => {
                    resolve({ id: petId, energy: 100, lastFedTime: Date.now() });
               })
                tx.on('failed', (error) => {
                    throw new Error(`Transaction failed: ${error}`);
                })
             })

         } catch (error) {
             throw new Error(`Failed to feed pet: ${error}`);
         }
    },
    async changePetMood(petId, mood, account) {
         try {
             const contract = await this.getContract();
            const tx = await contract.tx.updatePetMood(mood).signAndSend(account);

             return new Promise((resolve) => {
               tx.on('finalized', async (result) => {
                    resolve({ id: petId, mood });
               });
                  tx.on('failed', (error) => {
                    throw new Error(`Transaction failed: ${error}`);
                })
             })


         } catch (error) {
            throw new Error(`Failed to change pet mood: ${error}`);
        }
    },
     async levelUpPet(petId, account) {
           try {
              const contract = await this.getContract();
             const tx = await contract.tx.levelUp().signAndSend(account);
                return new Promise((resolve) => {
               tx.on('finalized', async (result) => {
                  resolve({ id: petId });
                 });
                tx.on('failed', (error) => {
                 throw new Error(`Transaction failed: ${error}`);
               })
              })
            } catch (error) {
                throw new Error(`Failed to change pet mood: ${error}`);
           }
    }
};

export default contractService;