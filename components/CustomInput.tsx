import React from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

type Props = TextInputProps & {
  placeholder: string;
};

const CustomInput: React.FC<Props> = ({ placeholder, style, ...rest }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, style]}
        placeholder={placeholder}
        placeholderTextColor="#8f8f8f"
        {...rest}
      />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#2E8B57", // green border
    borderRadius: 10,
    paddingHorizontal: 16,
    color: "#000",
    backgroundColor: "#f0fff0",
  },
});