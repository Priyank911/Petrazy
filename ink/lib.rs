#![cfg_attr(not(feature = "std"), no_std)]

#[ink::contract]
mod pet_contract {
    use ink::prelude::string::String;
    use ink::prelude::vec::Vec;

    #[derive(
        Debug, Clone, scale::Encode, scale::Decode, PartialEq, scale_info::TypeInfo,
        ink::storage::traits::StorageLayout,
    )]
    pub struct Pet {
        pub id: u32,
        pub name: String,
        pub energy: u32,
        pub mood: String,
        pub level: u32,
        pub rarity: String,
        pub special_traits: Vec<String>,
    }

    #[ink(storage)]
    pub struct PetContract {
        pets: ink::storage::Mapping<AccountId, Pet>,
        pet_count: u32,
        level_up_threshold: u32,
    }

    #[ink(event)]
    pub struct PetCreated {
        #[ink(topic)]
        owner: AccountId,
        pet_id: u32,
        name: String,
    }

    #[ink(event)]
    pub struct PetFed {
        #[ink(topic)]
        owner: AccountId,
        energy: u32,
    }

    #[ink(event)]
    pub struct PetMoodChanged {
        #[ink(topic)]
        owner: AccountId,
        mood: String,
    }

    #[ink(event)]
    pub struct PetLeveledUp {
        #[ink(topic)]
        owner: AccountId,
        level: u32,
    }

    impl PetContract {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                pets: ink::storage::Mapping::default(),
                pet_count: 0,
                level_up_threshold: 10,
            }
        }

        #[ink(message)]
        pub fn create_pet(&mut self, name: String) -> Result<(), String> {
            let caller = self.env().caller();

            if self.pets.contains(caller) {
                return Err("You already have a pet.".into());
            }

            let (rarity, traits) = Self::generate_rarity_and_traits(self.env().block_timestamp());

            let pet = Pet {
                id: self.pet_count,
                name: name.clone(),
                energy: 100,
                mood: "Happy".into(),
                level: 1,
                rarity,
                special_traits: traits,
            };

            self.pets.insert(caller, &pet);
            self.pet_count = self.pet_count.checked_add(1).ok_or("Pet count overflow")?;

            self.env().emit_event(PetCreated {
                owner: caller,
                pet_id: pet.id,
                name,
            });

            Ok(())
        }

        #[ink(message)]
        pub fn get_pet(&self, owner: AccountId) -> Option<Pet> {
            self.pets.get(owner)
        }

        #[ink(message)]
        pub fn feed_pet(&mut self) -> Result<(), String> {
            let caller = self.env().caller();
            let mut pet = self
                .pets
                .get(caller)
                .ok_or("Pet does not exist. Create one first.")?;

            pet.energy = 100;
            self.pets.insert(caller, &pet);

            self.env().emit_event(PetFed {
                owner: caller,
                energy: pet.energy,
            });

            Ok(())
        }

        #[ink(message)]
        pub fn update_pet_mood(&mut self, new_mood: String) -> Result<(), String> {
            let caller = self.env().caller();
            let mut pet = self
                .pets
                .get(caller)
                .ok_or("Pet does not exist. Create one first.")?;

            pet.mood = new_mood.clone();
            self.pets.insert(caller, &pet);

            self.env().emit_event(PetMoodChanged {
                owner: caller,
                mood: new_mood,
            });

            Ok(())
        }

        #[ink(message)]
        pub fn level_up(&mut self) -> Result<(), String> {
            let caller = self.env().caller();
            let mut pet = self
                .pets
                .get(caller)
                .ok_or("Pet does not exist. Create one first.")?;

            if pet.level >= 10 {
                return Err("Your pet is already at the maximum level.".into());
            }

            pet.level = pet.level.checked_add(1).ok_or("Level overflow")?;
            self.pets.insert(caller, &pet);

            self.env().emit_event(PetLeveledUp {
                owner: caller,
                level: pet.level,
            });

            Ok(())
        }

        #[ink(message)]
        pub fn get_pet_count(&self) -> u32 {
            self.pet_count
        }

        fn generate_rarity_and_traits(timestamp: u64) -> (String, Vec<String>) {
            let rand = timestamp % 100;
            if rand < 60 {
                ("Common".into(), vec![])
            } else if rand < 90 {
                ("Rare".into(), vec!["Flying".into()])
            } else {
                ("Epic".into(), vec!["Flying".into(), "Swimming".into()])
            }
        }
    }
}
