import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

export default function Home({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jeevni Thermo</Text>

      <View style={styles.instructions}>
        <Text style={styles.instructionText}>📋 How It Works:</Text>

        <Text style={styles.sectionTitle}>💗 Heart Beat Measurement</Text>
        <Text style={styles.instructionText}>
          1. Place your fingertip over the camera.
        </Text>
        <Text style={styles.instructionText}>
          2. Turn flashlight on by zooming camera.
        </Text>
        <Text style={styles.instructionText}>
          3. Keep your finger steady until the measurement completes.
        </Text>

        <Text style={styles.sectionTitle}>🌬️ Breath Count</Text>
        <Text style={styles.instructionText}>
          1. Tap the screen each time you breathe out.
        </Text>

        <Text style={styles.sectionTitle}>🌡️ Estimated Body Temperature</Text>
        <Text style={styles.instructionText}>
          1. Your body temperature will be calculated automatically using your
          heart rate and breath rate.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('BPM')}
      >
        <Text style={styles.buttonText}>Start Measuring</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  instructions: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
    width: '100%',
  },
  instructionText: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
