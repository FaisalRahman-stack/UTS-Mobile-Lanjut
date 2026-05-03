import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import AboutScreen from './src/screens/AboutScreen';
import BrowseScreen from './src/screens/BrowseScreen';
import DetailScreen from './src/screens/DetailScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const COLORS = {
  primary: '#FF6B6B',
  accent: '#FFD93D',
  bg: '#F8F9FA',
  text: '#2D3436',
  white: '#FFFFFF',
};

const screenOptionsStack = {
  headerStyle: { backgroundColor: COLORS.primary },
  headerTintColor: COLORS.white,
  headerTitleStyle: { fontWeight: 'bold' },
  headerShadowVisible: false,
};

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={screenOptionsStack}>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'ResepKita' }} />
      <Stack.Screen name="Browse" component={BrowseScreen} options={({ route }) => ({ title: route.params.category })} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Detail Resep' }} />
    </Stack.Navigator>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator screenOptions={screenOptionsStack}>
      <Stack.Screen name="SearchMain" component={SearchScreen} options={{ title: 'Cari Resep' }} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Detail Resep' }} />
    </Stack.Navigator>
  );
}

function FavoritesStack() {
  return (
    <Stack.Navigator screenOptions={screenOptionsStack}>
      <Stack.Screen name="FavoritesMain" component={FavoritesScreen} options={{ title: 'Resep Favorit' }} />
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
          ...screenOptionsStack,
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { height: 60, paddingBottom: 10, paddingTop: 5, backgroundColor: COLORS.white, borderTopWidth: 0, elevation: 5 },
          tabBarLabelStyle: { fontSize: 12, fontWeight: '500' },
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
        <Tab.Screen name="Cari" component={SearchStack} options={{ headerShown: false, title: 'Cari Resep' }} />
        <Tab.Screen name="Favorit" component={FavoritesStack} options={{ headerShown: false, title: 'Resep Favorit' }} />
        <Tab.Screen name="Tentang" component={AboutScreen} options={{ title: 'Profil Saya' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}