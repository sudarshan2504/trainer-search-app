import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  FadeInDown,
  FadeInRight,
} from 'react-native-reanimated';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const InfoCard = ({ icon, label, value, color, index, onPress }) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
    opacity.value = withTiming(0.8);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
    opacity.value = withTiming(1);
  };

  return (
    <AnimatedTouchableOpacity
      style={[styles.infoCard, animatedStyle]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      activeOpacity={0.9}
      entering={FadeInRight.delay(index * 100).springify()}
    >
      <LinearGradient
        colors={[color, `${color}dd`]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardGradient}
      >
        <View style={styles.cardContent}>
          <View style={styles.iconContainer}>
            <Ionicons name={icon} size={28} color="#ffffff" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.cardLabel}>{label}</Text>
            <Text style={styles.cardValue}>{value}</Text>
          </View>
          {onPress && (
            <Ionicons name="chevron-forward" size={20} color="#ffffff" />
          )}
        </View>
      </LinearGradient>
    </AnimatedTouchableOpacity>
  );
};

export default function ProfileScreen() {
  const headerOpacity = useSharedValue(0);
  const headerScale = useSharedValue(0.8);

  useEffect(() => {
    headerOpacity.value = withTiming(1, { duration: 800 });
    headerScale.value = withSpring(1);
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: headerOpacity.value,
      transform: [{ scale: headerScale.value }],
    };
  });

  const personalInfo = [
    {
      icon: 'person',
      label: 'Full Name',
      value: 'John Doe',
      color: '#6366f1',
    },
    {
      icon: 'id-card',
      label: 'Student ID',
      value: 'STU2024001',
      color: '#8b5cf6',
    },
    {
      icon: 'mail',
      label: 'Email',
      value: 'john.doe@university.edu',
      color: '#ec4899',
      onPress: () => Linking.openURL('mailto:john.doe@university.edu'),
    },
    {
      icon: 'call',
      label: 'Phone',
      value: '+1 (555) 123-4567',
      color: '#f59e0b',
      onPress: () => Linking.openURL('tel:+15551234567'),
    },
    {
      icon: 'calendar',
      label: 'Date of Birth',
      value: 'January 15, 2000',
      color: '#10b981',
    },
    {
      icon: 'location',
      label: 'Address',
      value: '123 University Street, City, State 12345',
      color: '#06b6d4',
    },
    {
      icon: 'school',
      label: 'Course',
      value: 'Bachelor of Computer Science',
      color: '#3b82f6',
    },
    {
      icon: 'people',
      label: 'Year',
      value: 'Final Year',
      color: '#a855f7',
    },
  ];

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, headerAnimatedStyle]}>
        <LinearGradient
          colors={['#6366f1', '#8b5cf6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={50} color="#6366f1" />
            </View>
          </View>
          <Text style={styles.headerTitle}>Personal Information</Text>
          <Text style={styles.headerSubtitle}>Student Profile</Text>
        </LinearGradient>
      </Animated.View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {personalInfo.map((info, index) => (
          <InfoCard
            key={index}
            icon={info.icon}
            label={info.label}
            value={info.value}
            color={info.color}
            index={index}
            onPress={info.onPress}
          />
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>Keep your information updated! 📝</Text>
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
    paddingTop: 60,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerGradient: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 28,
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
  infoCard: {
    marginBottom: 15,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  cardGradient: {
    padding: 20,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 14,
    color: '#e0e7ff',
    marginBottom: 5,
    fontWeight: '600',
  },
  cardValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 18,
    color: '#6b7280',
    fontWeight: '600',
  },
});

