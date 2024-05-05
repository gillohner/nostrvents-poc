import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Nostr from './components/nostr'
import EventOverview from './components/EventOverview';
import CreateCalendarEvent from './components/CreateCalendarEvent'

const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="NOSTR" component={Nostr} />
          <Tab.Screen name="Events" component={EventOverview} />
          <Tab.Screen name="Add Event" component={CreateCalendarEvent} />
        </Tab.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
