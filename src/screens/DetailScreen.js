import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useFavoriteStore from '../store/useFavoriteStore';

export default function DetailScreen({ route }) {
  const { mealId } = route.params;
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const { favorites, addFavorite, removeFavorite } = useFavoriteStore();
  const isFavorite = favorites.some((item) => item.idMeal === mealId);

  useEffect(() => {
    axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then(response => setMeal(response.data.meals[0]))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [mealId]);

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color="#FF6B6B" /></View>;
  if (!meal) return <Text style={styles.center}>Data tidak ditemukan</Text>;

  const toggleFavorite = () => {
    if (isFavorite) { removeFavorite(meal.idMeal); } 
    else { addFavorite(meal); }
  };

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`] && meal[`strIngredient${i}`].trim() !== "") {
      ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
    }
  }

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.container} bounces={false}>
        <Image source={{ uri: meal.strMealThumb }} style={styles.heroImage} />
        
        <View style={styles.contentCard}>
          <Text style={styles.title}>{meal.strMeal}</Text>
          
          <View style={styles.badgeContainer}>
            <View style={[styles.badge, { backgroundColor: '#E1F5FE' }]}>
              <Ionicons name="pricetag-outline" size={14} color="#0277BD" />
              <Text style={[styles.badgeText, { color: '#0277BD' }]}>{meal.strCategory}</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: '#E8F5E9' }]}>
              <Ionicons name="earth-outline" size={14} color="#2E7D32" />
              <Text style={[styles.badgeText, { color: '#2E7D32' }]}>{meal.strArea}</Text>
            </View>
            {meal.strTags && (
              <View style={[styles.badge, { backgroundColor: '#FFFDE7' }]}>
                <Ionicons name="bookmark-outline" size={14} color="#F9A825" />
                <Text style={[styles.badgeText, { color: '#F9A825' }]}>{meal.strTags.split(',')[0]}</Text>
              </View>
            )}
          </View>

          <View style={styles.separator} />

          <Text style={styles.sectionTitle}>Bahan-bahan</Text>
          <View style={styles.ingredientsContainer}>
            {ingredients.map((item, index) => (
              <View key={index} style={styles.ingredientRow}>
                <Ionicons name="ellipse" size={8} color="#FF6B6B" style={styles.bulletIcon} />
                <Text style={styles.ingredientText}>{item}</Text>
              </View>
            ))}
          </View>

          <View style={styles.separator} />
          
          <Text style={styles.sectionTitle}>Instruksi Memasak</Text>
          <Text style={styles.instructions}>
            {meal.strInstructions.replace(/\r\n/g, '\n\n')}
          </Text>
        </View>
      </ScrollView>

      <TouchableOpacity 
        style={[styles.fab, { backgroundColor: isFavorite ? '#FF6B6B' : '#FFFFFF' }]} 
        onPress={toggleFavorite}
        activeOpacity={0.9}
      >
        <Ionicons 
          name={isFavorite ? "heart" : "heart-outline"} 
          size={28} 
          color={isFavorite ? "#FFFFFF" : "#FF6B6B"} 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#F8F9FA' },
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  heroImage: { width: '100%', height: 280 },
  contentCard: { 
    backgroundColor: '#fff', 
    marginTop: -30, 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    padding: 25, 
    paddingBottom: 100, 
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  title: { fontSize: 24, fontWeight: 'bold', color: '#2D3436', marginBottom: 15 },
  badgeContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginRight: 8, marginBottom: 8 },
  badgeText: { fontSize: 13, fontWeight: '600', marginLeft: 5 },
  separator: { height: 1, backgroundColor: '#eee', marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#2D3436', marginBottom: 12 },
  ingredientsContainer: { marginBottom: 10 },
  ingredientRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
  bulletIcon: { marginTop: 6, marginRight: 10 },
  ingredientText: { fontSize: 15, color: '#444', flex: 1, lineHeight: 22 },
  instructions: { fontSize: 15, color: '#444', lineHeight: 26, textAlign: 'justify' },
  fab: {
    position: 'absolute',
    right: 25,
    top: 250, 
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#eee'
  }
});