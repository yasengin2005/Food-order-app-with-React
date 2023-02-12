import classes from "../../UI/Modules/Card.module.css";

const Card = (props) => {
  return <div className={classes.card}>{props.children}</div>;
};

export default Card;


//Kullanilacagi yerler: AvailableMeals, ...(baska yer goremedim)