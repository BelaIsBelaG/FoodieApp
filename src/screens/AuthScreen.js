import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert
} from "react-native";

import colors from "../styles/theme";

/*
Agregado:
Importamos los usuarios estáticos de prueba

Como todavía no usamos Firebase ni backend,
vamos a manejar usuarios locales para poder probar:

- inicio de sesión
- registro
- mostrar perfil
- validación de usuario
*/
import { users } from "../utils/users";

export default function AuthScreen({ navigation }) {
  const [isLogin, setIsLogin] = useState(true);

  /*
  Agregado:
  Estados para guardar la información
  del usuario durante login o registro
  */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {

    /*
    Agregado:
    Si estamos en modo login,
    validamos que el usuario exista
    dentro de users.js
    */
    if (isLogin) {
      const existingUser = users.find(
        (user) =>
          user.email.toLowerCase() === email.toLowerCase() &&
          user.password === password
      );

      /*
      Si no existe el usuario,
      mostramos error
      */
      if (!existingUser) {
        Alert.alert(
          "Error",
          "Correo o contraseña incorrectos"
        );
        return;
      }

      /*
      Si existe:
      navegamos a Home enviando
      los datos reales del usuario
      */
      navigation.navigate("Home", {
        user: existingUser
      });

      return;
    }

    /*
    Agregado:
    Si estamos en modo registro,
    creamos un usuario temporal local

    (sin base de datos todavía)
    */
    const newUser = {
      id: Date.now().toString(),
      name: name || "Usuario FoodieApp",
      email: email,
      password: password
    };

    console.log("Nuevo usuario registrado:", newUser);

    /*
    Navegamos a Home con el nuevo usuario
    */
    navigation.navigate("Home", {
      user: newUser
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>FoodieApp</Text>

        <Text style={styles.subtitle}>
          {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
        </Text>

        {/* 
        Agregado:
        El campo nombre solo aparece
        cuando el usuario se registra
        */}
        {!isLogin && (
          <TextInput
            style={styles.input}
            placeholder="Nombre completo"
            value={name}
            onChangeText={setName}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>
            {isLogin ? "Entrar" : "Registrarme"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIsLogin(!isLogin)}
        >
          <Text style={styles.switchText}>
            {isLogin
              ? "¿No tienes cuenta? Regístrate"
              : "¿Ya tienes cuenta? Inicia sesión"}
          </Text>
        </TouchableOpacity>

        {/* 
        Agregado:
        Datos de prueba visibles
        para facilitar las pruebas
        */}
        {isLogin && (
          <View style={styles.testUserBox}>
            <Text style={styles.testTitle}>
              Usuario de prueba:
            </Text>

            <Text style={styles.testText}>
              Correo: foodieapp@test.com
            </Text>

            <Text style={styles.testText}>
              Contraseña: 123456
            </Text>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: colors.text,
  },

  subtitle: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 30,
    fontWeight: "600",
    color: colors.subtitle,
  },

  input: {
    backgroundColor: colors.input,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
    color: "#111827",
  },

  button: {
    backgroundColor: colors.button,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "bold",
  },

  switchText: {
    marginTop: 20,
    textAlign: "center",
    color: colors.subtitle,
    fontWeight: "500",
  },

  /*
  Agregado:
  Caja visual para mostrar
  usuario de prueba
  */
  testUserBox: {
    marginTop: 30,
    padding: 16,
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#CBD5E1"
  },

  testTitle: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 8,
    color: "#0F172A"
  },

  testText: {
    fontSize: 14,
    color: "#475569",
    marginBottom: 4
  }
});