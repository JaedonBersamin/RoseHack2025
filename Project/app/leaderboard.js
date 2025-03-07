import React, { useState, useRef } from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    Pressable,
    Animated, // for fade-out animation
} from "react-native";

const XP_NEEDED = 100;

// Parent Component
export default function App() {
    // Simple list of tasks, each with 10 XP
    const initialTasks = [
        { id: 1, text: "You", level: 26},
        { id: 2, text: "Roro", level: 23 },
        { id: 3, text: "Andrew", level: 20},
        { id: 4, text: "Patrick", level: 19},
        { id: 5, text: "Brady", level: 17},
        { id: 6, text: "David", level: 16},
        { id: 7, text: "Alecia", level: 15},
        { id: 8, text: "Sam", level: 12},
        { id: 9, text: "George", level: 9},
    ];

    const [tasks, setTasks] = useState(initialTasks);
    const [totalXP, setTotalXP] = useState(0);

    // When the fade-out completes, remove the task from the list and update XP
    const handleTaskComplete = (taskId) => {
        // Find the task's XP
        const task = tasks.find((t) => t.id === taskId);
        if (!task) return;

        // Update total XP
        setTotalXP((prevXP) => {
            let newXP = prevXP + task.level;
            if (newXP >= XP_NEEDED) {
                newXP = newXP - XP_NEEDED; // Simple "level up" reset
            }
            return newXP;
        });

        // Remove the task from the array
        setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId));
    };

    // XP bar fill percentage
    const xpFillWidth = `${Math.min((totalXP / XP_NEEDED) * 100, 100)}%`;

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                {/* Streak (fire emoji with number) */}
                <Text style={styles.streakCounter}>🔥7</Text>


                {/* XP Bar */}
                <View style={styles.xpBarContainer}>
                    <View style={styles.xpBar}>
                        {/* Hashmarks */}
                        {Array.from({ length: 5 }, (_, i) => (
                            <View
                                key={i}
                                style={[
                                    styles.xpHashMark,
                                    { left: `${((i + 1) * 100) / 6}%` },
                                ]}
                            />
                        ))}
                        {/* Fill */}
                        <View style={[styles.xpFill, { width: xpFillWidth }]} />
                    </View>
                </View>

                {/* Profile Picture */}
                <View style={styles.profilePicture}>
                    <Image
                        source={require('../assets/clyd.png')}
                        style={styles.profileImage}s
                    />
                </View>
            </View>

            {/* Scrollable list of TaskItems */}
            <ScrollView style={styles.tasksContainer}>
                {tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        item={task}
                        onComplete={handleTaskComplete}
                    />
                ))}
            </ScrollView>
        </View>
    );
}

function TaskItem({ item, onComplete }) {
    // Animate from opacity=1 to opacity=0
    const fadeAnim = useRef(new Animated.Value(1)).current;

    const handlePress = () => {
        // Trigger fade-out
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
        }).start(() => {
            // Once fade is done, notify parent to remove task & update XP
            onComplete(item.id);
        });
    };

    return (
        <Animated.View style={[styles.taskBox, { opacity: fadeAnim }]}>
            {/* Task text + XP */}
            <Text style={styles.taskText}>
                {item.text} <Text style={styles.xpText}>(LVL {item.level})</Text>
            </Text>
        </Animated.View>
    );
}

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f6f6f6", // Cream background
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#4CAF50", // Green streak bar
        padding: 30,
    },
    streakCounter: {
        color: "white",
        marginTop: 20,
        fontSize: 33,
    },
    xpBarContainer: {
        flex: 1,
        marginTop: 20,
        marginHorizontal: 20,
    },
    xpBar: {
        height: 15,
        backgroundColor: "#F4F4F4",
        borderRadius: 5,
        overflow: "hidden",
        position: "relative",
    },
    xpFill: {
        position: "absolute",
        height: "100%",
        backgroundColor: "lightblue", // Green fill
    },
    xpHashMark: {
        position: "absolute",
        top: 0,
        bottom: 0,
        width: 1,
        backgroundColor: "#4CAF50",
    },
    profilePicture: {
        width: 45,
        height: 45,
        marginTop: 20,
        borderRadius: 20,
        backgroundColor: "white",
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
    },
    profileImage: {
        width: "100%",
        height: "100%",
        borderRadius: 20,
    },
    tasksContainer: {
        flex: 1,
        margin: 10,
    },
    // Individual task box
    taskBox: {
        flexDirection: "row", // Keep the row layout for checkbox and text
        alignItems: "center", // Center items horizontally
        justifyContent: "center", // Center items vertically
        width: "100%",
        height: '20%',
        backgroundColor: "#ECECEC",
        borderWidth: 2,
        borderColor: "#8B4513", // Brown accent
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: "#4CAF50", // Green accent
        borderRadius: 4,
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
    },
    checkmark: {
        color: "#4CAF50",
        fontWeight: "bold",
        opacity: 0.0,
    },
    taskText: {
        color: "#333",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center", // Center the text horizontally
        flexShrink: 1, // Prevent text from overflowing
    },
    xpText: {
        color: "#666",
        fontStyle: "italic",
        fontSize: 14,
    },
});