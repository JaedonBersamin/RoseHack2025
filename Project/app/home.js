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
        { id: 1, text: "Complete daily workout", xp: 10 },
        { id: 2, text: "Finish coding challenge", xp: 10 },
        { id: 3, text: "Read 10 pages of a book", xp: 10 },
        { id: 4, text: "Practice piano for 30 minutes", xp: 10 },
        { id: 5, text: "Write in journal", xp: 10 },
        { id: 6, text: "Meditate for 10 minutes", xp: 10 },
        { id: 7, text: "Learn 5 new vocabulary words", xp: 10 },
        { id: 8, text: "Drink 2 liters of water", xp: 10 },
        { id: 9, text: "Organize workspace", xp: 10 },
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
            let newXP = prevXP + task.xp;
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
                        source={{ uri: "https://via.placeholder.com/40" }}
                        style={styles.profileImage}
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

// Sub-component to handle each task's fade-out
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
            {/* Checkbox (Pressable) */}
            <Pressable onPress={handlePress} style={styles.checkbox}>
                <Text style={styles.checkmark}>✓</Text>
            </Pressable>

            {/* Task text + XP */}
            <Text style={styles.taskText}>
                {item.text} <Text style={styles.xpText}>({item.xp} XP)</Text>
            </Text>
        </Animated.View>
    );
}

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFDD0", // Cream background
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#4CAF50", // Green streak bar
        padding: 10,
    },
    streakCounter: {
        color: "white",
        fontSize: 18,
    },
    xpBarContainer: {
        flex: 1,
        marginHorizontal: 10,
    },
    xpBar: {
        height: 10,
        backgroundColor: "#F4F4F4",
        borderRadius: 5,
        overflow: "hidden",
        position: "relative",
    },
    xpFill: {
        position: "absolute",
        height: "100%",
        backgroundColor: "#3646", // Green fill
    },
    xpHashMark: {
        position: "absolute",
        top: 0,
        bottom: 0,
        width: 1,
        backgroundColor: "#4CAF50",
    },
    profilePicture: {
        width: 40,
        height: 40,
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
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
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
        opacity: 0.0, // Hidden until pressed (or you can remove the checkmark text altogether)
    },
    taskText: {
        flex: 1,
        color: "#333",
        fontSize: 16,
    },
    xpText: {
        color: "#666",
        fontStyle: "italic",
        fontSize: 14,
    },
});