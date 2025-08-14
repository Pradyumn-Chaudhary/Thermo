import React, { useState } from 'react';
import {
  Alert,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useFrameProcessor,
} from 'react-native-vision-camera';
import { Worklets } from 'react-native-worklets-core';

export default function BPM({ navigation }: any) {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');

  const [ready, setReady] = useState(false);
  const [count, setCount] = useState(15);
  const [redSignal, setRedSignal] = useState<number[]>([]);

  function calculateBPM(peaks: number[], recordingTimeInSeconds = 15) {
    const numberOfPeaks = peaks.length;
    const bpm = (numberOfPeaks / recordingTimeInSeconds) * 60;
    return bpm;
  }

  function detectPeaks(signal: number[], threshold = 0) {
    const peaks = [];
    const minDistance = 10; // minimum spacing between peaks (in frames)

    let lastPeakIndex = -minDistance;

    for (let i = 1; i < signal.length - 1; i++) {
      if (
        signal[i] > signal[i - 1] &&
        signal[i] > signal[i + 1] &&
        signal[i] > threshold &&
        i - lastPeakIndex >= minDistance
      ) {
        peaks.push(i);
        lastPeakIndex = i;
      }
    }
    return peaks; // array of indices where peaks occur
  }

  function movingAverage(signal: number[], windowSize = 25) {
    const smoothed = [];
    const half = Math.floor(windowSize / 2);

    for (let i = 0; i < signal.length; i++) {
      let sum = 0;
      let count = 0;
      for (let j = i - half; j <= i + half; j++) {
        if (j >= 0 && j < signal.length) {
          sum += signal[j];
          count++;
        }
      }
      smoothed.push(sum / count);
    }

    return smoothed;
  }

  const handleRedSignal = Worklets.createRunOnJS((avgRed: number) => {
    setRedSignal(prev => [...prev, avgRed]);
  });

  const frameProcessor = useFrameProcessor(
    frame => {
      'worklet';
      if (frame.pixelFormat === 'yuv') {
        const buffer = frame.toArrayBuffer();
        const data = new Uint8Array(buffer);

        const yPlaneSize = frame.width * frame.height;
        let totalRed = 0;
        // Iterate over the Y plane, which is the luminance component
        for (let i = 0; i < yPlaneSize; i += 1) {
          totalRed += data[i]; // Y channel, used as a proxy for the 'red' signal
        }
        const avgRed = totalRed / yPlaneSize;
        handleRedSignal(avgRed);
      }
    },
    [handleRedSignal],
  );

  const handleContinue = () => {
    let n = redSignal.length;
    console.log(n);
    if (redSignal.length > 0) {
      const smoothed = movingAverage(redSignal);
      const peak = detectPeaks(smoothed);
      const bpm = calculateBPM(peak) || 0; // fallback
      navigation.navigate('Breath', { heartRate: bpm });
    } else {
      navigation.navigate('Breath', { heartRate: 72 });
    }
  };

  const handleReady = () => {
    setReady(true);

    const interval = setInterval(() => {
      setCount(prev => {
        if (prev <= 1) {
          clearInterval(interval); // stop interval
          return 0;
        }
        return prev - 1; // decrement safely
      });
    }, 1000);
  };

  const openAppSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:'); // iOS opens app settings
    } else {
      Linking.openSettings(); // Android opens app settings
    }
  };

  if (!hasPermission)
    return (
      <View style={styles.container}>
        <Text style={styles.text}>📷 Camera Permission Required</Text>
        <Text style={styles.subText}>
          To measure your heart rate, please grant camera permission.
        </Text>
        <TouchableOpacity style={styles.button} onPress={openAppSettings}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );

  return (
    <View style={styles.container}>
      {!ready ? (
        <>
          <Text style={styles.readyText}>
            When ready, press the ready button then put your finger on the
            camera and flashlight for the next 15 sec.
          </Text>
          <Text style={styles.readyText}>
            ⚠️ Zoom in on next screen for turning flashlight on
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleReady}>
            <Text style={styles.buttonText}>Ready</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.cameraContainer}>
          <View style={styles.cameraWrapper}>
            {count > 0 && (
              <Camera
                style={styles.camera}
                frameProcessor={frameProcessor}
                pixelFormat="yuv"
                device={device!}
                isActive={true}
                torch={'on'}
                enableZoomGesture
              />
            )}
            <Text style={styles.countText}>{count} sec</Text>
          </View>

          {count === 0 && (
            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleContinue}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  subText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 25,
    color: '#555',
  },
  button: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  readyText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 15,
    color: '#444',
    textAlign: 'center',
  },
  cameraContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraWrapper: {
    width: 250,
    height: 250,
    borderRadius: 125,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  camera: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  countText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    zIndex: 10,
  },
  continueButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
