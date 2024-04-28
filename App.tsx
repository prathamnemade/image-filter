import { StyleSheet, Text } from "react-native";
import Background from "./Background";
import { useImage } from "@shopify/react-native-skia";

export default function App() {
  const image = useImage(require("./assets/background.jpg"));

  if (!image) return <Text>Loading....</Text>;
  return <Background image={image} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
