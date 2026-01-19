import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function SoilScreen() {
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F0FDF4",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    color: "#064E3B",
  },
  resultBox: {
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: "#16A34A",
    borderRadius: 10,
    backgroundColor: "#ECFDF5",
  },
  resultText: {
    color: "#065F46",
    fontSize: 16,
  },
});
