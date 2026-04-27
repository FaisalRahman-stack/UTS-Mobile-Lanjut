import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

export default function SearchScreen({ navigation }) {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = () => {
    if (keyword.trim() === '') {
      setErrorMsg('Input tidak boleh kosong');
      setResults([]);
      return;
    }
    if (keyword.trim().length < 3) {
      setErrorMsg('Minimum pencarian 3 karakter');
      setResults([]);
      return;
    }

    setErrorMsg('');
    axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`)
      .then(response => {
        const meals = response.data.meals || [];
        setResults(meals);
        if (meals.length === 0) setErrorMsg('Resep tidak ditemukan.');
      })
      .catch(() => alert('Gagal memuat data'));
  };

  return (
    <View style={styles.container}>
      {/* Search Input bergaya Modern dengan Ikon */}
      <View style={styles.searchSection}>
        <Ionicons style={styles.searchIcon} name="search-outline" size={20} color="gray" />
        <TextInput
          style={styles.input}
          placeholder="Cari nama resep..."
          value={keyword}
          onChangeText={(text) => { setKeyword(text); if(text==='') setResults([]); }}
          returnKeyType="search"
          onSubmitEditing={handleSearch} // Enter di keyboard buat cari
        />
        {keyword.length > 0 && (
           <TouchableOpacity onPress={() => {setKeyword(''); setResults([]); setErrorMsg('');}}>
             <Ionicons name="close-circle" size={20} color="#ccc" style={{marginRight: 10}}/>
           </TouchableOpacity>
        )}
      </View>
      
      {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
      
      <FlatList
        style={{ marginTop: 10 }}
        data={results}
        keyExtractor={(item) => item.idMeal}
        contentContainerStyle={{paddingBottom: 20}}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => navigation.navigate('Detail', { mealId: item.idMeal })}
            activeOpacity={0.7}
          >
            <Image source={{ uri: item.strMealThumb }} style={styles.image} />
            <Text style={styles.title}>{item.strMeal}</Text>
            <Ionicons name="chevron-forward" size={18} color="#ccc" style={{marginLeft: 'auto'}} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#F8F9FA' },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 25,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    marginBottom: 5,
  },
  searchIcon: { padding: 10, marginLeft: 5 },
  input: { flex: 1, paddingVertical: 12, paddingRight: 10, color: '#424242', fontSize: 16 },
  errorText: { color: '#FF6B6B', textAlign: 'center', marginTop: 15, fontWeight: '500' },
  card: { 
    flexDirection: 'row', 
    backgroundColor: '#fff', 
    padding: 10, 
    marginBottom: 10, 
    borderRadius: 10, 
    alignItems: 'center',
    elevation: 1,
  },
  image: { width: 50, height: 50, borderRadius: 8, backgroundColor: '#eee' },
  title: { marginLeft: 15, fontSize: 15, fontWeight: '500', color: '#2D3436', flex: 1, paddingRight: 5 }
});