import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>

      {/* Temporary user information.
          Later, this will come from the logged-in user's account. */}
      <Text style={styles.name}>Noman Khan</Text>
      <Text style={styles.email}>noman@example.com</Text>

      <Pressable
        style={styles.button}
        onPress={() => alert("Edit Profile coming soon.")}
      >
        <Text style={styles.buttonText}>Edit Profile</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => router.push("/settings")}>
        <Text style={styles.buttonText}>Settings</Text>
      </Pressable>

      <Pressable
        style={styles.logoutButton}
        onPress={() => alert("Logout coming soon.")}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
  },

  email: {
    fontSize: 16,
    marginTop: 8,
    marginBottom: 30,
  },

  button: {
    width: "80%",
    paddingVertical: 14,
    backgroundColor: "#333",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },

  logoutButton: {
    width: "80%",
    paddingVertical: 14,
    backgroundColor: "#777",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
