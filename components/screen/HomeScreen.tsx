import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomButton from "../CustomButton";


const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Greenroot Home</Text>
      <CustomButton title="Soil Analysis" onPress={() => navigation.navigate("Soil")} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },
});