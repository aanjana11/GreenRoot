import { api } from "@/api/api";
import { Ionicons } from "@expo/vector-icons";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  const cameraRef = useRef<any>(null);

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const takePictureAndSend = async () => {
    try {
      if (!cameraRef.current) return;

      setResult(null);
      setLoading(true);

      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.7,
      });

      setImageUri(photo.uri);

      const formData = new FormData();
      formData.append("image", {
        uri: photo.uri,
        name: "soil.jpg",
        type: "image/jpeg",
      } as any);

      const response = await api.post("/api/predict-soil/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("API Response:", response.data);
      setResult(response.data);
    } catch (err) {
      console.log("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!permission) {
    return <Text style={styles.text}>Loading camera...</Text>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.text}>We need camera permission</Text>
        <TouchableOpacity
          onPress={requestPermission}
          style={styles.permissionButton}
        >
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Camera */}
      {!imageUri && (
        <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
          <View style={styles.cameraButtons}>
            <TouchableOpacity
              onPress={() =>
                setFacing((p) => (p === "back" ? "front" : "back"))
              }
              style={styles.switchButton}
            >
              <Ionicons name="camera-reverse" size={28} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={takePictureAndSend}
              style={styles.captureButton}
            >
              <Ionicons name="camera" size={32} color="#fff" />
            </TouchableOpacity>
          </View>
        </CameraView>
      )}

      {/* Preview + Result */}
      {imageUri && (
        <View style={styles.resultContainer}>
          {/* Image Preview */}
          <Image source={{ uri: imageUri }} style={styles.previewImage} />

          {/* Loading */}
          {loading && (
            <View style={{ marginTop: 20 }}>
              <ActivityIndicator size="large" />
              <Text style={{ marginTop: 10 }}>Analyzing soil...</Text>
            </View>
          )}

          {/* Result */}
          {!loading && result && (
            <View style={styles.resultBox}>
              <Text style={styles.resultTitle}>Prediction Result</Text>

              <Text>Soil Type: {result.soil_type}</Text>
              <Text>Confidence: {(result.confidence * 100).toFixed(2)}%</Text>

              <Text style={{ marginTop: 10, fontWeight: "600" }}>
                Recommended Crops:
              </Text>

              {result.recommended_crops.map((crop: string, i: number) => (
                <Text key={i}>• {crop}</Text>
              ))}
            </View>
          )}

          {/* Retake */}
          <TouchableOpacity
            style={styles.retakeButton}
            onPress={() => {
              setImageUri(null);
              setResult(null);
            }}
          >
            <Text style={{ color: "#fff" }}>Take Another Photo</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  camera: { flex: 1 },

  cameraButtons: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 30,
    gap: 20,
  },

  switchButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#16A34A",
    justifyContent: "center",
    alignItems: "center",
  },

  captureButton: {
    width: 75,
    height: 75,
    borderRadius: 40,
    backgroundColor: "#064E3B",
    justifyContent: "center",
    alignItems: "center",
  },

  resultContainer: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },

  previewImage: {
    width: "100%",
    height: 300,
    borderRadius: 12,
  },

  resultBox: {
    marginTop: 20,
    width: "100%",
    backgroundColor: "#ECFDF5",
    padding: 15,
    borderRadius: 12,
  },

  resultTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },

  retakeButton: {
    marginTop: 25,
    backgroundColor: "#16A34A",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },

  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  permissionButton: {
    marginTop: 20,
    backgroundColor: "#16A34A",
    padding: 12,
    borderRadius: 8,
  },

  permissionButtonText: {
    color: "#fff",
    fontWeight: "600",
  },

  text: {
    fontSize: 18,
    textAlign: "center",
  },
});
