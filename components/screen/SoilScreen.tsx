import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import CustomButton from "..//CustomButton";
import CustomInput from "..//CustomInput";

const SoilScreen = () => {
  const [ph, setPh] = useState("");
  const [n, setN] = useState("");
  const [p, setP] = useState("");
  const [k, setK] = useState("");

  const [result, setResult] = useState("");

  const analyzeSoil = () => {
    const phVal = parseFloat(ph);
    const nVal = parseFloat(n);
    const pVal = parseFloat(p);
    const kVal = parseFloat(k);

    let recommendation = "";

    // Simple Rule-based logic
    if (phVal < 6.5) recommendation += "Soil acidic. Add lime.\n";
    if (phVal > 7.5) recommendation += "Soil alkaline. Add sulfur.\n";
    if (nVal < 50) recommendation += "Low Nitrogen. Use Urea.\n";
    if (pVal < 30) recommendation += "Low Phosphorus. Use DAP.\n";
    if (kVal < 100) recommendation += "Low Potassium. Use Potash.\n";

    if (recommendation === "") recommendation = "Soil is good 👍";

    setResult(recommendation);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Soil Analysis</Text>

      <CustomInput placeholder="pH value" value={ph} onChangeText={setPh} />
      <CustomInput placeholder="Nitrogen (N)" value={n} onChangeText={setN} />
      <CustomInput placeholder="Phosphorus (P)" value={p} onChangeText={setP} />
      <CustomInput placeholder="Potassium (K)" value={k} onChangeText={setK} />

      <CustomButton title="Analyze" onPress={analyzeSoil} />

      {result !== "" && (
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>{result}</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default SoilScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },
  resultBox: {
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: "#2E8B57",
    borderRadius: 10,
    backgroundColor: "#f0fff0",
  },
  resultText: {
    color: "#2E8B57",
    fontSize: 16,
  },
});