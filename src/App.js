import { useState } from "react";
import Header from "./components/Header/Header";
import Meals from "./components/Meals/Meals";
import Cart from './components/Cart/Cart'
import CartProvider from "./store/CartProvider";


const App = () => {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true)
  }

  const hideCartHandler = () => {
    setCartIsShown(false)
  }


  return (
    <CartProvider>
      { cartIsShown && <Cart onCloseA={hideCartHandler} />}
      <Header onShowCart={showCartHandler}/>
      <main>
        <Meals />
      </main>
    </CartProvider>

  );
};

export default App;

//Once alt alta h1,2'lerle Cart ve Header ile <main> Meals </main> yazilsin, complar yazildikca cevrilsin. 
// en sonunda cartprovider ve fonklar gelecek