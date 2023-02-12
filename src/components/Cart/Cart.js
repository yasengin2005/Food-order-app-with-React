import{ useContext } from 'react'
import classes from '../UI/Modules/Cart.module.css'
import Modal from './Modal'
import CartContext from '../../store/CartContext'
import CartItem from './CartItem'

const Cart = (props) => {
    const cartCtx = useContext(CartContext)
    const totalAmount = `$${Math.max(cartCtx.totalAmount, 0).toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    }

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({...item, amount: 1})
    }

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={() => cartItemRemoveHandler(item.id)}
                    onAdd={() => cartItemAddHandler(item)}
                 />
            ))}
        </ul>
    )


  return (
    <Modal onCloseB={props.onCloseA}>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onCloseA}>Close</button>
            {hasItems && <button className={classes.button}>Order</button>}
        </div>
    </Modal>
  )
}

export default Cart;

// Modal propsundaki onClose Cart (sepet) ekrandayken arka plan karartisina basildiginde (Modal.js icindeki backdrop iclerinde de onClose propsu olmak kaydiyla) sepetin kapatilmasini saglarken
// Close butonundaki Onclik={onClose} propsu close tusuna basildiginda spet ekraninin kapanmasini saglar.