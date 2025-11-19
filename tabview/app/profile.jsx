import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";

export default function Profile() {
  const openUrl = (url) => {
    Linking.openURL(url).catch((err) =>
      console.warn("Cannot open URL:", err)
    );
  };

  return (
    <View style={styles.container}>
      {/* Decorative stars */}
      <View style={styles.star} />
      <View style={[styles.star, styles.star2]} />
      <View style={[styles.star, styles.star3]} />
      <View style={[styles.star, styles.star4]} />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileContainer}>
          <Image
            source={require("")} // put your DP here
            style={styles.profilePic}
          />

          <Text style={styles.name}>Your Name</Text>

          <Text style={styles.education}>
            Diploma in Computer Science – Karnataka Board
          </Text>

          <Text style={styles.bio}>
            Passionate mobile app & web developer.  
            Love creating modern UI, animations, and full-stack applications.
          </Text>

          <View style={styles.linksContainer}>
            <TouchableOpacity
              style={styles.linkBtn}
              onPress={() => openUrl("https://github.com/your_username")}
            >
              <FontAwesome name="github" size={20} style={styles.linkIcon} />
              <Text style={styles.linkText}>GitHub</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.linkBtn, styles.linkedinBtn]}
              onPress={() =>
                openUrl("https://www.linkedin.com/in/your_profile")
              }
            >
              <AntDesign
                name="linkedin-square"
                size={20}
                style={styles.linkIcon}
              />
              <Text style={styles.linkText}>LinkedIn</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.footerText}>
          Tip: Replace text, DP & links with your actual details.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020824",
  },
  content: {
    padding: 20,
    alignItems: "center",
  },

  // Profile Card
  profileContainer: {
    backgroundColor: "#050C2F",
    borderRadius: 18,
    padding: 20,
    width: "100%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1D2A5A",
  },
  profilePic: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: "#6F82C6",
  },
  name: {
    color: "#EAF6FF",
    fontSize: 24,
    fontWeight: "700",
    marginTop: 8,
  },
  education: {
    color: "#A9C1FF",
    fontSize: 13,
    marginTop: 4,
    textAlign: "center",
  },
  bio: {
    color: "#D6E4FF",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    marginTop: 12,
  },

  // Social Links
  linksContainer: {
    flexDirection: "row",
    marginTop: 18,
    gap: 10,
  },
  linkBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: "#EAF6FF",
    borderRadius: 12,
  },
  linkedinBtn: {
    backgroundColor: "#0A2A66",
    borderWidth: 1,
    borderColor: "#2A67C6",
  },
  linkIcon: {
    marginRight: 8,
    color: "#020824",
  },
  linkText: {
    fontWeight: "700",
    color: "#020824",
    fontSize: 13,
  },

  footerText: {
    color: "#6F82C6",
    marginTop: 16,
    fontSize: 12,
    textAlign: "center",
  },

  // stars
  star: {
    position: "absolute",
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#FFFFFF",
    top: 60,
    right: 50,
    opacity: 0.8,
  },
  star2: {
    top: 150,
    left: 30,
    opacity: 0.6,
  },
  star3: {
    top: 240,
    right: 20,
    opacity: 0.7,
  },
  star4: {
    top: 340,
    left: 90,
    opacity: 0.5,
  },
});
