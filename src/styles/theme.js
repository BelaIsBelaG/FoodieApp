import { Platform } from "react-native";

const colors = {
  background:
    Platform.OS === "ios"
      ? "#0f172a" // iOS más oscuro
      : "#1e3a8a", // Android más claro

  card:
    Platform.OS === "ios"
      ? "#1e293b"
      : "#2563eb",

  input:
    Platform.OS === "ios"
      ? "#ffffff"
      : "#f8fafc",

  text:
    "#ffffff",

  subtitle:
    Platform.OS === "ios"
      ? "#e2e8f0"
      : "#dbeafe",

  button:
    Platform.OS === "ios"
      ? "#f97316"
      : "#fb923c",
};

export default colors;