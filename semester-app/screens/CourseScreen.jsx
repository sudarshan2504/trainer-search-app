import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  FadeInDown,
} from 'react-native-reanimated';
import { useCourse } from '../context/CourseContext';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const CourseCard = ({ course, icon, color, index, onPress }) => {
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

  return (
    <AnimatedTouchableOpacity
      style={[styles.courseCard, animatedStyle]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      activeOpacity={0.9}
      entering={FadeInDown.delay(index * 100).springify()}
    >
      <LinearGradient
        colors={[color, `${color}dd`]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardGradient}
      >
        <View style={styles.cardContent}>
          <View style={styles.iconContainer}>
            <Ionicons name={icon} size={40} color="#ffffff" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.courseName}>{course}</Text>
            <Text style={styles.courseSubtitle}>Select to view semesters</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#ffffff" />
        </View>
      </LinearGradient>
    </AnimatedTouchableOpacity>
  );
};

export default function CourseScreen() {
  const navigation = useNavigation();
  const { setSelectedCourse } = useCourse();
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

  const courses = [
    {
      name: 'CSE',
      fullName: 'Computer Science Engineering',
      icon: 'laptop',
      color: '#6366f1',
    },
    {
      name: 'ISE',
      fullName: 'Information Science Engineering',
      icon: 'server',
      color: '#8b5cf6',
    },
    {
      name: 'AI & ML',
      fullName: 'Artificial Intelligence & Machine Learning',
      icon: 'brain',
      color: '#ec4899',
    },
  ];

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    // Navigate to Home tab to show semesters
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, headerAnimatedStyle]}>
        <Text style={styles.headerTitle}>Select Your Course</Text>
        <Text style={styles.headerSubtitle}>Choose your branch to continue</Text>
      </Animated.View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {courses.map((course, index) => (
          <CourseCard
            key={course.name}
            course={course.fullName}
            icon={course.icon}
            color={course.color}
            index={index}
            onPress={() => handleCourseSelect(course.name)}
          />
        ))}

        <View style={styles.footer}>
          <Ionicons name="school-outline" size={24} color="#6b7280" />
          <Text style={styles.footerText}>Select a course to view semesters</Text>
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
  courseCard: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  cardGradient: {
    padding: 25,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
  },
  courseName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  courseSubtitle: {
    fontSize: 14,
    color: '#e0e7ff',
    fontWeight: '500',
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

