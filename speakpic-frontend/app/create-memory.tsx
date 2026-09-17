import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useEffect, useState } from "react";

import {
  RecordingPresets,
  requestRecordingPermissionsAsync,
  setAudioModeAsync,
  useAudioPlayer,
  useAudioRecorder,
} from "expo-audio";

export default function CreateMemoryScreen() {
  // Stores the text entered in the title field.
  const [title, setTitle] = useState("");

  // Stores the text entered in the description field.
  const [description, setDescription] = useState("");

  // Stores the URI (location) of the selected/taken photo.
  const [imageUri, setImageUri] = useState("");

  // Tells us whether recording is currently happening.
  const [isRecording, setIsRecording] = useState(false);

  // Stores the URI (location) of the recorded audio.
  const [audioUri, setAudioUri] = useState("");

  // Stores recording duration in seconds.
  const [recordingTime, setRecordingTime] = useState(0);

  // Prepare the phone's audio system when this screen opens.
  useEffect(() => {
    const setupAudio = async () => {
      await setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      });
    };

    setupAudio();
  }, []);

  // Run a timer while voice recording is active.
  useEffect(() => {
    if (!isRecording) {
      return;
    }

    const timer = setInterval(() => {
      setRecordingTime((time) => time + 1);
    }, 1000);

    // Stop the timer when recording stops or screen is removed.
    return () => clearInterval(timer);
  }, [isRecording]);

  // Create the audio recorder using Expo's high-quality preset.
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);

  // Create an audio player using the recorded audio file.
  const player = useAudioPlayer(audioUri);

  // Open the phone gallery and allow the user to select an image.
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    // Only set the image if the user actually selected one.
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  // Open the camera and allow the user to take a photo.
  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    // Only set the image if the user actually took a photo.
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  // Ask the user whether they want Gallery or Camera.
  const choosePhoto = () => {
    Alert.alert("Choose Photo", "How would you like to add your photo?", [
      {
        text: "Gallery",
        onPress: pickImage,
      },
      {
        text: "Camera",
        onPress: takePhoto,
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  // Start recording the user's voice.
  const startRecording = async () => {
    // Ask Android for microphone permission.
    const permission = await requestRecordingPermissionsAsync();

    if (!permission.granted) {
      alert("Microphone permission is required to record voice.");
      return;
    }

    // Prepare the recorder before starting.
    await audioRecorder.prepareToRecordAsync();

    // Reset the timer for a new recording.
    setRecordingTime(0);

    // Start recording.
    audioRecorder.record();

    // Update the UI to show that recording is active.
    setIsRecording(true);
  };

  // Stop the current voice recording.
  const stopRecording = async () => {
    // Stop recording.
    await audioRecorder.stop();

    // Get the location of the recorded audio file.
    if (audioRecorder.uri) {
      setAudioUri(audioRecorder.uri);

      // Change audio mode back after recording.
      await setAudioModeAsync({
        allowsRecording: false,
        playsInSilentMode: true,
      });
    }

    // Hide the recording UI.
    setIsRecording(false);
  };

  // Play the recorded voice.
  const playVoice = () => {
    player.play();
  };

  // Save button logic.
  const saveMemory = () => {
    // Check that all required information has been provided.
    if (!title || !description || !imageUri || !audioUri) {
      alert("Please complete all fields.");
      return;
    }

    // Temporary behaviour until the backend is connected.
    Alert.alert("Memory Ready", "Your memory is ready to be saved.", [
      {
        text: "OK",
        onPress: () => {
          // Temporary navigation until real backend saving is implemented.
          router.push({
            pathname: "/memory-details",
            params: {
              title: title,
              date: "Today",
            },
          });
        },
      },
    ]);
  };

  // Convert seconds into MM:SS format.
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);

    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Memory</Text>

      {/* User enters the memory title here. */}
      <TextInput
        style={styles.input}
        placeholder="Memory Title"
        value={title}
        onChangeText={setTitle}
      />

      {/* User enters the memory description here. */}
      <TextInput
        style={styles.descriptionInput}
        placeholder="Description"
        multiline={true}
        value={description}
        onChangeText={setDescription}
      />

      {/* Button for choosing a photo from Gallery or Camera. */}
      <Pressable style={styles.button} onPress={choosePhoto}>
        <Text style={styles.buttonText}>Add Photo</Text>
      </Pressable>

      {/* Show the selected photo on the screen. */}
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.previewImage} />
      )}

      {/* Show recording controls only while recording. */}
      {isRecording && (
        <View style={styles.recordingContainer}>
          <Text style={styles.recordingText}>Recording...</Text>

          <Text style={styles.microphone}>🎙️</Text>

          <Text style={styles.timer}>{formatTime(recordingTime)}</Text>

          <Pressable style={styles.button} onPress={stopRecording}>
            <Text style={styles.buttonText}>Stop Recording</Text>
          </Pressable>
        </View>
      )}

      {/* Show Record Voice only when we are not recording. */}
      {!isRecording && (
        <Pressable style={styles.button} onPress={startRecording}>
          <Text style={styles.buttonText}>🎙️ Record Voice</Text>
        </Pressable>
      )}

      {/* Show Play Voice after a recording exists. */}
      {audioUri && !isRecording && (
        <Pressable style={styles.button} onPress={playVoice}>
          <Text style={styles.buttonText}>▶ Play Voice</Text>
        </Pressable>
      )}

      {/* Save the completed memory. */}
      <Pressable style={styles.saveButton} onPress={saveMemory}>
        <Text style={styles.buttonText}>Save Memory</Text>
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

  input: {
    width: "90%",
    height: 50,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },

  descriptionInput: {
    width: "90%",
    height: 120,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,

    // Keeps typed text at the top of the large input box.
    textAlignVertical: "top",
  },

  button: {
    width: "50%",
    paddingVertical: 14,
    backgroundColor: "#555",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },

  saveButton: {
    width: "50%",
    paddingVertical: 14,
    backgroundColor: "#333",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  previewImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },

  recordingContainer: {
    alignItems: "center",
    marginBottom: 15,
  },

  recordingText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  microphone: {
    fontSize: 45,
    marginBottom: 15,
  },

  timer: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
});
