import React from 'react'

const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {}
});
export default CartContext;

// console.log(CartContext) --> {$$typeof: Symbol(react.context), _currentValue: {…}, _currentValue2: {…}, _threadCount: 0, Provider: {…}, …}

//The items of the object only for IDEs to know what properties are available on the context object.
//The items of the object are not used in the code.

// If push F12 on the app screen  => CartProvider = Cart Context Provider, Context.Provider = CartProvider
