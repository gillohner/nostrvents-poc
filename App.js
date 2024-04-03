import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text } from 'react-native';
import Nostr from './components/nostr'

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{ color: '#fff' }}>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />

      <Nostr placeholderImageSource="text"/>
    </View>
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
