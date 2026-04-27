import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

export default function BrowseScreen({ route, navigation }) {
  const { category } = route.params;
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then(response => setMeals(response.data.meals))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [category]);

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color="#FF6B6B" /></View>;

  return (
    <View style={styles.container}>
      <FlatList
        data={meals}
        keyExtractor={(item) => item.idMeal}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => navigation.navigate('Detail', { mealId: item.idMeal })}
            activeOpacity={0.7}
          >
            <Image source={{ uri: item.strMealThumb }} style={styles.image} />
            <Text style={styles.title} numberOfLines={2}>{item.strMeal}</Text>
            <Ionicons name="chevron-forward" size={20} color="#ccc" style={styles.icon} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  listContent: { padding: 15 },
  card: { 
    flexDirection: 'row', 
    backgroundColor: '#fff', 
    padding: 12, 
    marginBottom: 12, 
    borderRadius: 12, 
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  image: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#eee' },
  title: { fontSize: 16, fontWeight: '500', marginLeft: 15, flex: 1, color: '#2D3436', paddingRight: 10 },
  icon: { marginLeft: 'auto' }
});