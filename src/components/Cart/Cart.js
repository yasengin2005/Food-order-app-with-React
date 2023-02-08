import { useContext } from 'react';

import Modal from './Modal';
import CartItem from './CartItem';
import classes from '../UI/Modules/Cart.module.css'
import CartContext from '../../store/CartContext';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
// if 1 sushi & 1 schnitzel add and if push your cart (at header) --> console.log(cartCtx) --> {items Array(2), totalAmount: 39.48999..., addItem: ƒ, removeItem: ƒ}

  const totalAmount = `$${Math.max(cartCtx.totalAmount, 0).toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;


  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={() => cartItemRemoveHandler(item.id)}  // same with onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={() => cartItemAddHandler(item)}  // same with onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;

// CartContext using here because adding operation is related to cart. So, we need to use CartContext here.
