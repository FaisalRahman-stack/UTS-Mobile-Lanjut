import { Image, StyleSheet, Text, View } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }} 
        style={styles.avatar} 
      />
      <Text style={styles.name}>Ana</Text>
      <Text style={styles.detail}>NIM: 2110512001 (Silakan ganti)</Text>
      <Text style={styles.detail}>Kelas: D3 Sistem Informasi</Text>
      <Text style={styles.detail}>Kampus: UPN Veteran Jakarta</Text>
      
      <View style={styles.themeContainer}>
        <Text style={styles.themeTitle}>Tema Pengerjaan:</Text>
        <Text style={styles.detail}>Tema A - ResepKita (Katalog Kuliner)</Text>
      </View>

      <Text style={styles.credit}>Credit API: TheMealDB (www.themealdb.com)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 50, paddingHorizontal: 20 },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 20 },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
  detail: { fontSize: 16, color: '#444', marginBottom: 5 },
  themeContainer: { marginTop: 30, padding: 15, backgroundColor: '#e0e0e0', borderRadius: 8, width: '100%', alignItems: 'center' },
  themeTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
  credit: { marginTop: 'auto', marginBottom: 30, color: 'gray', fontStyle: 'italic' }
});