import AppNavigator from "./src/navigation/AppNavigator"

//Agregado: importamos el Provider del contexto de carrito y favoritos
import { FoodProvider } from "./src/context/FoodContext"

//Agregado: importamos el Provider del contexto de usuario (auth)
import { AuthProvider } from "./src/context/AuthContext"

export default function App() {
  return (
    /*
    Agregado:
    Ahora la app tiene 2 contextos globales:

    - AuthProvider → maneja usuario (login / email)
    - FoodProvider → maneja carrito y favoritos
    */
    <AuthProvider>
      <FoodProvider>
        <AppNavigator />
      </FoodProvider>
    </AuthProvider>
  )
}