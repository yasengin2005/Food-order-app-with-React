import { useState } from "react";

import Header from "./components/Header/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} onClose={hideCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;

// Component tree: App > CartProvider > Context Provider > -Header -Meals - Cart
// Only three elements using CartContext: MealItem.js, Cart.js, HeaderCartButton.js
