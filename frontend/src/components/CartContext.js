import { createContext, useContext, useState, useEffect } from "react";

// Create cart context
const CartContext = createContext();

// Create cart provider component
export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Load cart items from localStorage on mount
        const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
        setCartItems(storedCart);
    }, []);

    useEffect(() => {
        // Save cart items to localStorage when it changes
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const addItem = (item) => {
        // Check if item already exists in cart
        const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
        if (existingItem) {
            // If item exists, update quantity
            const updatedCart = cartItems.map((cartItem) =>
                cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + item.quantity } : cartItem
            );
            setCartItems(updatedCart);
        } 
        else {
            // If item does not exist, add it to cart
            setCartItems([...cartItems, item]);
        }
    };

    const removeItem = (itemId) => {
        // Decrease quantity if more than one
        const existingItem = cartItems.find((cartItem) => cartItem.id === itemId);
        if (existingItem.quantity > 1) {
            const updatedCart = cartItems.map((cartItem) =>
                cartItem.id === itemId ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
            );
            setCartItems(updatedCart);
        }
        else {
            // Remove item from cart if quantity is one
            setCartItems(cartItems.filter((cartItem) => cartItem.id !== itemId));
        }
    };

    const updateItemQuantity = (itemId, newQuantity) => {
        const updatedCart = cartItems.map((cartItem) =>
        cartItem.id === itemId ? { ...cartItem, quantity: newQuantity } : cartItem
        );
        setCartItems(updatedCart);
    };

    const clearCart = () => {
        setCartItems([]);
    };
    
    const totalPrice =  cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const itemsCount = cartItems.length;

    const cartValue = {
        cartItems,
        itemsCount,
        addItem,
        removeItem,
        updateItemQuantity,
        totalPrice,
        clearCart,
    };

    return <CartContext.Provider value={cartValue}>{children}</CartContext.Provider>;
}

// Custom hook for using cart context
export function useCart() {
    return useContext(CartContext);
}
