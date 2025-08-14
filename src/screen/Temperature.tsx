import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';

type RootStackParamList = {
  Home: undefined;
  BPM: undefined;
  Breath: { heartRate: number };
  Temperature: { heartRate: number; breathCount: number };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Temperature'>;

export default function Temperature({ navigation, route }: Props) {
  const { heartRate, breathCount } = route.params;
  const [temperature, setTemperature] = useState(37);

  useEffect(() => {
    let temp = 36; // baseline normal temp

    // Adjust for heart rate
    temp += heartRate * 0.01;

    // Adjust for breath count
    temp += breathCount * 4 * 0.05; // breathCount (15 sec) -> breaths per minute = breathCount * 4;

    // Clamp temperature
    temp = Math.min(Math.max(temp, 35), 40);

    setTemperature(temp);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>
          BPM: <Text style={styles.value}>{heartRate}</Text>
        </Text>
        <Text style={styles.label}>
          Breath Count: <Text style={styles.value}>{breathCount}</Text>
        </Text>
        <Text style={styles.label}>
          Estimated Temperature:{' '}
          <Text style={styles.value}>{temperature.toFixed(1)}°C</Text>
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Calculate Another</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafc',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
    marginBottom: 40,
  },
  label: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginVertical: 10,
    textAlign: 'center',
  },
  value: {
    fontWeight: 'bold',
    color: '#FF3B30',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 45,
    borderRadius: 8,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
