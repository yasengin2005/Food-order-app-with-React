import { useRef, useState } from "react";
import Input from "./Input";
import classes from "../../../UI/Modules/MealItemForm.module.css";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);

  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    // const enteredAmountNumber = +enteredAmount; // + is a shortcut for a string convert to a number. Because enteredAmount still is a 'string' (not a 'number')
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;

// Amount 1 +Add (right side of the line iclude input (1))
// inside "input" props 2 curly {braces used {}} because first{} for jsx expression and other for javascript object. So in input.js comp comp. {...props} destruction method could be used.
