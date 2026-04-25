import axios from 'axios';
import { useState } from 'react';
import { Button, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SearchScreen({ navigation }) {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = () => {
    // Kriteria C.5: Validasi Client-side
    if (keyword.trim() === '') {
      setErrorMsg('Input tidak boleh kosong');
      return;
    }
    if (keyword.trim().length < 3) {
      setErrorMsg('Minimum pencarian 3 karakter');
      return;
    }

    setErrorMsg(''); 
    axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`)
      .then(response => setResults(response.data.meals || []))
      .catch(() => alert('Gagal memuat data'));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Cari nama resep..."
        value={keyword}
        onChangeText={setKeyword}
      />
      {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
      
      <Button title="Cari Resep" onPress={handleSearch} />

      <FlatList
        style={{ marginTop: 20 }}
        data={results}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => navigation.navigate('Detail', { mealId: item.idMeal })}
          >
            <Image source={{ uri: item.strMealThumb }} style={styles.image} />
            <Text style={styles.title}>{item.strMeal}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5 },
  errorText: { color: 'red', marginBottom: 10, marginTop: 5 },
  card: { flexDirection: 'row', backgroundColor: '#fff', padding: 10, marginBottom: 10, borderRadius: 8 },
  image: { width: 50, height: 50, borderRadius: 25 },
  title: { marginLeft: 15, alignSelf: 'center', fontSize: 16 }
});