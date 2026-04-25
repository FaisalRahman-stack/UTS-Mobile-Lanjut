import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import Screens
import AboutScreen from './src/screens/AboutScreen';
import BrowseScreen from './src/screens/BrowseScreen';
import DetailScreen from './src/screens/DetailScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Stack untuk alur Home -> Browse -> Detail
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Kategori Resep' }} />
      <Stack.Screen name="Browse" component={BrowseScreen} options={({ route }) => ({ title: route.params.category })} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Detail Resep' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false, tabBarIconStyle: { display: "none" }, tabBarLabelPosition: "beside-icon" }}>
        <Tab.Screen name="Beranda" component={HomeStack} />
        <Tab.Screen name="Cari" component={SearchScreen} options={{ headerShown: true, title: 'Cari Resep' }} />
        <Tab.Screen name="Favorit" component={FavoritesScreen} options={{ headerShown: true, title: 'Resep Favorit' }} />
        <Tab.Screen name="Tentang" component={AboutScreen} options={{ headerShown: true, title: 'Profil' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}