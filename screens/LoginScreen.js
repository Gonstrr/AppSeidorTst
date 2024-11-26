import React, { useState, useRef } from 'react';
import { 
  View, 
  TextInput, 
  Button, 
  Text, 
  StyleSheet, 
  TouchableOpacity, // Agregamos TouchableOpacity
  ActivityIndicator, 
  ImageBackground, 
  Animated 
  
} from 'react-native';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  // Función para iniciar la animación de vibración


  const handleLogin = async () => {
    // Reiniciar estados
    setError(null);
    setLoading(true);

    // Validaciones básicas
    if (!username || !password) {
      setLoading(false);
      setError('Todos los campos son obligatorios.');
      triggerShake();
      return;
    }

    try {
      //post para login....
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      // Parsear la respuesta
      const data = await response.json();

      // Manejar diferentes escenarios de respuesta
      if (response.ok) {

        console.log('Login Exitoso:', data);

        //manejo de navegacion si el login es exitoso... 
        navigation.navigate('ProductList');
      } 
      else {
        // Manejar específicamente errores de credenciales
        setError('Credenciales incorrectas. Por favor, intenta de nuevo.');
        triggerShake();

      }

    } catch (err) {

      // Manejar errores de red o del servidor
      setError('Hubo un problema con la conexión. Intenta nuevamente.');
      triggerShake();
    } finally {
      // Siempre detener el loading, independientemente del resultado
      setLoading(false);
    }
  };

  // Función para limpiar errores mientras se escribe
  const handleTextChange = (setter) => (text) => {
    setter(text);
    if (error) setError(null);
  };

  return (
    <ImageBackground
      source={require('../assets/edificios.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Animated.View style={[styles.form, { transform: [{ translateX: shakeAnimation }] }]}>
          <Text style={styles.title}>Iniciar Sesión</Text>

          <TextInput
            style={[styles.input, error && styles.inputError]}
            placeholder="Usuario"
            value={username}
            onChangeText={handleTextChange(setUsername)}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TextInput
            style={[styles.input, error && styles.inputError]}
            placeholder="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={handleTextChange(setPassword)}
            autoCapitalize="none"
            autoCorrect={false}
          />

          {/* Botón de login o indicador de carga */}
          {loading ? (
            <ActivityIndicator size="large" color="#ffffff" />
          ) : (
            <TouchableOpacity 
              style={styles.loginButton} 
              onPress={handleLogin}
            >
              <Text style={styles.loginButtonText}>Ingresar</Text>
            </TouchableOpacity>
          )}

          {/* Mostrar errores si los hay */}
          {error && (
            <Text style={styles.error}>{error}</Text>
          )}
        </Animated.View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  form: {
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 2,
  },
  loginButton: {
    backgroundColor: '#0000ff',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    marginTop: 15,
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
  },
});