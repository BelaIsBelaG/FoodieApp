import React, { createContext, useState } from "react"

export const FoodContext = createContext()

export function FoodProvider({ children }) {

    //Estado de favoritos
    const [favorites, setFavorites] = useState([])

    //Estado del carrito
    const [cart, setCart] = useState([])

    //Agregar a favoritos
    const addToFavorites = (food) => {
        setFavorites((prev) => {
            const exists = prev.find(item => item.id === food.id)

            if (exists) return prev

            return [...prev, food]
        })
    }

    //Agregar al carrito con cantidad
    const addToCart = (food, quantity) => {
        setCart((prev) => {
            const exists = prev.find(item => item.id === food.id)

            if (exists) {
                return prev.map(item =>
                    item.id === food.id
                        ? {
                            ...item,
                            quantity: item.quantity + quantity
                        }
                        : item
                )
            }

            return [
                ...prev,
                {
                    ...food,
                    quantity
                }
            ]
        })
    }

    //Agregado: aumentar cantidad desde ProfileScreen
    const increaseCartQuantity = (foodId) => {
        setCart((prev) =>
            prev.map(item =>
                item.id === foodId
                    ? {
                        ...item,
                        quantity: item.quantity + 1
                    }
                    : item
            )
        )
    }

    //Agregado: disminuir cantidad desde ProfileScreen
    const decreaseCartQuantity = (foodId) => {
        setCart((prev) =>
            prev.map(item =>
                item.id === foodId && item.quantity > 1
                    ? {
                        ...item,
                        quantity: item.quantity - 1
                    }
                    : item
            )
        )
    }

    return (
        <FoodContext.Provider
            value={{
                favorites,
                cart,
                addToFavorites,
                addToCart,
                increaseCartQuantity,
                decreaseCartQuantity
            }}
        >
            {children}
        </FoodContext.Provider>
    )
}