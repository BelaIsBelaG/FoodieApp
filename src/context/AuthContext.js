import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    //Usuario global de la app
    const [user, setUser] = useState({
        name: "Usuario prueba FoodieApp",
        email: "foodieapp@test.com"
    });

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}