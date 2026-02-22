import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function HomeScreen({ navigation }: any) {
  const [totalDistance, setTotalDistance] = useState(42.5);
  const [totalRuns, setTotalRuns] = useState(8);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome Back</Text>
            <Text style={styles.subtitle}>Ready to run?</Text>
          </View>
          <Ionicons name="flame" size={32} color="#FF6B35" />
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="trending-up" size={24} color="#FF6B35" />
            <Text style={styles.statValue}>{totalDistance}</Text>
            <Text style={styles.statLabel}>Total km</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="checkmark-circle" size={24} color="#FF6B35" />
            <Text style={styles.statValue}>{totalRuns}</Text>
            <Text style={styles.statLabel}>Runs</Text>
          </View>
        </View>

        {/* Last Run */}
        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Last Run</Text>
          <View style={styles.runCard}>
            <View style={styles.runInfo}>
              <Text style={styles.runDistance}>5.2 km</Text>
              <Text style={styles.runTime}>28 minutes</Text>
              <Text style={styles.runPace}>5:23 min/km</Text>
            </View>
            <View style={styles.runMeta}>
              <Ionicons name="calendar" size={16} color="#999" />
              <Text style={styles.runDate}>Today</Text>
            </View>
          </View>
        </View>

        {/* Start Run Button */}
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.navigate("StartRun")}
          activeOpacity={0.8}
        >
          <Ionicons name="play-circle" size={28} color="#fff" />
          <Text style={styles.startButtonText}>Start New Run</Text>
        </TouchableOpacity>

        {/* Weekly Overview */}
        <View style={styles.weekSection}>
          <Text style={styles.sectionTitle}>Week Overview</Text>
          <View style={styles.weekChart}>
            {[3.2, 5.2, 4.1, 0, 6.5, 3.8, 4.2].map((distance, index) => (
              <View key={index} style={styles.dayBar}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: (distance / 6.5) * 60 || 4,
                      opacity: distance > 0 ? 1 : 0.3,
                    },
                  ]}
                />
                <Text style={styles.dayLabel}>
                  {["M", "T", "W", "T", "F", "S", "S"][index]}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F0F",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#999",
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 30,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FF6B35",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  recentSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 12,
  },
  runCard: {
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  runInfo: {
    flex: 1,
  },
  runDistance: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 4,
  },
  runTime: {
    fontSize: 14,
    color: "#999",
    marginBottom: 4,
  },
  runPace: {
    fontSize: 14,
    color: "#FF6B35",
    fontWeight: "600",
  },
  runMeta: {
    alignItems: "center",
    paddingLeft: 16,
  },
  runDate: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  startButton: {
    marginHorizontal: 20,
    backgroundColor: "#FF6B35",
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    shadowColor: "#FF6B35",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  startButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 10,
  },
  weekSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  weekChart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 100,
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  dayBar: {
    alignItems: "center",
    flex: 1,
  },
  bar: {
    width: 6,
    backgroundColor: "#FF6B35",
    borderRadius: 3,
    marginBottom: 8,
  },
  dayLabel: {
    fontSize: 12,
    color: "#999",
    fontWeight: "600",
  },
  bottomPadding: {
    height: 40,
  },
});
