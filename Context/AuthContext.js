// context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { AsyncStorage } from 'react-native'; // Usamos AsyncStorage para la persistencia

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Para manejar la carga inicial
  const [error, setError] = useState(null); // Para manejar los errores de autenticación



  // Función para cargar los datos de usuario persistidos (si existen)
  useEffect(() => {
    const loadUser = async () => {

      try {

        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser)); // Si existe, seteamos el usuario
        }
      } 
      catch (err) {
        console.error("Error al cargar el usuario:", err);
      } 
      finally {
        setLoading(false); // Terminamos la carga
      }
    };

    loadUser();
  }, []);





  const login = async (userData) => {

    try 
    {
      setLoading(true); // Mientras estamos autenticando, mostramos el loading
      setError(null); // Limpiamos cualquier error anterior

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

  // Función para cerrar sesión
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user'); // Eliminamos el usuario del almacenamiento
      setUser(null); // Limpiamos el estado del usuario
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
