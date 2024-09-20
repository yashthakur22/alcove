import React, { useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList, Dimensions, Animated, PanResponder } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const { height } = Dimensions.get('window');

// Main Page with Swipe Up
const MainPage = ({ navigation }) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const loginPageOpacity = useRef(new Animated.Value(0)).current;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return Math.abs(gestureState.dy) > 5;
    },
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dy < 0) {
        pan.y.setValue(gestureState.dy);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy < -50) {
        Animated.parallel([
          Animated.timing(pan.y, {
            toValue: -height,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(loginPageOpacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
      } else {
        Animated.spring(pan.y, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.mainContainer, { transform: [{ translateY: pan.y }] }]}
        {...panResponder.panHandlers}
      >
        <Image
          source={require('./assets/background.jpg')} // Make sure to add this image to your assets folder
          style={styles.backgroundImage}
        />
        <Text style={styles.swipeText}>Swipe up to login</Text>
      </Animated.View>
      <Animated.View
        style={[
          styles.loginContainer,
          {
            opacity: loginPageOpacity,
            transform: [
              {
                translateY: loginPageOpacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [height, 0],
                }),
              },
            ],
          },
        ]}
      >
        <LoginScreen navigation={navigation} />
      </Animated.View>
    </View>
  );
};

// Login Screen
const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'test' && password === 'password') {
      navigation.navigate('MainTabs');
    } else {
      Alert.alert('Error', 'Invalid credentials. Use test/password to login.');
    }
  };

  return (
    <View style={styles.loginInnerContainer}>
      <Text style={styles.title}>Financial Events App</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#999"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
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
  { id: '1', name: 'Investment Workshop', date: '2023-09-15', time: '14:00', location: 'Financial District', image: 'https://picsum.photos/200', username: 'financeguru' },
  { id: '2', name: 'Stock Market Seminar', date: '2023-09-20', time: '10:00', location: 'Downtown Conference Center', image: 'https://picsum.photos/201', username: 'stockwhiz' },
  { id: '3', name: 'Crypto Trends 2023', date: '2023-09-25', time: '16:00', location: 'Tech Hub', image: 'https://picsum.photos/202', username: 'cryptoking' },
  { id: '4', name: 'Personal Finance Mastery', date: '2023-10-01', time: '09:00', location: 'Community College', image: 'https://picsum.photos/203', username: 'moneysmart' },
  { id: '5', name: 'Real Estate Investment Forum', date: '2023-10-05', time: '11:00', location: 'Grand Hotel', image: 'https://picsum.photos/204', username: 'propertypro' },
].sort((a, b) => new Date(a.date) - new Date(b.date));

const EventCard = ({ event }) => (
  <View style={styles.card}>
    <Image source={{ uri: event.image }} style={styles.eventImage} />
    <View style={styles.cardContent}>
      <Text style={styles.eventName}>{event.name}</Text>
      <Text style={styles.eventDetails}>{event.date} at {event.time}</Text>
      <Text style={styles.eventDetails}>{event.location}</Text>
      <Text style={styles.eventUsername}>by {event.username}</Text>
    </View>
  </View>
);

const EventsScreen = () => {
  const upcomingEvents = events.filter(event => new Date(event.date) > new Date());

  return (
    <View style={styles.eventsContainer}>
      <Text style={styles.eventsTitle}>Events near me</Text>
      <TouchableOpacity style={styles.newEventButton}>
        <Text style={styles.newEventButtonText}>NEW EVENT</Text>
      </TouchableOpacity>
      <FlatList
        data={upcomingEvents.slice(0, 3)}
        renderItem={({ item }) => <EventCard event={item} />}
        keyExtractor={(item) => item.id}
        ListFooterComponent={() => (
          <TouchableOpacity style={styles.browseAllButton}>
            <Text style={styles.browseAllButtonText}>BROWSE ALL</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// Profile Screen (placeholder)
const ProfileScreen = () => (
  <View style={styles.container}>
    <Text>Profile Screen</Text>
  </View>
);

// Main Tab Navigator
const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Events') {
          iconName = focused ? 'calendar' : 'calendar-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Events" component={EventsScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

// Main App component
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainPage} />
        <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  swipeText: {
    position: 'absolute',
    bottom: 40,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#6591AF',
    justifyContent: 'center',
  },
  loginInnerContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#fff',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    color: '#333',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#333',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventsContainer: {
    flex: 1,
    backgroundColor: '#6591AF',
    padding: 16,
  },
  eventsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  newEventButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 16,
  },
  newEventButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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
  eventImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
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
  eventUsername: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  browseAllButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 16,
  },
  browseAllButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});