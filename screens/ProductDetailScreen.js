import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

export default function ProductDetailScreen({ route }) {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductDetail();
  }, [productId]);

  const fetchProductDetail = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
      const data = await response.json();

      setProduct(data);
      setLoading(false);

    } catch (err) {
      console.error('Error al obtener el detalle del producto', err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Cargando productos...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error al cargar el producto.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImage} />

      <View style={styles.card}>
        <Text style={styles.productTitle}>{product.title}</Text>
        <Text style={styles.productPrice}>us${product.price}</Text>
        {/* Agregar categoría aquí */}
        <Text style={styles.productCategory}>Categoría: {product.category}</Text>
      </View>

      <View style={styles.descriptionCard}>
        <Text style={styles.sectionTitle}>Descripción</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
      </View>

    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
    alignItems: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  errorText: {
    fontSize: 18,
    color: '#ff0000',
    fontWeight: 'bold',
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 55,
    marginBottom: 20,
    resizeMode: 'contain', // Se asegura que la imagen no se distorsione
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,  
    borderRadius: 15, 
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,  
    marginBottom: 10,  
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 30,
    color: '#00A859',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,  // Espaciado entre precio y categoría
  },
  productCategory: {
    fontSize: 18,
    color: '#777',
    marginTop: 10,
    textAlign: 'center',
  },
  descriptionCard: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    marginTop: 20,  // Un poco de separación entre la descripción y otros elementos
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    textAlign: 'justify',
  },
});
