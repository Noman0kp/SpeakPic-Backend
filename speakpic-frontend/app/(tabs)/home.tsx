import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { router } from "expo-router";

// Temporary memory data.
// Later this will come from the Spring Boot backend.
const recentMemories = [
  {
    id: "1",
    title: "Grandma's Birthday",
    date: "12 August 2026",
  },
  {
    id: "2",
    title: "College Memories",
    date: "20 July 2026",
  },
  {
    id: "3",
    title: "Trip to Kashmir",
    date: "05 June 2026",
  },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to SpeakPic 👋</Text>

      <Text style={styles.subtitle}>Keep your memories alive.</Text>

      <Text style={styles.sectionTitle}>Recent Memories</Text>

      {/* Display the recent memories as a scrollable list. */}
      <FlatList
        style={styles.memoryList}
        data={recentMemories}
        // Each memory needs a unique key.
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.memoryCard}
            // Open the details screen when a memory is tapped.
            onPress={() =>
              router.push({
                pathname: "/memory-details",
                params: {
                  id: item.id,
                  title: item.title,
                  date: item.date,
                },
              })
            }
          >
            <Text style={styles.memoryTitle}>{item.title}</Text>

            <Text style={styles.memoryDate}>{item.date}</Text>
          </Pressable>
        )}
      />

      {/* Open the complete memories list. */}
      <Pressable style={styles.button} onPress={() => router.push("/memories")}>
        <Text style={styles.buttonText}>View All Memories</Text>
      </Pressable>

      {/* Open the Create Memory screen. */}
      <Pressable
        style={styles.button}
        onPress={() => router.push("/create-memory")}
      >
        <Text style={styles.buttonText}>+ Create Memory</Text>
      </Pressable>

      {/* Open the user's profile. */}
      <Pressable
        style={styles.profileButton}
        onPress={() => router.push("/profile")}
      >
        <Text style={styles.profileButtonText}>Profile</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 20,
  },

  subtitle: {
    fontSize: 17,
    marginTop: 8,
    marginBottom: 25,
  },

  sectionTitle: {
    width: "100%",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },

  memoryList: {
    width: "100%",
    flexGrow: 0,
    marginBottom: 15,
  },

  memoryCard: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },

  memoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  memoryDate: {
    fontSize: 14,
    marginTop: 6,
  },

  button: {
    width: "75%",
    paddingVertical: 13,
    backgroundColor: "#555",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  profileButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },

  profileButtonText: {
    fontSize: 16,
  },
});
