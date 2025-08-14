import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

interface Props {
  navigation: any;
  route: {
    params: {
      heartRate: number;
    };
  };
}

export default function Breath({ navigation, route }: Props) {
  const { heartRate } = route.params || { heartRate: 0 };
  const [breathCount, setBreathCount] = useState(0);
  const [count, setCount] = useState(15);
  const [ready, setReady] = useState(false);

  const handleReady = () => {
    setReady(true);
    const interval = setInterval(() => {
      setCount(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleContinue = () => {
    navigation.navigate('Temperature', { heartRate, breathCount });
  };

  return (
    <View style={styles.container}>
      {!ready ? (
        <View style={styles.readyContainer}>
          <View style={styles.instructionContainer}>
            <Text style={styles.instructionText}>
              🟢 Tap "Ready" to start the 15-second countdown.
            </Text>
            <Text style={styles.instructionText}>
              💨 Tap the button each time you breathe out during the countdown.
            </Text>
          </View>

          <TouchableOpacity style={styles.readyButton} onPress={handleReady}>
            <Text style={styles.buttonText}>Ready</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.countContainer}>
          <View style={styles.countCircle}>
            <Text style={styles.count}>{count}</Text>
          </View>
          {count !== 0 ? (
            <TouchableOpacity
              style={styles.tapButton}
              onPress={() => setBreathCount(prev => prev + 1)}
            >
              <Text style={styles.buttonText}>Tap</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleContinue}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.breathCount}>Breaths counted: {breathCount}</Text>
        </View>
      )}
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
  readyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructionContainer: {
    marginBottom: 30,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  instructionText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
    textAlign: 'center',
    lineHeight: 22,
  },

  readyButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 45,
    borderRadius: 8,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  countContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  countCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#FF3B30',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
  },
  count: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  tapButton: {
    backgroundColor: '#34C759',
    paddingVertical: 16,
    paddingHorizontal: 45,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#34C759',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  continueButton: {
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
  breathCount: {
    marginTop: 25,
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
});
