import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons'; // Import Ikon

// Import Screens
import HomeScreen from './src/screens/HomeScreen';
import BrowseScreen from './src/screens/BrowseScreen';
import DetailScreen from './src/screens/DetailScreen';
import SearchScreen from './src/screens/SearchScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import AboutScreen from './src/screens/AboutScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tema Warna Utama
const COLORS = {
  primary: '#FF6B6B', // Coral Red
  accent: '#FFD93D', // Yellow Accent
  bg: '#F8F9FA',      // Light Gray BG
  text: '#2D3436',    // Dark Text
  white: '#FFFFFF',
};

// Styling Header Stack Navigator
const screenOptionsStack = {
  headerStyle: { backgroundColor: COLORS.primary },
  headerTintColor: COLORS.white,
  headerTitleStyle: { fontWeight: 'bold' },
  headerShadowVisible: false, // Clean header
};

// Stack untuk alur Home -> Browse -> Detail
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={screenOptionsStack}>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'ResepKita' }} />
      <Stack.Screen name="Browse" component={BrowseScreen} options={({ route }) => ({ title: route.params.category })} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Detail Resep' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // Header styling untuk screen yang bukan stack
          ...screenOptionsStack,
          
          // Styling Tab Bar Bawah
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { height: 60, paddingBottom: 10, paddingTop: 5, backgroundColor: COLORS.white, borderTopWidth: 0, elevation: 5 },
          tabBarLabelStyle: { fontSize: 12, fontWeight: '500' },
          
          // Logika Menampilkan Ikon
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Beranda') { iconName = focused ? 'restaurant' : 'restaurant-outline'; } 
            else if (route.name === 'Cari') { iconName = focused ? 'search' : 'search-outline'; } 
            else if (route.name === 'Favorit') { iconName = focused ? 'heart' : 'heart-outline'; } 
            else if (route.name === 'Tentang') { iconName = focused ? 'person-circle' : 'person-circle-outline'; }
            return <Ionicons name={iconName} size={focused ? 26 : 22} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Beranda" component={HomeStack} options={{ headerShown: false }} />
        <Tab.Screen name="Cari" component={SearchScreen} options={{ title: 'Cari Resep' }} />
        <Tab.Screen name="Favorit" component={FavoritesScreen} options={{ title: 'Resep Favorit' }} />
        <Tab.Screen name="Tentang" component={AboutScreen} options={{ title: 'Profil Saya' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}