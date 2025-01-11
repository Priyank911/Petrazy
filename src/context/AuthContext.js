import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useLocalStorage('loggedInUser', null);
    const [isLoggedIn, setIsLoggedIn] = useState(!!loggedInUser);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoggedInUser({ uid: user.uid, email: user.email });
          setIsLoggedIn(true)
        } else {
          setLoggedInUser(null);
          setIsLoggedIn(false)
        }
        setLoading(false);

      });
      return () => unsubscribe();
    }, [setLoggedInUser]);


    const register = async (email, password) => {
      setLoading(true)
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            setLoggedInUser({uid: user.uid, email: user.email});
            setIsLoggedIn(true)
        } catch (error) {
           throw error;
        } finally {
          setLoading(false);
        }
    };

    const login = async (email, password) => {
      setLoading(true);
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        setLoggedInUser({ uid: user.uid, email: user.email });
        setIsLoggedIn(true)
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }

    };

    const logout = async () => {
      setLoading(true)
        try {
           await signOut(auth);
           setLoggedInUser(null);
           setIsLoggedIn(false)
        } catch (error){
            throw error;
        } finally {
          setLoading(false);
        }
    };


    return (
        <AuthContext.Provider value={{ loggedInUser, isLoggedIn, loading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};