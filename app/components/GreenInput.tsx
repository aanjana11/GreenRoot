import { TextInput } from "react-native";

export default function GreenInput(props: any) {
  return (
    <TextInput
      {...props}
      placeholderTextColor="#4D7C0F"
      style={{
        borderWidth: 1,
        borderColor: "#86EFAC",
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 14,
        marginBottom: 16,
      }}
    />
  );
}