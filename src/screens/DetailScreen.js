import axios from 'axios';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import useFavoriteStore from '../store/useFavoriteStore';

export default function DetailScreen({ route }) {
  const { mealId } = route.params;
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Zustand state
  const { favorites, addFavorite, removeFavorite } = useFavoriteStore();
  const isFavorite = favorites.some((item) => item.idMeal === mealId);

  useEffect(() => {
    axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then(response => setMeal(response.data.meals[0]))
      .catch(() => alert('Gagal memuat data'))
      .finally(() => setLoading(false));
  }, [mealId]);

  if (loading) return <ActivityIndicator size="large" style={styles.center} />;
  if (!meal) return <Text style={styles.center}>Data tidak ditemukan</Text>;

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(meal.idMeal);
    } else {
      addFavorite(meal);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
      {/* Kriteria C.1: Menampilkan minimal 5 field data */}
      <Text style={styles.title}>{meal.strMeal}</Text>
      <Text style={styles.subtitle}>Kategori: {meal.strCategory}</Text>
      <Text style={styles.subtitle}>Area: {meal.strArea}</Text>
      <Text style={styles.subtitle}>Tags: {meal.strTags || '-'}</Text>
      
      <View style={styles.buttonContainer}>
        <Button 
          title={isFavorite ? "Hapus dari Favorit" : "Tambah ke Favorit"} 
          color={isFavorite ? "red" : "green"}
          onPress={toggleFavorite} 
        />
      </View>

      <Text style={styles.sectionTitle}>Instruksi:</Text>
      <Text style={styles.instructions}>{meal.strInstructions}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: '100%', height: 250 },
  title: { fontSize: 24, fontWeight: 'bold', padding: 15 },
  subtitle: { fontSize: 16, paddingHorizontal: 15, color: '#555' },
  buttonContainer: { margin: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', paddingHorizontal: 15, marginTop: 10 },
  instructions: { padding: 15, lineHeight: 22, textAlign: 'justify' }
});