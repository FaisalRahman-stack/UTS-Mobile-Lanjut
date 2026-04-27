import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useFavoriteStore from '../store/useFavoriteStore';

export default function FavoritesScreen({ navigation }) {
  const { favorites, removeFavorite } = useFavoriteStore();

  if (favorites.length === 0) {
    return (
      <View style={styles.center}>
        <Ionicons name="heart-dislike-outline" size={80} color="#ccc" />
        <Text style={styles.emptyText}>Belum ada resep favorit.</Text>
        <Text style={styles.emptySubText}>Tambahkan resep yang kamu suka di detail resep.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.idMeal}
        contentContainerStyle={{ padding: 15 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity 
              style={styles.infoRow}
              onPress={() => navigation.navigate('Detail', { mealId: item.idMeal })}
              activeOpacity={0.7}
            >
              <Image source={{ uri: item.strMealThumb }} style={styles.image} />
              <Text style={styles.title} numberOfLines={2}>{item.strMeal}</Text>
            </TouchableOpacity>
            {/* Tombol Hapus pakai Ikon Sampah */}
            <TouchableOpacity onPress={() => removeFavorite(item.idMeal)} style={styles.deleteBtn}>
              <Ionicons name="trash-outline" size={22} color="#FF6B6B" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30 },
  emptyText: { fontSize: 18, fontWeight: 'bold', color: '#636E72', marginTop: 20 },
  emptySubText: { fontSize: 14, color: '#b2bec3', textAlign: 'center', marginTop: 10 },
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
  infoRow: { flexDirection: 'row', flex: 1, alignItems: 'center' },
  image: { width: 55, height: 55, borderRadius: 10, backgroundColor: '#eee' },
  title: { marginLeft: 15, fontSize: 15, fontWeight: '500', flex: 1, color: '#2D3436', paddingRight: 10 },
  deleteBtn: { padding: 10, marginLeft: 5 }
});