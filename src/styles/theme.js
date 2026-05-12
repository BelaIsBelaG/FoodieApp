import { Platform } from "react-native";

const colors = {
  // Fondo oscuro neutro para que las fotos de comida sean las protagonistas
  background:
    Platform.OS === "ios"
      ? "#000000" 
      : "#121212", 

  // Tarjetas en gris carbón para separar visualmente el contenido
  card:
    Platform.OS === "ios"
      ? "#1c1c1e"
      : "#1e1e1e",

  input: "#ffffff",
  text: "#ffffff",
  
  // Subtítulos en gris cálido para descripciones de ingredientes
  subtitle: "#a1a1aa",

  // COLOR PRINCIPAL: Naranja "Energy" (Psicología: estimula el apetito y la acción)
  button:
    Platform.OS === "ios"
      ? "#ff5200" 
      : "#f97316",

  // SOLUCIÓN DE CONTRASTE: Verde brillante para precios (Legible sobre fondos oscuros)
  price: "#4ade80", 

  // Color de acento para ofertas o elementos destacados (Amarillo felicidad)
  accent: "#facc15",
  
  // Fondo de burbujas de chat (Cremas y blancos)
  userBubble: "#ffedd5",
  botBubble: "#ffffff",
  chatText: "#1e293b"
};

export default colors;