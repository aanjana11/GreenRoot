import { Ionicons } from "@expo/vector-icons";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"home" | "camera" | "profile">(
    "home"
  );

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Text style={styles.text}>🏠 Home Screen</Text>;
      case "camera":
        return <CameraScreen />;
      case "profile":
        return <Text style={styles.text}>👤 Profile Screen</Text>;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.content}>{renderContent()}</View>

      <View style={styles.tabBar}>
        <TabButton
          icon="home"
          label="Home"
          active={activeTab === "home"}
          onPress={() => setActiveTab("home")}
        />

        <TabButton
          icon="camera"
          label="Camera"
          active={activeTab === "camera"}
          onPress={() => setActiveTab("camera")}
        />

        <TabButton
          icon="person"
          label="Profile"
          active={activeTab === "profile"}
          onPress={() => setActiveTab("profile")}
        />
      </View>
    </View>
  );
}

function TabButton({
  icon,
  label,
  active,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ alignItems: "center", flex: 1 }}
    >
      <Ionicons name={icon} size={24} color={active ? "#16A34A" : "#9CA3AF"} />
      <Text style={{ fontSize: 12, color: active ? "#16A34A" : "#9CA3AF" }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <Text style={styles.text}>Loading camera...</Text>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.text}>We need your permission to use the camera</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.permissionButton}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.cameraContainer}>
      <CameraView style={styles.camera} facing={facing}>
        <View style={styles.cameraButtons}>
          <TouchableOpacity
            onPress={() => {
              setFacing((prev) => (prev === "back" ? "front" : "back"));
            }}
            style={styles.switchButton}
          >
            <Ionicons name="camera-reverse" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: "#F0FDF4",
  },
  text: {
    fontSize: 24,
    fontWeight: "600",
    color: "#064E3B",
    textAlign: "center",
    marginTop: 20,
  },
  tabBar: {
    flexDirection: "row",
    height: 60,
    borderTopWidth: 1,
    borderColor: "#D1FAE5",
    backgroundColor: "#FFFFFF",
    paddingTop: 6,
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraButtons: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 20,
  },
  switchButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#16A34A",
    justifyContent: "center",
    alignItems: "center",
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  permissionButton: {
    marginTop: 20,
    backgroundColor: "#16A34A",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});