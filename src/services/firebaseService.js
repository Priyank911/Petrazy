import { auth } from '../firebase';

export const firebaseService = {
    isLoggedIn: () => !!auth.currentUser,
    getCurrentUser: () => auth.currentUser,
    async register(email, password) {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            return true
        } catch (error){
            throw error;
        }

    },
    async login(email, password) {
        try {
           await signInWithEmailAndPassword(auth, email, password);
           return true;
        } catch (error) {
           throw error;
        }

    },
    async logout() {
        try {
           await signOut(auth);
            return true;
        } catch (error) {
            throw error
        }

    }
}