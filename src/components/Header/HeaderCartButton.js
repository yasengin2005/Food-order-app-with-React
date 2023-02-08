import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/CartContext";
import CartIcon from "./CartIcon";
import classes from "../UI/Modules/HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  const cartCtx = useContext(CartContext);
  // if 3 items select and console.log(cartCtx) --> {items: Array(3), totalAmount: 58.47999999999999, addItem: ƒ, removeItem: ƒ}
  // if 1 item (sushi) 3 times select and console.log(cartCtx) --> {items: Array(1), totalAmount: 68.97, addItem: ƒ, removeItem: ƒ}
  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((acc, item) => {
    return acc + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}><CartIcon /></span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;

// Component tree: HeaderCartButton > CartContext > Context.Provider > Header
// CartContext using here because react will re-render the component when the context value changes. So, we can use the context to update the number of items in the cart.
