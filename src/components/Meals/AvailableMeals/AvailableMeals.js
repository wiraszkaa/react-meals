import MealItem from "../MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import Card from "../../UI/Card/Card";
import useHttp from "../../../hooks/use-http";
import {useCallback, useEffect, useState} from "react";
import loadingImg from "../../../assets/loading.gif";

const AvailableMeals = (props) => {
    const [meals, setMeals] = useState([]);

    const transformMeals = useCallback(mealsObj => {
        const loadedMeals = [];

        for (const mealKey in mealsObj) {
            loadedMeals.push({
                id: mealKey,
                name: mealsObj[mealKey].name,
                description: mealsObj[mealKey].description,
                price: mealsObj[mealKey].price,
            });
        }

        setMeals(loadedMeals);
    }, []);

    const {
        isLoading,
        error,
        sendRequest,
    } = useHttp();

    useEffect(() => {
        sendRequest({url: "<firebaseUri>/meals.json"}, transformMeals)
    }, [sendRequest, transformMeals])

    const loading =
        <div className={classes.loading}>
            <img src={loadingImg} alt="Loading spinner"/>
        </div>

    return (
        <Card className={classes.meals}>
            {isLoading && loading}
            {error && <p className={classes['error-text']}>Something went wrong.</p>}
            {!isLoading && !error && <ul>
                {meals.map((meal) => {
                    return (
                        <MealItem
                            key={meal.id}
                            name={meal.name}
                            description={meal.description}
                            price={meal.price}
                            id={meal.id}/>);
                })}
            </ul>}
        </Card>
    );
}

export default AvailableMeals;