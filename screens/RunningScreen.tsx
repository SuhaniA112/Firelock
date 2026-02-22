import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function RunningScreen({ navigation }: any) {
  const [time, setTime] = useState(0);
  const [distance, setDistance] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [pace, setPace] = useState(0);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isRunning) {
      // Put arduino code for pinging here
      const interval = setInterval(() => {
        setTime((prev) => prev + 1);
        setDistance((prev) => prev + 0.015);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  useEffect(() => {
    if (distance > 0) {
      setPace(time / 60 / distance);
    }
  }, [time, distance]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleFinish = () => {
    setIsRunning(false);
    navigation.navigate("Summary", {
      time: formatTime(time),
      distance: distance.toFixed(2),
      pace: pace.toFixed(2),
      calories: Math.round(distance * 60),
    });
  };

  return (
    <View style={styles.container}>
      {/* Main Display */}
      <View style={styles.display}>
        {/* Distance Circle */}
        <Animated.View
          style={[
            styles.distanceCircle,
            {
              transform: [{ scale: pulseAnim }],
            },
          ]}
        >
          <Text style={styles.distanceValue}>{distance.toFixed(2)}</Text>
          <Text style={styles.distanceUnit}>Steps</Text>
        </Animated.View>

        {/* Time */}
        <View style={styles.timeContainer}>
          <Text style={styles.timeLabel}>Time</Text>
          <Text style={styles.timeValue}>{formatTime(time)}</Text>
        </View>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <View style={styles.statBox}>
          <Ionicons name="pulse-outline" size={24} color="#FF6B35" />
          <Text style={styles.statBoxValue}>{pace.toFixed(2)}</Text>
          <Text style={styles.statBoxLabel}>GCT</Text>
        </View>
        <View style={styles.statBox}>
          <Ionicons name="walk-outline" size={24} color="#FF6B35" />
          <Text style={styles.statBoxValue}>{Math.round(distance * 60)}</Text>
          <Text style={styles.statBoxLabel}>Cadence</Text>
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.controlButton, styles.stopButton]}
          onPress={handleFinish}
          activeOpacity={0.8}
        >
          <Ionicons name="stop" size={32} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Running Indicator */}
      <View style={styles.indicator}>
        <View style={[styles.dot, isRunning && styles.dotActive]} />
        <Text style={styles.indicatorText}>
          {isRunning ? "Running..." : "Paused"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F0F",
    justifyContent: "space-between",
    paddingTop: 40,
  },
  statusBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#1a1a1a",
  },
  statusItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statusText: {
    color: "#FF6B35",
    fontSize: 14,
    fontWeight: "600",
  },
  display: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
  },
  distanceCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#1a1a1a",
    borderWidth: 2,
    borderColor: "#FF6B35",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FF6B35",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  distanceValue: {
    fontSize: 56,
    fontWeight: "800",
    color: "#FF6B35",
  },
  distanceUnit: {
    fontSize: 18,
    color: "#999",
    marginTop: 4,
  },
  timeContainer: {
    alignItems: "center",
  },
  timeLabel: {
    fontSize: 14,
    color: "#999",
    marginBottom: 8,
    fontWeight: "600",
  },
  timeValue: {
    fontSize: 42,
    fontWeight: "800",
    color: "#fff",
    fontVariant: ["tabular-nums"],
  },
  statsGrid: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 30,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  statBoxValue: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FF6B35",
    marginTop: 8,
  },
  statBoxLabel: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
    fontWeight: "600",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    paddingBottom: 30,
  },
  controlButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  pauseButton: {
    backgroundColor: "#FF9500",
    shadowColor: "#FF9500",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  stopButton: {
    backgroundColor: "#DC2626",
    shadowColor: "#DC2626",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  indicator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#666",
  },
  dotActive: {
    backgroundColor: "#FF6B35",
    shadowColor: "#FF6B35",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 4,
  },
  indicatorText: {
    color: "#999",
    fontSize: 14,
    fontWeight: "600",
  },
});
