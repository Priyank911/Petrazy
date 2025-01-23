# Petrazy: Your Digital Pet Ecosystem on Vara

Welcome to Petrazy, a digital pet ecosystem built on the Vara network! This project allows you to own, care for, and interact with unique digital pets, leveraging the power of blockchain technology. Imagine a Tamagotchi-like experience where every interaction is a gas-free transaction on Vara, and your pet can even react to real-world events.

## Getting Started

This project is still under development. To contribute to this project, fork this repository, work on a feature and create a pull request. 

### Technologies Used

-   **React:** For the user interface.
-   **Rust:** For the Vara Smart Contract.
-   **Vara Network:** The blockchain providing gas-free transactions.
-   **Polkadot:** For managing user accounts.
-   **Oracle:** For fetching real-world data.

## Scenario: Meet Luna, Your Digital Pet

Let's dive into a quick scenario to understand how Petrazy works:

**Getting Started: Creating Luna**

1.  **You:** Open the Petrazy app.
2.  **The App:** Connects to your Polkadot account (your digital wallet for the Vara network).
3.  **Smart Contract:** The app talks to the smart contract on Vara, which governs the rules for our digital pets.
4.  **Creation Process:** You name your pet "Luna" and click "Create."
5.  **Smart Contract Magic:** A new digital pet named Luna is created and linked to your account. She starts with basic attributes like 100 energy and a "Happy" mood. Luna now exists on Vara as a unique digital token.

**Interacting with Luna: Daily Care**

1.  **Visualizing Luna:** On the app, you see Luna with an energy bar and mood indicator.
2.  **Feeding Luna:** Luna's energy decreases over time. You click "Feed."
3.  **Smart Contract Update:** The app sends a message to the smart contract to restore Luna's energy to 100. This is a free transaction on Vara.
4.  **UI Update:** The app reflects Luna's full energy bar.

**Real-World Influences: A Rainy Day**

1.  **Weather Oracle:** The app connects to a weather service that checks your city's weather.
2.  **Rainy Day:** The oracle sees that it's raining.
3.  **Smart Contract Notification:** The app automatically sends this information to the smart contract.
4.  **Luna's Mood:** Luna's mood is automatically adjusted to "Gloomy."
5.  **UI Update:** You see Luna's mood indicator has changed.
6.  **Manual Override:** You can also manually change the mood of Luna, by entering into a text box and clicking "change mood".
7.  **Progression:** You interact with Luna daily. Over time you see that Luna levels up and unlocks more attributes and interactions.

## Key Concepts Explained

-   **Digital Pet (NFT):** Luna is a unique digital asset (like a collectible) with interactive attributes that can evolve.
-   **Smart Contract:** The "brain" of the game, managing pet ownership, behavior, and attribute changes. This lives on the Vara network.
-   **Micro-Interactions:** Feeding, changing moods, etc., are small actions that update Luna's attributes through free interactions with the smart contract.
-   **Gas-Free Transactions:** Vara allows you to make these frequent changes without any transaction fees.
-   **Real-World Data (Oracle):** Weather information automatically influences Luna's behavior and mood.
-   **React App:** The user interface you see and interact with.
-   **Polkadot Account:** Your digital wallet needed to interact with the app and own pets.

## Project Goals

-   **Create Pets:** Allow users to create unique digital pets on the Vara network.
-   **Interact:** Enable users to feed pets, change their moods, and play with them.
-   **Real-Time Effects:**  Make pets respond to real-world data like weather.
-   **Evolve:** Enable pets to level up and unlock new traits through interaction.
-   **Gas-Free:** Provide a seamless user experience with gas-free transactions.

## Running the Project

-   `npm install` or `yarn install` to install the required dependencies.
-   `npm start` or `yarn start` to start the application
-  For the contracts related code, please refer to the `/contracts` directory.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the [Specify License (e.g., MIT License)].

## Contact

petrazyissike@gmail.com