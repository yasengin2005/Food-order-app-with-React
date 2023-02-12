import { useReducer } from "react";
import CartContext from './CartContext';

const defaultCartState = {
    items: [],
    totalAmount: 0,
};

const cartReducer = (state, action) => {
    switch(action.type) {
        case "ADD":
            const updatedItem = state.items.find((item) => item.id === action.item.id)
                ? state.items.map((item) => item.id === action.item.id
                    ? {...item, amount: item.amount + action.item.amount} 
                    : item)
                : [...state.items, action.item]
            return {
                items: updatedItem,
                totalAmount: state.totalAmount + action.item.amount * action.item.price
            }
        case "REMOVE":
            const itemToRemove = state.items.find((item) => item.id === action.id)
            const updatedAmount = itemToRemove.amount === 1 ? 0 : itemToRemove.amount - 1;
            const updatedItems = state.items
                .map((item) => item.id === action.id ? {...item, amount: updatedAmount} : item)
                .filter((item) => item.amount > 0)
            return {
                items: updatedItems,
                totalAmount: state.totalAmount - itemToRemove.price
            }
        default:
            return defaultCartState;
    }
}

const CartProvider = (props) => {
    const [cartState, dispatchFunc] = useReducer(cartReducer, defaultCartState)


    const addItemHandler = (item) => {
        dispatchFunc({item: item, type: "ADD"})
    }

    const removeItemHandler = (id) => {
        dispatchFunc({id: id, type: "REMOVE"})
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
  )
};

export default CartProvider;
