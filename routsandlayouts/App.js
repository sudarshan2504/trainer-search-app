import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/Screenshot (49).png')}
        style={styles.profilePic}
      />
      <Text style={styles.header}>Profile Information</Text>
      <Text style={styles.info}>Name: Sudarshan J</Text>
      <Text style={styles.info}>Game: Genshine Impact</Text>
      <Text style={styles.info}>Level: 60</Text>
      <Text style={styles.info}>Rank: gold</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dff9fb',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
  },
});
