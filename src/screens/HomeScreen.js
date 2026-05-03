import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');
const cardWidth = (width - 40) / 2;

export default function HomeScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(''); // State untuk menyimpan error

  const fetchCategories = async () => {
    setError(''); // Bersihkan error setiap kali mencoba fetch
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
      setCategories(response.data.categories);
    } catch (err) {
      // Jika internet mati atau server down, tangkap errornya ke sini
      setError('Gagal memuat data. Periksa koneksi internet Anda.');
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

  // TAMPILAN LOADING AWAL
  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color="#FF6B6B" /></View>;

  // TAMPILAN ERROR HANDLING (JIKA INTERNET MATI)
  if (error) {
    return (
      <View style={styles.center}>
        <Ionicons name="wifi-outline" size={80} color="#ccc" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={() => { setLoading(true); fetchCategories(); }}>
          <Text style={styles.retryBtnText}>Coba Lagi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // TAMPILAN NORMAL JIKA BERHASIL FETCH
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Jelajahi Kategori Kuliner</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.idCategory}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        // INI ADALAH FITUR PULL-TO-REFRESH
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh} 
            tintColor="#FF6B6B" 
            colors={['#FF6B6B']} 
          />
        }
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
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#2D3436', paddingHorizontal: 15, marginTop: 20, marginBottom: 10 },
  listContent: { paddingHorizontal: 10, paddingBottom: 20 },
  card: { 
    backgroundColor: '#fff', 
    width: cardWidth, 
    margin: 5, 
    borderRadius: 15, 
    overflow: 'hidden', 
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: { width: '100%', height: 120 },
  textContainer: { padding: 12, alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 16, fontWeight: '600', color: '#2D3436' },
  // Styling untuk Error
  errorText: { fontSize: 16, color: '#FF6B6B', textAlign: 'center', marginTop: 15, marginBottom: 20, fontWeight: '500' },
  retryBtn: { backgroundColor: '#FF6B6B', paddingHorizontal: 25, paddingVertical: 12, borderRadius: 25 },
  retryBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});