import { useContext } from "react";
import MealItemForm from "./MealItemForm";
import classes from "../../../UI/Modules/MealItem.module.css";
import CartContext from "../../../../store/CartContext"

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  
  const price = `$${props.price.toFixed(2)}`; 
  // The toFixed() method formats a number using fixed-point notation. i.e. $23 => $23.00

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount, //We can write only "amount," instead of "amount: amount,"
      price: props.price
    });
  };


  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;

// Sushi -Finest fish and veggies - $22.99 - Amount 1 +Add (All the line)
// CartContext using here because adding operation is related to cart. So, we need to use CartContext here.
