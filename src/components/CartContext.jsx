// CartContext.js
import React, { createContext, useReducer } from "react";

export const CartContext = createContext();

const initialState = {
    cartItems: [],
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            const existingItemIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            );
            if (existingItemIndex !== -1) {
                const updatedCartItems = [...state.cartItems];
                updatedCartItems[existingItemIndex].quantity += 1;
                return {
                    ...state,
                    cartItems: updatedCartItems,
                };
            } else {
                return {
                    ...state,
                    cartItems: [
                        ...state.cartItems,
                        { ...action.payload, quantity: 1 },
                    ],
                };
            }
        case "REMOVE_FROM_CART":
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    (item) => item.id !== action.payload
                ),
            };
        case "UPDATE_QUANTITY":
            const itemIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.itemId
            );
            if (itemIndex !== -1) {
                const updatedCartItems = [...state.cartItems];
                updatedCartItems[itemIndex].quantity = action.payload.quantity;
                return {
                    ...state,
                    cartItems: updatedCartItems,
                };
            }
            return state;
        case "CLEAR_CART":
            return {
                ...state,
                cartItems: [],
            };
        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const addToCart = (item) => {
        dispatch({ type: "ADD_TO_CART", payload: item });
    };

    const removeFromCart = (itemId) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: itemId });
    };

    const updateQuantity = (itemId, quantity) => {
        dispatch({ type: "UPDATE_QUANTITY", payload: { itemId, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: "CLEAR_CART" });
    };

    const cartContextValue = {
        cartItems: state.cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
    };

    return (
        <CartContext.Provider value={cartContextValue}>
            {children}
        </CartContext.Provider>
    );
};
