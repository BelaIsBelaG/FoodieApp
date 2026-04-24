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
      text: "Hola, bienvenido a FoodieApp. Soy tu asistente virtual y estoy aquí para ayudarte con recomendaciones de comida, sugerencias personalizadas, pedidos, bebidas, promociones y todo lo relacionado con tu experiencia dentro de la aplicación. Cuéntame qué te gustaría pedir hoy.",
      sender: "bot",
    },
  ]);

  const generarRespuestaIA = (textoUsuario) => {
    const texto = textoUsuario.toLowerCase().trim();

    /*
    SALUDOS
    */
    if (
      texto.includes("hola") ||
      texto.includes("buenas") ||
      texto.includes("buen día") ||
      texto.includes("buen dia") ||
      texto.includes("hey")
    ) {
      return "Hola, bienvenido a FoodieApp. Soy tu asistente virtual y estoy aquí para ayudarte con recomendaciones de comida, sugerencias personalizadas, pedidos, bebidas, promociones y todo lo relacionado con tu experiencia dentro de la aplicación. Cuéntame qué te gustaría pedir hoy.";
    }

    /*
    HAMBRE / QUÉ COMER
    */
    if (
      texto.includes("hambre") ||
      texto.includes("qué comer") ||
      texto.includes("que comer") ||
      texto.includes("recomiéndame comida") ||
      texto.includes("recomienda comida")
    ) {
      return "Si tienes bastante hambre, te recomiendo una hamburguesa completa acompañada de papas especiales o una pizza personal con bebida. Son opciones muy completas, rápidas de preparar y bastante satisfactorias para una comida principal.";
    }

    /*
    DULCES / POSTRES
    */
    if (
      texto.includes("dulce") ||
      texto.includes("postre") ||
      texto.includes("antojo") ||
      texto.includes("algo dulce")
    ) {
      return "Si tienes antojo de algo dulce, puedes elegir mini donitas con chocolate, brownies, helado o algún postre frío. Son excelentes opciones para acompañar tu pedido principal o simplemente para darte un gusto durante el día.";
    }

    /*
    COMIDA RÁPIDA
    */
    if (
      texto.includes("rápido") ||
      texto.includes("rapido") ||
      texto.includes("urgente") ||
      texto.includes("algo rápido") ||
      texto.includes("comida rápida")
    ) {
      return "Si buscas algo rápido y práctico, te recomiendo perros calientes, papas especiales, hamburguesas sencillas o una porción de pizza. Son productos con preparación rápida y perfectos cuando tienes poco tiempo.";
    }

    /*
    BEBIDAS
    */
    if (
      texto.includes("bebida") ||
      texto.includes("tomar") ||
      texto.includes("sed") ||
      texto.includes("gaseosa") ||
      texto.includes("jugo")
    ) {
      return "Puedes acompañar tu pedido con gaseosa, jugos naturales, té frío, agua saborizada o bebidas más ligeras según tu preferencia. Elegir una buena bebida mejora mucho la experiencia de tu comida.";
    }

    /*
    COMIDA SALUDABLE
    */
    if (
      texto.includes("saludable") ||
      texto.includes("liviano") ||
      texto.includes("ligero") ||
      texto.includes("dieta") ||
      texto.includes("fitness")
    ) {
      return "Si prefieres una opción más saludable, ligera o balanceada, te recomiendo ensaladas frescas, opciones con menos fritos, proteínas a la plancha o acompañamientos más livianos. Así mantienes una buena alimentación sin dejar de disfrutar.";
    }

    /*
    PIZZA
    */
    if (texto.includes("pizza")) {
      return "La pizza siempre es una excelente opción cuando buscas algo delicioso y fácil de compartir. Puedes elegir una pizza personal si es solo para ti o una más grande si estás acompañado. Combina muy bien con bebidas frías y papas como acompañamiento.";
    }

    /*
    HAMBURGUESA
    */
    if (
      texto.includes("hamburguesa") ||
      texto.includes("burger")
    ) {
      return "Las hamburguesas son una de las opciones más populares dentro de FoodieApp. Puedes elegir desde una hamburguesa sencilla hasta una versión más completa con doble carne, queso extra, papas y bebida incluida para una experiencia más completa.";
    }

    /*
    PAPAS
    */
    if (
      texto.includes("papas") ||
      texto.includes("papas fritas")
    ) {
      return "Las papas especiales son una excelente elección como acompañamiento o incluso como plato principal si buscas algo más informal. Puedes combinarlas con queso, salsas, carne o pollo según tu preferencia.";
    }

    /*
    PERROS CALIENTES
    */
    if (
      texto.includes("perro caliente") ||
      texto.includes("hot dog") ||
      texto.includes("perro")
    ) {
      return "Los perros calientes son ideales cuando buscas algo rápido, delicioso y económico. Puedes acompañarlos con papas, salsas especiales y una bebida fría para completar tu pedido.";
    }

    /*
    FAVORITOS
    */
    if (
      texto.includes("favoritos") ||
      texto.includes("guardar comida")
    ) {
      return "Puedes guardar tus comidas favoritas presionando el ícono de corazón en la pantalla de detalles. Así podrás acceder más rápido a tus productos preferidos desde tu perfil sin tener que buscarlos nuevamente.";
    }

    /*
    CARRITO
    */
    if (
      texto.includes("carrito") ||
      texto.includes("agregar al carrito") ||
      texto.includes("comprar")
    ) {
      return "Para agregar productos al carrito, solo debes entrar al detalle de la comida y presionar el botón correspondiente. Desde tu perfil podrás revisar cantidades, aumentar o disminuir productos y continuar con el proceso de compra.";
    }

    /*
    PERFIL
    */
    if (
      texto.includes("perfil") ||
      texto.includes("cuenta") ||
      texto.includes("usuario")
    ) {
      return "Desde tu perfil puedes gestionar tu cuenta, cambiar tu foto de perfil, revisar tus favoritos, consultar tu carrito de compras y también cerrar sesión para volver al inicio de autenticación cuando lo necesites.";
    }

    /*
    OFERTAS
    */
    if (
      texto.includes("oferta") ||
      texto.includes("promoción") ||
      texto.includes("promocion") ||
      texto.includes("descuento")
    ) {
      return "Las promociones suelen incluir combos especiales como hamburguesa con papas y bebida, descuentos en pizzas familiares o precios especiales en pedidos rápidos. Te recomiendo revisar frecuentemente la app para no perder ninguna oferta disponible.";
    }

    /*
    AGRADECIMIENTO
    */
    if (
      texto.includes("gracias") ||
      texto.includes("muchas gracias")
    ) {
      return "Con mucho gusto. Estoy aquí para ayudarte a tener una mejor experiencia dentro de FoodieApp, resolver tus dudas y recomendarte las mejores opciones según lo que estés buscando.";
    }

    /*
    RESPUESTA GENERAL
    */
    return "Puedo ayudarte con recomendaciones de comida, bebidas, postres, promociones, carrito de compras, favoritos, perfil de usuario y sugerencias personalizadas dentro de FoodieApp. Escríbeme qué estás buscando y con gusto te ayudaré.";
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
        <Text style={styles.messageText}>
          {item.text}
        </Text>
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
          <Text style={styles.floatingButtonText}>
            IA
          </Text>
        </TouchableOpacity>
      )}

      {isOpen && (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.chatContainer}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              Asistente Foodie
            </Text>

            <TouchableOpacity
              onPress={() => setIsOpen(false)}
            >
              <Text style={styles.closeButton}>
                ✕
              </Text>
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

          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSend}
          >
            <Text style={styles.sendButtonText}>
              Enviar
            </Text>
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
    color: "#0f172a",
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