import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { router } from "expo-router";

// Temporary memory data.
// Later this list will come from the backend/database.
const memories = [
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

export default function MemoriesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Memories</Text>

      {/* Display all memories in a scrollable list. */}
      <FlatList
        style={styles.memoryList}
        data={memories}
        // React needs a unique key for every list item.
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.memoryCard}
            // Open details when the user selects a memory.
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

      {/* Allow the user to create another memory. */}
      <Pressable
        style={styles.button}
        onPress={() => router.push("/create-memory")}
      >
        <Text style={styles.buttonText}>+ Create Memory</Text>
      </Pressable>

      {/* Return to Home. */}
      <Pressable style={styles.backButton} onPress={() => router.push("/home")}>
        <Text style={styles.backButtonText}>Home</Text>
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
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 25,
  },

  memoryList: {
    width: "100%",
    flexGrow: 1,
  },

  memoryCard: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 10,
    padding: 18,
    marginBottom: 15,
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
    paddingVertical: 14,
    backgroundColor: "#333",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginBottom: 10,
  },

  backButtonText: {
    fontSize: 16,
  },
});
