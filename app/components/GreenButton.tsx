import { Text, TouchableOpacity } from "react-native";

export default function GreenButton({ title, onPress }: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "#16A34A",
        padding: 16,
        borderRadius: 12,
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#FFFFFF", fontWeight: "600" }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}