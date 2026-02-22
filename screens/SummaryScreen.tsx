import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SummaryScreen({ navigation, route }: any) {
  const { time, distance, pace, calories } = route.params || {
    time: "28:45",
    distance: "5.2",
    pace: "5.54",
    calories: "320",
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const averageSpeed = (
    parseFloat(distance) /
    (parseInt(time.split(":")[0]) || 0 + parseInt(time.split(":")[1]) / 60)
  ).toFixed(2);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Success Header */}
      <Animated.View
        style={[
          styles.header,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Ionicons name="checkmark-circle" size={64} color="#4CAF50" />
        <Text style={styles.title}>Awesome Work!</Text>
        <Text style={styles.subtitle}>You crushed that run</Text>
      </Animated.View>

      {/* Main Stats Card */}
      <Animated.View
        style={[
          styles.mainCard,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.statsRow}>
          <View style={styles.statColumn}>
            <Text style={styles.statLabel}>Distance</Text>
            <Text style={styles.statValueLarge}>{distance}</Text>
            <Text style={styles.statUnit}>km</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statColumn}>
            <Text style={styles.statLabel}>Time</Text>
            <Text style={styles.statValueLarge}>{time}</Text>
            <Text style={styles.statUnit}>h:m:s</Text>
          </View>
        </View>
      </Animated.View>

      {/* Secondary Stats */}
      <View style={styles.secondaryStats}>
        <View style={styles.statBox}>
          <View style={styles.statBoxHeader}>
            <Ionicons name="speedometer" size={20} color="#FF6B35" />
            <Text style={styles.statBoxLabel}>Avg Pace</Text>
          </View>
          <Text style={styles.statBoxValue}>{pace}</Text>
          <Text style={styles.statBoxUnit}>min/km</Text>
        </View>

        <View style={styles.statBox}>
          <View style={styles.statBoxHeader}>
            <Ionicons name="flame" size={20} color="#FF6B35" />
            <Text style={styles.statBoxLabel}>Calories</Text>
          </View>
          <Text style={styles.statBoxValue}>{calories}</Text>
          <Text style={styles.statBoxUnit}>kcal</Text>
        </View>

        <View style={styles.statBox}>
          <View style={styles.statBoxHeader}>
            <Ionicons name="trending-up" size={20} color="#FF6B35" />
            <Text style={styles.statBoxLabel}>Avg Speed</Text>
          </View>
          <Text style={styles.statBoxValue}>{averageSpeed}</Text>
          <Text style={styles.statBoxUnit}>km/h</Text>
        </View>

        <View style={styles.statBox}>
          <View style={styles.statBoxHeader}>
            <Ionicons name="checkmark" size={20} color="#FF6B35" />
            <Text style={styles.statBoxLabel}>Streak</Text>
          </View>
          <Text style={styles.statBoxValue}>8</Text>
          <Text style={styles.statBoxUnit}>days</Text>
        </View>
      </View>

      {/* Achievement Badge */}
      <View style={styles.achievementSection}>
        <Text style={styles.sectionTitle}>Achievement Unlocked</Text>
        <View style={styles.badgeCard}>
          <Ionicons name="trophy" size={40} color="#FFD700" />
          <View style={styles.badgeContent}>
            <Text style={styles.badgeTitle}>5K Runner</Text>
            <Text style={styles.badgeDesc}>Completed your first 5km run</Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => console.log("Share")}
          activeOpacity={0.8}
        >
          <Ionicons name="share-social" size={22} color="#FF6B35" />
          <Text style={styles.secondaryButtonText}>Share</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate("Home")}
          activeOpacity={0.8}
        >
          <Ionicons name="home" size={22} color="#fff" />
          <Text style={styles.primaryButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.padding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F0F",
    paddingTop: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#fff",
    marginTop: 16,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#999",
  },
  mainCard: {
    marginHorizontal: 20,
    backgroundColor: "#1a1a1a",
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    marginBottom: 20,
    shadowColor: "#FF6B35",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 6,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  statColumn: {
    flex: 1,
    alignItems: "center",
  },
  statLabel: {
    fontSize: 13,
    color: "#999",
    marginBottom: 8,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  statValueLarge: {
    fontSize: 36,
    fontWeight: "800",
    color: "#FF6B35",
  },
  statUnit: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
    fontWeight: "600",
  },
  divider: {
    width: 1,
    height: 60,
    backgroundColor: "#2a2a2a",
    marginHorizontal: 20,
  },
  secondaryStats: {
    marginHorizontal: 20,
    marginBottom: 30,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  statBox: {
    width: "48%",
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  statBoxHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  statBoxLabel: {
    fontSize: 12,
    color: "#999",
    marginLeft: 6,
    fontWeight: "600",
  },
  statBoxValue: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FF6B35",
    marginBottom: 2,
  },
  statBoxUnit: {
    fontSize: 11,
    color: "#666",
    fontWeight: "600",
  },
  achievementSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 12,
  },
  badgeCard: {
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFD700",
  },
  badgeContent: {
    marginLeft: 16,
    flex: 1,
  },
  badgeTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 4,
  },
  badgeDesc: {
    fontSize: 12,
    color: "#999",
  },
  actionButtons: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 30,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FF6B35",
  },
  secondaryButtonText: {
    color: "#FF6B35",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: "#FF6B35",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FF6B35",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },
  padding: {
    height: 20,
  },
});
