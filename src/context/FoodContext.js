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

            const exists = prev.find(
                item => item.id === food.id
            )

            if (exists) return prev

            return [...prev, food]
        })
    }

    //Agregar productos al carrito
    const addToCart = (food, quantity) => {

        setCart((prev) => {

            const exists = prev.find(
                item => item.id === food.id
            )

            //Si el producto ya existe aumentamos cantidad
            if (exists) {

                return prev.map(item =>

                    item.id === food.id
                        ? {
                            ...item,
                            quantity:
                                item.quantity + quantity
                        }
                        : item
                )
            }

            //Si no existe lo agregamos
            return [
                ...prev,
                {
                    ...food,
                    quantity
                }
            ]
        })
    }

    //Aumentar cantidad desde carrito
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

    //Disminuir cantidad desde carrito
    const decreaseCartQuantity = (foodId) => {

        setCart((prev) =>

            prev.map(item =>

                item.id === foodId &&
                item.quantity > 1
                    ? {
                        ...item,
                        quantity: item.quantity - 1
                    }
                    : item
            )
        )
    }

    //Eliminar producto completo del carrito
    const removeFromCart = (foodId) => {

        setCart((prev) =>

            prev.filter(
                item => item.id !== foodId
            )
        )
    }

    //Vaciar carrito completo
    const clearCart = () => {
        setCart([])
    }

    //Calcular subtotal del carrito
    const getCartTotal = () => {

        return cart.reduce(

            (total, item) =>

                total +
                (item.price * item.quantity),

            0
        )
    }

    //Cantidad total de productos del carrito
    const getCartItemsCount = () => {

        return cart.reduce(

            (total, item) =>

                total + item.quantity,

            0
        )
    }

    return (

        <FoodContext.Provider
            value={{

                //Estados
                favorites,
                cart,

                //Favoritos
                addToFavorites,

                //Carrito
                addToCart,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeFromCart,
                clearCart,

                //Totales
                getCartTotal,
                getCartItemsCount

            }}
        >
            {children}
        </FoodContext.Provider>
    )
}
