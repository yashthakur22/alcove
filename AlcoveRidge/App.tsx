import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const Stack = createStackNavigator();

// Login Screen
const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'test' && password === 'password') {
      navigation.navigate('Events');
    } else {
      Alert.alert('Error', 'Invalid credentials. Use test/password to login.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Financial Events App</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

// Events Screen
const events = [
  { id: '1', name: 'Investment Workshop', date: '2023-09-15', location: 'Financial District', image: 'https://picsum.photos/200' },
  { id: '2', name: 'Stock Market Seminar', date: '2023-09-20', location: 'Downtown Conference Center', image: 'https://picsum.photos/201' },
  { id: '3', name: 'Crypto Trends 2023', date: '2023-09-25', location: 'Tech Hub', image: 'https://picsum.photos/202' },
  { id: '4', name: 'Personal Finance Mastery', date: '2023-10-01', location: 'Community College', image: 'https://picsum.photos/203' },
  { id: '5', name: 'Real Estate Investment Forum', date: '2023-10-05', location: 'Grand Hotel', image: 'https://picsum.photos/204' },
];

const EventCard = ({ event }) => (
  <View style={styles.card}>
    <Image source={{ uri: event.image }} style={styles.image} />
    <View style={styles.cardContent}>
      <Text style={styles.eventName}>{event.name}</Text>
      <Text style={styles.eventDetails}>{event.date}</Text>
      <Text style={styles.eventDetails}>{event.location}</Text>
    </View>
  </View>
);

const EventsScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        renderItem={({ item }) => <EventCard event={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

// Main App component
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Events" component={EventsScreen} options={{ title: 'Financial Events' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#4a90e2',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 150,
  },
  cardContent: {
    padding: 16,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  eventDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
});