import { Fragment } from "react";
import classes from "../UI/Modules/Header.module.css";
import mealsImage from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <div className={classes.right}>
          <HeaderCartButton onClick={props.onShowCart} onClose={props.onHideAuth}/>
        </div>
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt="Full of a table of delicious foods" />
      </div>
    </Fragment>
  );
};

export default Header;
