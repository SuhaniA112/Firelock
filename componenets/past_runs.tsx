import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CadenceInterval {
  timestamp: number;
  cadence: number;
}

interface GCTInterval {
  timestamp: number;
  gct_ms: number;
}

interface UserData {
  date: string;
  day_of_week: string;
  time_of_day: string;
  avg_cadence: number;
  avg_gct: number;
  time: number;
  steps: number;
  split_cadence_over_time: CadenceInterval[];
  gct_over_time: GCTInterval[];
}

export default function RunCard({ data }: { data: UserData }) {
  // Convert seconds to minutes
  const minutes = Math.floor(data.time / 60);

  return (
    <View style={styles.runCard}>
      <View style={styles.runInfo}>
        <Text style={styles.runDistance}>{data.date}</Text>
        <Text style={styles.runTime}>{minutes} minutes</Text>
        <Text style={styles.runTime}>{data.steps} steps</Text>
        <Text style={styles.runPace}>{data.avg_cadence} avg. GCT</Text>
      </View>
    </View>
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
