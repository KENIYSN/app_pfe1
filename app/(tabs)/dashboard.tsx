import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Svg, Circle , } from "react-native-svg";
import { Theme } from './theme';
{/*import { LineChart } from 'react-native-svg-charts';*/}
import Animated, { useSharedValue, useAnimatedProps, withTiming } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const DashboardScreen = () => {
  const progress = useSharedValue(0);
  
  useEffect(() => {
    progress.value = withTiming(0.75, { duration: 1000 });
  }, []);

  const strokeWidth = 10;
  const size = 120;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: circumference * (1 - progress.value),
    };
  });

  const lineData = [30, 50, 35, 60, 40, 70];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <Ionicons name="person-circle-outline" size={30} color="white" />
      </View>

      {/* Weekly Charts */}
      <Text style={styles.sectionTitle}>Weekly charts</Text>
      <View style={styles.chartContainer}>
     {/* <LineChart
          style={{ height: 120, width: "100%" }}
          data={lineData}
          svg={{ stroke: "#FCA311", strokeWidth: 2 }}
          contentInset={{ top: 20, bottom: 20 }}
        />*/}
      </View>

      {/* My Plan */}
      <Text style={styles.sectionTitle}>My Plan</Text>
      <View style={styles.planContainer}>
        <PlanCard time="11:00 AM" label="Weight" value="150 lbs" goal="Goal 190 lbs" />
        <PlanCard time="1:30 hr" label="Muscle" value="" goal="" />
        <PlanCard time="1:30 hr" label="Muscle" value="" goal="" />
        <PlanCard time="11:00 AM" label="Weight" value="150 lbs" goal="Goal 190 lbs" />
      </View>

      {/* Activity */}
      <Text style={styles.sectionTitle}>Activity</Text>
      <View style={styles.activityContainer}>
        <View style={styles.leftContainer}>
          <StatItem title="Steps 🏃" value="12.350" />
          <StatItem title="Distance 📏" value="1,45 Km" />
          <StatItem title="Calories Burned 🔥" value="359 Kcal" />
        </View>

        {/* Pie Chart */}
        <View style={styles.rightContainer}>
          <Svg width={size} height={size}>
            <Circle cx={size / 2} cy={size / 2} r={radius} stroke="#D9D9D9" strokeWidth={strokeWidth} fill="none" />
            <AnimatedCircle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#FCA311"
              strokeWidth={strokeWidth}
              fill="none"
              animatedProps={animatedProps}
              strokeLinecap="round"
              rotation="-30"
              originX={size / 2}
              originY={size / 2}
            />
          </Svg>
          <Text style={styles.kcalText}>565kcal</Text>

          <TouchableOpacity style={styles.modifyButton}>
            <Text style={styles.modifyText}>Modify</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
type PlanCardProps = {
  time: string;
  label: string;
  value?: string;  // Optionnel avec "?"
  goal?: string;
};

const PlanCard: React.FC<PlanCardProps> = ({ time, label, value, goal }) => (
  <View style={styles.planCard}>
    <Text style={styles.planTime}>{time}</Text>
    <Text style={styles.planLabel}>{label}</Text>
    {value ? <Text style={styles.planValue}>{value}</Text> : null}
    {goal ? <Text style={styles.planGoal}>{goal}</Text> : null}
  </View>
);

const StatItem = ({ title, value }: { title: string; value: string }) => (
  <View style={styles.statItem}>
    <Text style={styles.statTitle}>{title}</Text>
    <Text style={styles.statValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: Theme.colors.dark, 
    padding: Theme.paddings.lg 
  },
  header: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginBottom: Theme.spacing.lg 
  },
  title: { 
    fontSize: Theme.fontSizes.xxl, 
    fontFamily: Theme.fonts.bold, 
    color: Theme.colors.primary 
  },
  sectionTitle: { 
    fontSize: Theme.fontSizes.lg, 
    fontFamily: Theme.fonts.semiBold, 
    color: Theme.colors.white, 
    marginTop: Theme.spacing.lg, 
    marginBottom: Theme.spacing.md 
  },
  chartContainer: { 
    backgroundColor: Theme.colors.background, 
    borderRadius: Theme.radii.lg, 
    padding: Theme.paddings.md 
  },
  planContainer: { 
    flexDirection: "row", 
    flexWrap: "wrap", 
    justifyContent: "space-between" 
  },
  planCard: { 
    backgroundColor: "#333333", // Vous pourriez ajouter cette couleur au thème
    padding: Theme.paddings.md, 
    borderRadius: Theme.radii.lg, 
    width: "48%", 
    marginBottom: Theme.spacing.sm 
  },
  planTime: { 
    color: Theme.colors.primary, 
    fontSize: Theme.fontSizes.sm 
  },
  planLabel: { 
    color: Theme.colors.white, 
    fontSize: Theme.fontSizes.md, 
    fontFamily: Theme.fonts.semiBold 
  },
  planValue: { 
    color: Theme.colors.white, 
    fontSize: Theme.fontSizes.sm 
  },
  planGoal: { 
    backgroundColor: Theme.colors.primary, 
    color: Theme.colors.dark, 
    fontSize: Theme.fontSizes.sm, 
    paddingHorizontal: Theme.paddings.sm, 
    borderRadius: Theme.radii.sm 
  },
  activityContainer: { 
    flexDirection: "row", 
    backgroundColor: "#333333", // À ajouter au thème si utilisé fréquemment
    borderRadius: Theme.radii.lg, 
    padding: Theme.paddings.md 
  },
  leftContainer: { 
    flex: 1 
  },
  rightContainer: { 
    flex: 1, 
    alignItems: "center" 
  },
  statItem: { 
    marginBottom: Theme.spacing.sm 
  },
  statTitle: { 
    fontSize: Theme.fontSizes.sm, 
    color: Theme.colors.primary,
    fontFamily: Theme.fonts.medium 
  },
  statValue: { 
    fontSize: Theme.fontSizes.md, 
    color: Theme.colors.white,
    fontFamily: Theme.fonts.semiBold 
  },
  kcalText: { 
    position: "absolute", 
    top: "38%", 
    fontSize: Theme.fontSizes.lg, 
    fontFamily: Theme.fonts.bold, 
    color: Theme.colors.white 
  },
  modifyButton: { 
    backgroundColor: Theme.colors.primary, 
    paddingVertical: Theme.paddings.sm, 
    paddingHorizontal: Theme.paddings.lg, 
    borderRadius: Theme.radii.lg, 
    marginTop: Theme.spacing.md 
  },
  modifyText: { 
    color: Theme.colors.white, 
    fontFamily: Theme.fonts.semiBold,
    fontSize: Theme.fontSizes.sm 
  },
});

export default DashboardScreen;
