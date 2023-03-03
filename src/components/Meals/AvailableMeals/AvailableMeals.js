import { useEffect, useState } from "react";

import React from "react";
import classes from "../../UI/Modules/AvailableMeals.module.css";
import Card from "./Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-firebase-api-21ab1-default-rtdb.firebaseio.com/meals.json"
      );

        if (!response.ok) {
          throw new Error('Request failed!')
        }

      const responseData = await response.json();

      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };
// instead try-catch block we can use like this (otherwise "await" cause a problem)
      fetchMeals().catch((error) => {
        setIsLoading(false)
        setHttpError(error.message)
      })

  }, []);

  if (isLoading) {
    return (
      <section className={classes.spinner}>
        <p className={classes.MealsLoading}>Loading...</p>
      </section>
    )
  }

  if (httpError) {
    return  (
    <section className={classes.MealsError}>
      <p>{httpError}</p>
    </section>
    )}

  const mealsList = meals.map((meal) => (
    <MealItem key={meal.id} id={meal.id} {...meal} />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
