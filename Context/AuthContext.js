// context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { AsyncStorage } from 'react-native'; 

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const loadUser = async () => {
      try {

        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser)); 
        }
      } 
      catch (err) {
        console.error("Error al cargar el usuario:", err);
      } 
      finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);



  const login = async (userData) => {
    try 
    {
      setLoading(true); 
      setError(null); 
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData); 
    } 
    catch (err) {
      setError('Error de autenticación. Por favor, intentalo nuevamente.');
    } 
    finally {
      setLoading(false);
    }
  };


  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user'); 
      setUser(null); 
    } 
    catch (err) {

      console.log(err)
      console.error('Error al cerrar sesión:', err);

    }
  };

  return (
    <AuthContext.Provider value=
    {{ 
      user, 
      login, 
      logout, 
      loading, 
      error 
    }}>
      {children}
    
    </AuthContext.Provider>
  );
};
