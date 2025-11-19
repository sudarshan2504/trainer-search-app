import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

export default function Contact() {
  const handleOpen = (url) => {
    Linking.openURL(url).catch((err) => console.warn('Error opening link:', err));
  };

  const handleCall = () => {
    handleOpen('tel:+911234567890'); // change to your number
  };

  const handleWhatsApp = () => {
    // change the number to your WhatsApp number with country code
    handleOpen('https://wa.me/911234567890');
  };

  const handleInstagram = () => {
    // change to your Instagram username
    handleOpen('https://instagram.com/your_username');
  };

  const handleYouTube = () => {
    // change to your YouTube channel link
    handleOpen('https://youtube.com/@your_channel');
  };

  return (
    <View style={styles.container}>
      {/* Fake starry background */}
      <View style={styles.star} />
      <View style={[styles.star, styles.star2]} />
      <View style={[styles.star, styles.star3]} />
      <View style={[styles.star, styles.star4]} />

      <ScrollView contentContainerStyle={styles.content}>

        <Text style={styles.title}>Contact Me</Text>
        <Text style={styles.subtitle}>
          Let&apos;s stay connected on call and social media.
        </Text>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Contact Info</Text>

          <TouchableOpacity style={styles.row} onPress={handleCall}>
            <View style={styles.iconCircle}>
              <MaterialIcons name="phone" size={22} />
            </View>
            <View style={styles.textBox}>
              <Text style={styles.rowLabel}>Phone</Text>
              <Text style={styles.rowValue}>+91 12345 67890</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={handleWhatsApp}>
            <View style={styles.iconCircle}>
              <FontAwesome name="whatsapp" size={22} />
            </View>
            <View style={styles.textBox}>
              <Text style={styles.rowLabel}>WhatsApp</Text>
              <Text style={styles.rowValue}>Chat with me on WhatsApp</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Social Media</Text>

          <TouchableOpacity style={styles.row} onPress={handleInstagram}>
            <View style={styles.iconCircle}>
              <FontAwesome name="instagram" size={22} />
            </View>
            <View style={styles.textBox}>
              <Text style={styles.rowLabel}>Instagram</Text>
              <Text style={styles.rowValue}>@your_username</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={handleYouTube}>
            <View style={styles.iconCircle}>
              <FontAwesome name="youtube-play" size={22} />
            </View>
            <View style={styles.textBox}>
              <Text style={styles.rowLabel}>YouTube</Text>
              <Text style={styles.rowValue}>@your_channel</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.footerText}>
          Available 9:00 AM – 7:00 PM (IST)
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020824', // midnight blue
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#EAF6FF',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#A9C1FF',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#050C2F',
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#1D2A5A',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#D6E4FF',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EAF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textBox: {
    flex: 1,
  },
  rowLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F5FBFF',
  },
  rowValue: {
    fontSize: 12,
    color: '#9FB5FF',
    marginTop: 2,
  },
  footerText: {
    fontSize: 12,
    color: '#6F82C6',
    textAlign: 'center',
    marginTop: 10,
  },

  // "Stars" in the background
  star: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
    top: 40,
    right: 60,
    opacity: 0.8,
  },
  star2: {
    top: 120,
    left: 30,
    opacity: 0.6,
  },
  star3: {
    top: 200,
    right: 20,
    opacity: 0.7,
  },
  star4: {
    top: 300,
    left: 80,
    opacity: 0.5,
  },
});
