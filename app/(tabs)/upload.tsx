import { api } from "@/api/api";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from "react-native";

export default function UploadImage() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  // 📁 Pick Image
  const pickImage = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        alert("Permission needed to access gallery");
        return;
      }

      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
      });

      if (res.canceled) return;

      const uri = res.assets[0].uri;

      setImageUri(uri);
      uploadImage(uri);
    } catch (err) {
      console.log(err);
    }
  };

  // 📤 Upload to API
  const uploadImage = async (uri: string) => {
    try {
      setLoading(true);
      setResult(null);

      const formData = new FormData();
      formData.append("image", {
        uri,
        name: "soil.jpg",
        type: "image/jpeg",
      } as any);

      const response = await api.post("/api/predict-soil/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
      setResult(response.data);
    } catch (err) {
      console.log("Upload error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      
      {/* Upload Button */}
      {!imageUri && (
        <View style={styles.uploadContainer}>
          <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
            <Ionicons name="cloud-upload" size={40} color="#fff" />
            <Text style={styles.uploadText}>Upload Soil Image</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Preview + Result */}
      {imageUri && (
        <View style={styles.resultContainer}>
          
          {/* Preview */}
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
              <Text>
                Confidence: {(result.confidence * 100).toFixed(2)}%
              </Text>

              <Text style={{ marginTop: 10, fontWeight: "600" }}>
                Recommended Crops:
              </Text>

              {result.recommended_crops.map((crop: string, i: number) => (
                <Text key={i}>• {crop}</Text>
              ))}
            </View>
          )}

          {/* Upload Another */}
          <TouchableOpacity
            style={styles.retakeButton}
            onPress={() => {
              setImageUri(null);
              setResult(null);
            }}
          >
            <Text style={{ color: "#fff" }}>Upload Another Image</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  uploadContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  uploadButton: {
    width: 200,
    height: 200,
    borderRadius: 20,
    backgroundColor: "#16A34A",
    justifyContent: "center",
    alignItems: "center",
  },

  uploadText: {
    color: "#fff",
    marginTop: 10,
    fontWeight: "600",
    fontSize: 16,
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
});
