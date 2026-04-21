import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hola, soy tu asistente de FoodieApp. Puedo ayudarte con recomendaciones de comida, pedidos y sugerencias.",
      sender: "bot",
    },
  ]);

  const generarRespuestaIA = (textoUsuario) => {
    const texto = textoUsuario.toLowerCase().trim();

    if (
      texto.includes("hambre") ||
      texto.includes("qué comer") ||
      texto.includes("que comer")
    ) {
      return "Si tienes mucha hambre, te recomiendo una hamburguesa con papas o una pizza personal. Son opciones rápidas y completas.";
    }

    if (
      texto.includes("dulce") ||
      texto.includes("postre") ||
      texto.includes("antojo")
    ) {
      return "Si buscas algo dulce, unas mini donitas con chocolate o un postre frío pueden ser una muy buena opción.";
    }

    if (
      texto.includes("rápido") ||
      texto.includes("rapido") ||
      texto.includes("urgente")
    ) {
      return "Para algo rápido, puedes elegir perros calientes, papas especiales o una hamburguesa sencilla.";
    }

    if (
      texto.includes("bebida") ||
      texto.includes("tomar") ||
      texto.includes("sed")
    ) {
      return "Puedes acompañar tu pedido con gaseosa, té frío o una bebida más ligera según tu preferencia.";
    }

    if (
      texto.includes("saludable") ||
      texto.includes("liviano") ||
      texto.includes("ligero")
    ) {
      return "Si prefieres algo más ligero, una ensalada o una opción con menos fritos sería ideal.";
    }

    if (texto.includes("gracias")) {
      return "Con gusto. Estoy aquí para ayudarte con tus pedidos y recomendaciones.";
    }

    if (texto.includes("hola") || texto.includes("buenas")) {
      return "Hola. Cuéntame qué tipo de comida estás buscando hoy.";
    }

    return "Puedo ayudarte con recomendaciones de comida, bebidas, antojos o sugerencias según lo que quieras pedir.";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: "user",
    };

    const botMessage = {
      id: Date.now() + 1,
      text: generarRespuestaIA(input),
      sender: "bot",
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
  };

  const renderMessage = ({ item }) => {
    const isUser = item.sender === "user";

    return (
      <View
        style={[
          styles.messageBubble,
          isUser ? styles.userMessage : styles.botMessage,
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    );
  };

  return (
    <>
      {!isOpen && (
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => setIsOpen(true)}
        >
          <Text style={styles.floatingButtonText}>IA</Text>
        </TouchableOpacity>
      )}

      {isOpen && (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.chatContainer}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Asistente Foodie</Text>
            <TouchableOpacity onPress={() => setIsOpen(false)}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={messages}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderMessage}
            showsVerticalScrollIndicator={false}
            style={styles.messagesList}
          />

          <TextInput
            placeholder="Escribe tu consulta..."
            value={input}
            onChangeText={setInput}
            style={styles.input}
          />

          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendButtonText}>Enviar</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: 25,
    right: 20,
    backgroundColor: "#f97316",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    zIndex: 999,
  },

  floatingButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  chatContainer: {
    position: "absolute",
    bottom: 20,
    right: 15,
    width: "92%",
    height: "70%",
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 15,
    elevation: 8,
    zIndex: 999,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  closeButton: {
    fontSize: 20,
    fontWeight: "bold",
  },

  messagesList: {
    flex: 1,
    marginBottom: 10,
  },

  messageBubble: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    maxWidth: "80%",
  },

  userMessage: {
    backgroundColor: "#dbeafe",
    alignSelf: "flex-end",
  },

  botMessage: {
    backgroundColor: "#f1f5f9",
    alignSelf: "flex-start",
  },

  messageText: {
    fontSize: 14,
  },

  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },

  sendButton: {
    backgroundColor: "#f97316",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
