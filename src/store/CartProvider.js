import { useReducer } from "react";
import CartContext from "./CartContext";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const updatedItem = state.items.find(item => item.id === action.item.id) //new item already at the cart?
        ? state.items.map(item => item.id === action.item.id //yes already inside the cart, then find it and match with it
              ? { ...item, amount: item.amount + action.item.amount } //yes I find, then take all item props, but add amount if how many pieces added
              : item) //I couldn't find, then stop the mapping
        : [...state.items, action.item]; //no, new item not inside the cart: then insert it to the cart. action.item already includes how many pieces of new item added.
      return {
        items: updatedItem,
        totalAmount: state.totalAmount + action.item.amount * action.item.price,
      };

    case "REMOVE":
      const itemToRemove = state.items.find(item => item.id === action.id);  //not "action.item.id" because dispatch func. has sent { type: "REMOVE", id: id }, not { type: "REMOVE", item: item }
      const updatedAmount = itemToRemove.amount === 1 ? 0 : itemToRemove.amount - 1;
      const updatedItems = state.items
        .map(item => item.id === action.id ? { ...item, amount: updatedAmount } : item)
        .filter((item) => item.amount > 0);
      return {
        items: updatedItems,
        totalAmount: state.totalAmount - itemToRemove.price, //Not necessary itemToRemove.amount because it's always 1.
      };
    default:
      return defaultCartState;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  // if 1 sushi & 1 schnitzel add (not necessary push to cart button at header) --> console.log(cartCtx) --> {items Array(2), totalAmount: 39.48999..., addItem: ƒ, removeItem: ƒ}

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
