import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import ProductListScreen from '../screens/ProductListScreen';  // Pantalla de lista de productos
import ProductDetailScreen from '../screens/ProductDetailScreen';  // Pantalla de detalles de productos

const Stack = createNativeStackNavigator();

export default function AppNavigator() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Este useEffect simula la verificación del estado de autenticación.
    // Por ejemplo, podrías revisar un token almacenado en AsyncStorage.
    const checkAuth = async () => {
      // Simula una llamada de API o consulta a almacenamiento local para saber si el usuario está autenticado
      const token = null;  // Cambia esto para probar la autenticación
      setIsAuthenticated(!!token);
    };
    checkAuth();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#00A859' }, // Fondo verde para todos los encabezados
          headerTintColor: '#fff', // Texto blanco
          headerTitleStyle: { fontWeight: 'bold' }, // Titulo en negrita
        }}
      >
        {isAuthenticated ? (
          <>
            <Stack.Screen
              name="ProductList"
              component={ProductListScreen}
              options={{ title: 'Lista de Productos' }}
            />
            <Stack.Screen
              name="ProductDetail"
              component={ProductDetailScreen}
              options={{ title: 'Detalles del Producto' }}
            />
          </>
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }} // No mostrar encabezado en la pantalla de login
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
