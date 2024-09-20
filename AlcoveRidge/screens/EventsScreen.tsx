import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import EventCard from '../components/EventCard';
import { events } from '../data/events';
import styles from '../styles/globalStyles';

const EventsScreen = () => {
  const [showAllEvents, setShowAllEvents] = useState(false);
  const currentDate = new Date();
  
  const upcomingEvents = events.filter(event => new Date(event.date) > currentDate);
  const previousEvents = events.filter(event => new Date(event.date) <= currentDate);

  const displayedEvents = showAllEvents ? events : upcomingEvents.slice(0, 3);

  return (
    <View style={styles.eventsContainer}>
      <Text style={styles.eventsTitle}>Events near me</Text>
      <TouchableOpacity style={styles.newEventButton}>
        <Text style={styles.newEventButtonText}>NEW EVENT</Text>
      </TouchableOpacity>
      <FlatList
        data={displayedEvents}
        renderItem={({ item }) => <EventCard event={item} />}
        keyExtractor={(item) => item.id}
        ListFooterComponent={() => (
          <TouchableOpacity
            style={styles.browseAllButton}
            onPress={() => setShowAllEvents(!showAllEvents)}
          >
            <Text style={styles.browseAllButtonText}>
              {showAllEvents ? 'SHOW LESS' : 'BROWSE ALL'}
            </Text>
          </TouchableOpacity>
        )}
      />
      {showAllEvents && (
        <View>
          <Text style={styles.sectionTitle}>Previous Events</Text>
          <FlatList
            data={previousEvents}
            renderItem={({ item }) => <EventCard event={item} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </View>
  );
};

export default EventsScreen;