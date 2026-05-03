import { Ionicons } from '@expo/vector-icons';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.mainContainer} contentContainerStyle={styles.container}>
      
      {/* Bingkai Foto Profil */}
      <View style={styles.avatarContainer}>
        <Image 
          // Pastikan file faisal.jpg ada di folder /assets/
          source={require('../../assets/faisal.jpg')} 
          style={styles.avatar} 
        />
      </View>

      <Text style={styles.name}>Muhammad Faisal Rahman</Text>
      <Text style={styles.nim}>NIM: 2410501066</Text>
      
      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Ionicons name="school-outline" size={20} color="#FF6B6B" style={styles.infoIcon} />
          <Text style={styles.infoText}>D3 Sistem Informasi</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="business-outline" size={20} color="#FF6B6B" style={styles.infoIcon} />
          <Text style={styles.infoText}>UPN Veteran Jakarta</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="grid-outline" size={20} color="#FF6B6B" style={styles.infoIcon} />
          <Text style={styles.infoText}>Tema A - ResepKita</Text>
        </View>
      </View>

      <View style={styles.creditContainer}>
        <Text style={styles.creditTitle}>Aplikasi ini menggunakan data dari:</Text>
        <Text style={styles.creditLink}>TheMealDB API (www.themealdb.com)</Text>
        <Text style={styles.version}>Versi UTS 1.0</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#F8F9FA' },
  container: { alignItems: 'center', paddingTop: 40, paddingHorizontal: 25, paddingBottom: 30 },
  avatarContainer: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 4,
    borderColor: '#FF6B6B', // Warna Utama
    padding: 3,
    backgroundColor: '#fff',
    elevation: 10,
    shadowColor: '#FF6B6B',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    marginBottom: 20,
  },
  avatar: { width: '100%', height: '100%', borderRadius: 65 },
  name: { fontSize: 24, fontWeight: 'bold', color: '#2D3436', marginBottom: 5, textAlign: 'center' },
  nim: { fontSize: 16, color: 'gray', marginBottom: 30, fontWeight: '500' },
  infoCard: { 
    backgroundColor: '#fff', 
    width: '100%', 
    borderRadius: 15, 
    padding: 20, 
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    marginBottom: 40,
  },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  infoIcon: { width: 30 },
  infoText: { fontSize: 16, color: '#444', fontWeight: '500' },
  creditContainer: { marginTop: 'auto', alignItems: 'center', width: '100%' },
  creditTitle: { fontSize: 14, color: 'gray', marginBottom: 5 },
  creditLink: { fontSize: 14, color: '#FF6B6B', fontWeight: 'bold', fontStyle: 'italic', marginBottom: 15 },
  version: { fontSize: 12, color: '#ccc' }
});