import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, RefreshControl, StyleSheet, Image, Dimensions } from 'react-native';
import axios from 'axios';

const { width } = Dimensions.get('window');
const cardWidth = (width - 40) / 2; // Hitung lebar untuk 2 kolom

export default function HomeScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
      setCategories(response.data.categories);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchCategories();
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color="#FF6B6B" /></View>;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Jelajahi Kategori Kuliner</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.idCategory}
        numColumns={2} // Bikin jadi GRID 2 KOLOM
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FF6B6B" />}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => navigation.navigate('Browse', { category: item.strCategory })}
            activeOpacity={0.8}
          >
            <Image source={{ uri: item.strCategoryThumb }} style={styles.image} resizeMode="cover" />
            <View style={styles.textContainer}>
              <Text style={styles.title} numberOfLines={1}>{item.strCategory}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#2D3436', paddingHorizontal: 15, marginTop: 20, marginBottom: 10 },
  listContent: { paddingHorizontal: 10, paddingBottom: 20 },
  card: { 
    backgroundColor: '#fff', 
    width: cardWidth, 
    margin: 5, 
    borderRadius: 15, 
    overflow: 'hidden', 
    elevation: 3, // Shadow Android
    shadowColor: '#000', // Shadow iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: { width: '100%', height: 120 },
  textContainer: { padding: 12, alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 16, fontWeight: '600', color: '#2D3436' }
});