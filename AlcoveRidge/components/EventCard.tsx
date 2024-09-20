import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../styles/globalStyles';

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

export default EventCard;