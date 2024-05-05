import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Mock data - this would eventually be fetched from a Nostr relay
const eventsData = [
  { id: '1', title: 'Bitcoin Meetup Lucerne', location: 'Lucerne, Switzerland' },
  { id: '2', title: 'Bitcoin Meetup Berlin', location: 'Berlin, Germany' },
  { id: '3', title: 'Bitcoin Meetup San Salvador', location: 'San Salvador, El Salvador' }
];

export default function EventOverview() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => setSelectedEvent(item)}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.location}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {selectedEvent ? (
        <EventDetails event={selectedEvent} />
      ) : (
        <FlatList
          data={eventsData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </SafeAreaView>
  );
}

const EventDetails = ({ event }) => (
  <SafeAreaView>
    <Text style={styles.title}>{event.title}</Text>
    <Text>{event.location}</Text>
    {/* RSVP component would go here */}
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  }
});
