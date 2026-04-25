import { Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useFavoriteStore from '../store/useFavoriteStore';

export default function FavoritesScreen({ navigation }) {
  const { favorites, removeFavorite } = useFavoriteStore();

  if (favorites.length === 0) {
    return <View style={styles.center}><Text>Belum ada resep favorit.</Text></View>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity 
              style={styles.infoRow}
              onPress={() => navigation.navigate('Detail', { mealId: item.idMeal })}
            >
              <Image source={{ uri: item.strMealThumb }} style={styles.image} />
              <Text style={styles.title}>{item.strMeal}</Text>
            </TouchableOpacity>
            <Button title="Hapus" color="red" onPress={() => removeFavorite(item.idMeal)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { flexDirection: 'row', backgroundColor: '#fff', padding: 10, marginBottom: 10, borderRadius: 8, alignItems: 'center', justifyContent: 'space-between' },
  infoRow: { flexDirection: 'row', flex: 1, alignItems: 'center' },
  image: { width: 50, height: 50, borderRadius: 25 },
  title: { marginLeft: 15, fontSize: 16, flex: 1 }
});