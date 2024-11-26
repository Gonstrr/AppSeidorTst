import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet, Image, Alert, ImageBackground } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function ProductListScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLogout = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro de que deseas cerrar sesión?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Cerrar sesión",
          onPress: () => {
            navigation.navigate("Login"); 
          },
        },
      ],
      { cancelable: false }
    );
  };

  
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {

      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
      setLoading(false);

    } 
    catch (err) {
      setError('Error al cargar los productos');
      setLoading(false);

    }
  };

  const renderItem = ({ item, index }) => (
    <Animatable.View
      animation="fadeInUp" delay={index * 100} style={styles.productContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
        style={styles.productCard}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>{item.title}</Text>
          <View style={styles.priceCategoryContainer}>
            <Text style={styles.productPrice}>${item.price}</Text>
            <Text style={styles.productCategory}>{item.category}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );

  if (loading) {
    return (
      <ImageBackground
        source={require('../assets/copos.jpg')}
        style={styles.background}
      >
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#00A859" />
          <Text style={styles.loadingText}>Cargando productos...</Text>
        </View>
      </ImageBackground>
    );
  }

  if (error) {
    return (
      <ImageBackground
        source={require('../assets/copos.jpg')} 
        style={styles.background}
      >
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/copos.jpg')} 
      style={styles.background}
    >
      <View style={styles.container}>
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
        />
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
    backgroundColor: 'rgba(0, 10, 0, 0.4)', 
    paddingHorizontal: 25,
    paddingTop: 40,
  },
  listContent: {
    paddingBottom: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 40,
    fontSize: 18,
    color: '#ffffff',
  },
  errorText: {
    fontSize: 18,
    color: '#ff0000',
    fontWeight: 'bold',
  },
  productContainer: {
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  productCard: {
    paddingTop: 20,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  productImage: {
    width: '100%',
    height: 180,
    resizeMode: 'contain', 
  },
  productInfo: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 25,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 26,
    color: '#00A859',
    fontWeight: '600',
    marginTop: 5,
  },

  priceCategoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  productCategory: {
    fontSize: 14,
    color: '#777',
    marginLeft: 50, 
    fontStyle: 'italic',
  },
  logoutButton: {
    fontSize: 16,
    color: '#FF4C4C',
    marginRight: 15,
  },
});
