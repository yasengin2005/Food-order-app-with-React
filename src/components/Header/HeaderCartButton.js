import { useContext, useState, useEffect } from "react";
import CartIcon from "./CartIcon";
import CartContext from "../../store/CartContext";
import classes from '../UI/Modules/HeaderCartButton.module.css'

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false)

  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((acc, item) => {
    return acc + item.amount;
  }, 0)


  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false)
    }, 300);

    return () => {
      clearTimeout(timer)
    };
    
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClicked}>
      <span className={classes.icon}><CartIcon /></span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
