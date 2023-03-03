import React, { useRef, useState } from 'react'
import classes from '../../../UI/Modules/MealItemForm.module.css'
import Input from './Input'


const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true)

  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNr = +enteredAmount

    if (enteredAmount.trim().length ===0 ||
        enteredAmountNr < 1 ||
        enteredAmountNr > 5) {
          setAmountIsValid(false)
          return;
        }
        props.onAddToCart(enteredAmountNr)
  }

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
        <button>+Add</button>
        {!amountIsValid && <p>Please enter a valid number (1 to 5)</p>}
    </form>
  )
}

export default MealItemForm