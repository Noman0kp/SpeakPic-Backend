import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <Pressable
        style={styles.option}
        onPress={() => alert("Notifications settings coming soon.")}
      >
        <Text style={styles.optionText}>Notifications</Text>
      </Pressable>

      <Pressable
        style={styles.option}
        onPress={() => alert("Dark Mode coming soon.")}
      >
        <Text style={styles.optionText}>Dark Mode</Text>
      </Pressable>

      <Pressable
        style={styles.option}
        onPress={() => alert("Account settings coming soon.")}
      >
        <Text style={styles.optionText}>Account</Text>
      </Pressable>

      <Pressable
        style={styles.option}
        onPress={() => alert("SpeakPic - Your memories, kept with you.")}
      >
        <Text style={styles.optionText}>About SpeakPic</Text>
      </Pressable>

      <Pressable
        style={styles.backButton}
        onPress={() => router.push("/profile")}
      >
        <Text>Go Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
  },

  option: {
    width: "90%",
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
  },

  optionText: {
    fontSize: 17,
  },

  backButton: {
    marginTop: 15,
  },
});
