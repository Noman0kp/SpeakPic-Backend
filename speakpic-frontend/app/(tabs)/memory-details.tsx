import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";

import { router, useLocalSearchParams } from "expo-router";

export default function MemoryDetailsScreen() {
  // Get the memory information passed through the URL parameters.
  const { title, date } = useLocalSearchParams();

  // Temporary description until we load real data from the backend.
  const description = "This is where the memory description will appear.";

  // Temporary image until real memory data comes from the backend.
  const imageUri = "https://picsum.photos/400/400";

  // Temporary voice playback action.
  const playVoice = () => {
    Alert.alert("Voice", "Voice playback will be connected later.");
  };

  // Temporary edit action.
  const editMemory = () => {
    Alert.alert("Edit Memory", "Memory editing will be added later.");
  };

  // Temporary delete action.
  const deleteMemory = () => {
    Alert.alert(
      "Delete Memory",
      "Are you sure you want to delete this memory?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            // Temporary behaviour until the backend is connected.
            router.push("/memories");
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Memory Details</Text>

      {/* Display the memory photo. */}
      <Image source={{ uri: imageUri }} style={styles.memoryImage} />

      {/* Display the memory title. */}
      <Text style={styles.title}>{title}</Text>

      {/* Display the memory date. */}
      <Text style={styles.date}>{date}</Text>

      {/* Display the memory description. */}
      <Text style={styles.description}>{description}</Text>

      {/* Play the recorded voice. */}
      <Pressable style={styles.button} onPress={playVoice}>
        <Text style={styles.buttonText}>▶ Play Voice</Text>
      </Pressable>

      {/* Edit the memory. */}
      <Pressable style={styles.button} onPress={editMemory}>
        <Text style={styles.buttonText}>Edit Memory</Text>
      </Pressable>

      {/* Delete the memory. */}
      <Pressable style={styles.deleteButton} onPress={deleteMemory}>
        <Text style={styles.buttonText}>Delete Memory</Text>
      </Pressable>

      {/* Return to the previous screen. */}
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Go Back</Text>
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

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  memoryImage: {
    width: 250,
    height: 250,
    borderRadius: 12,
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },

  date: {
    fontSize: 14,
    marginTop: 8,
  },

  description: {
    width: "90%",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 20,
    marginBottom: 25,
    textAlign: "center",
  },

  button: {
    width: "65%",
    paddingVertical: 13,
    backgroundColor: "#555",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },

  deleteButton: {
    width: "65%",
    paddingVertical: 13,
    backgroundColor: "#8B0000",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  backButton: {
    marginTop: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  backButtonText: {
    fontSize: 16,
  },
});
