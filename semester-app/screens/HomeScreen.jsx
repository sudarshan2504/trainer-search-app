import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  FadeInDown,
} from 'react-native-reanimated';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const SemesterButton = ({ semester, index, onPress }) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.92);
    opacity.value = withTiming(0.85);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
    opacity.value = withTiming(1);
  };

  const colors = [
    ['#6366f1', '#8b5cf6'],
    ['#8b5cf6', '#ec4899'],
    ['#ec4899', '#f59e0b'],
    ['#f59e0b', '#10b981'],
    ['#10b981', '#06b6d4'],
    ['#06b6d4', '#3b82f6'],
    ['#3b82f6', '#6366f1'],
    ['#a855f7', '#ec4899'],
  ];

  return (
    <AnimatedTouchableOpacity
      style={[styles.semesterButton, animatedStyle]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      activeOpacity={0.9}
      entering={FadeInDown.delay(index * 80).springify()}
    >
      <LinearGradient
        colors={colors[index % colors.length]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.buttonGradient}
      >
        <View style={styles.buttonContent}>
          <View style={styles.iconContainer}>
            <Ionicons name="book" size={32} color="#ffffff" />
          </View>
          <Text style={styles.semesterText}>Semester {semester}</Text>
          <Ionicons name="chevron-forward" size={24} color="#ffffff" />
        </View>
      </LinearGradient>
    </AnimatedTouchableOpacity>
  );
};

export default function HomeScreen() {
  const headerOpacity = useSharedValue(0);
  const headerTranslateY = useSharedValue(-20);

  useEffect(() => {
    headerOpacity.value = withTiming(1, { duration: 800 });
    headerTranslateY.value = withSpring(0);
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: headerOpacity.value,
      transform: [{ translateY: headerTranslateY.value }],
    };
  });

  // Google Drive Folder IDs - Replace with your actual folder IDs
  // To find your folder ID: Open the folder in Google Drive, the ID is in the URL
  // Example: https://drive.google.com/drive/folders/1ABC123xyz789 -> ID is "1ABC123xyz789"
  const driveFolderIds = {
    1: 'YOUR_FOLDER_ID_SEMESTER_1',  // Replace with Semester 1 folder ID
    2: 'YOUR_FOLDER_ID_SEMESTER_2',  // Replace with Semester 2 folder ID
    3: 'YOUR_FOLDER_ID_SEMESTER_3',  // Replace with Semester 3 folder ID
    4: 'YOUR_FOLDER_ID_SEMESTER_4',  // Replace with Semester 4 folder ID
    5: 'YOUR_FOLDER_ID_SEMESTER_5',  // Replace with Semester 5 folder ID
    6: 'YOUR_FOLDER_ID_SEMESTER_6',  // Replace with Semester 6 folder ID
    7: 'YOUR_FOLDER_ID_SEMESTER_7',  // Replace with Semester 7 folder ID
    8: 'YOUR_FOLDER_ID_SEMESTER_8',  // Replace with Semester 8 folder ID
  };

  const openGoogleDrive = async (semester) => {
    try {
      // Get the folder ID for this semester
      const folderId = driveFolderIds[semester];
      
      if (!folderId || folderId.startsWith('YOUR_FOLDER_ID')) {
        Alert.alert(
          'Configuration Needed',
          `Please configure the Google Drive folder ID for Semester ${semester} in HomeScreen.jsx`,
          [{ text: 'OK' }]
        );
        return;
      }

      // Construct the Google Drive URL
      const driveUrl = `https://drive.google.com/drive/folders/${folderId}`;
      
      // Try to open in app first, fallback to browser
      const supported = await Linking.canOpenURL(driveUrl);
      if (supported) {
        await Linking.openURL(driveUrl);
      } else {
        // Alternative: Open in WebBrowser
        await WebBrowser.openBrowserAsync(driveUrl);
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'Could not open Google Drive. Please check your internet connection.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleSemesterPress = (semester) => {
    Alert.alert(
      `Semester ${semester}`,
      'Opening Google Drive for this semester...',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Open',
          onPress: () => openGoogleDrive(semester),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, headerAnimatedStyle]}>
        <Text style={styles.headerTitle}>Select Semester</Text>
        <Text style={styles.headerSubtitle}>Access your study materials</Text>
      </Animated.View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map((semester, index) => (
          <SemesterButton
            key={semester}
            semester={semester}
            index={index}
            onPress={() => handleSemesterPress(semester)}
          />
        ))}

        <View style={styles.footer}>
          <Ionicons name="cloud-download-outline" size={24} color="#6b7280" />
          <Text style={styles.footerText}>All materials stored in Google Drive</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    backgroundColor: '#6366f1',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#e0e7ff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  semesterButton: {
    marginBottom: 15,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonGradient: {
    padding: 20,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  semesterText: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 15,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
    marginLeft: 10,
  },
});

