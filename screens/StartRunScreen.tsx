import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function StartRunScreen({ navigation }: any) {
  const [goal, setGoal] = useState("5");
  const [runType, setRunType] = useState("free");

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Start Your Run</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Motivational Message */}
      <View style={styles.motivationCard}>
        <Ionicons name="flame" size={32} color="#FF6B35" />
        <Text style={styles.motivationText}>Time to crush your goals!</Text>
      </View>

      {/* Run Type Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Run Type</Text>
        <View style={styles.typeContainer}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              runType === "free" && styles.typeButtonActive,
            ]}
            onPress={() => setRunType("free")}
          >
            <Ionicons
              name="infinite"
              size={24}
              color={runType === "free" ? "#FF6B35" : "#999"}
            />
            <Text
              style={[
                styles.typeLabel,
                runType === "free" && styles.typeActive,
              ]}
            >
              Free Run
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.typeButton,
              runType === "distance" && styles.typeButtonActive,
            ]}
            onPress={() => setRunType("distance")}
          >
            <Ionicons
              name="map"
              size={24}
              color={runType === "distance" ? "#FF6B35" : "#999"}
            />
            <Text
              style={[
                styles.typeLabel,
                runType === "distance" && styles.typeActive,
              ]}
            >
              Distance Goal
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.typeButton,
              runType === "time" && styles.typeButtonActive,
            ]}
            onPress={() => setRunType("time")}
          >
            <Ionicons
              name="stopwatch"
              size={24}
              color={runType === "time" ? "#FF6B35" : "#999"}
            />
            <Text
              style={[
                styles.typeLabel,
                runType === "time" && styles.typeActive,
              ]}
            >
              Time Goal
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Distance Goal Input */}
      {(runType === "distance" || runType === "time") && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {runType === "distance"
              ? "Distance Goal (km)"
              : "Time Goal (minutes)"}
          </Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder={runType === "distance" ? "5" : "30"}
              placeholderTextColor="#666"
              value={goal}
              onChangeText={setGoal}
              keyboardType="decimal-pad"
            />
            <Text style={styles.inputUnit}>
              {runType === "distance" ? "km" : "min"}
            </Text>
          </View>
        </View>
      )}

      {/* Tips */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tips for Success</Text>
        <View style={styles.tipCard}>
          <Ionicons name="checkmark-circle" size={20} color="#FF6B35" />
          <Text style={styles.tipText}>
            Stay hydrated before and after your run
          </Text>
        </View>
        <View style={styles.tipCard}>
          <Ionicons name="checkmark-circle" size={20} color="#FF6B35" />
          <Text style={styles.tipText}>Warm up with a 5-minute walk</Text>
        </View>
        <View style={styles.tipCard}>
          <Ionicons name="checkmark-circle" size={20} color="#FF6B35" />
          <Text style={styles.tipText}>Focus on consistent pace</Text>
        </View>
      </View>

      {/* Begin Button */}
      <TouchableOpacity
        style={styles.beginButton}
        onPress={() => navigation.navigate("Running")}
        activeOpacity={0.8}
      >
        <Ionicons name="play-circle" size={28} color="#fff" />
        <Text style={styles.beginButtonText}>Begin Run</Text>
      </TouchableOpacity>

      <View style={styles.padding} />
    </ScrollView>
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
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  motivationCard: {
    marginHorizontal: 20,
    marginBottom: 30,
    backgroundColor: "#FF6B35",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  motivationText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 12,
  },
  typeContainer: {
    flexDirection: "row",
    gap: 12,
  },
  typeButton: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#2a2a2a",
  },
  typeButtonActive: {
    borderColor: "#FF6B35",
    backgroundColor: "#1a1a1a",
  },
  typeLabel: {
    fontSize: 12,
    color: "#999",
    marginTop: 8,
    fontWeight: "600",
    textAlign: "center",
  },
  typeActive: {
    color: "#FF6B35",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
  inputUnit: {
    fontSize: 14,
    color: "#FF6B35",
    fontWeight: "700",
  },
  tipCard: {
    flexDirection: "row",
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  tipText: {
    color: "#ccc",
    fontSize: 13,
    marginLeft: 12,
    flex: 1,
    lineHeight: 18,
  },
  beginButton: {
    marginHorizontal: 20,
    backgroundColor: "#FF6B35",
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: "#FF6B35",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  beginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 10,
  },
  padding: {
    height: 20,
  },
});
