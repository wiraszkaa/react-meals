import DUMMY_MEALS from "../../../store/dummy-meals";
import MealItem from "../MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import Card from "../../UI/Card/Card";

const AvailableMeals = (props) => {
    return (
        <Card className={classes.meals}>
            <ul>
                {DUMMY_MEALS.map((meal) => {
                    return (
                        <MealItem
                            key={meal.id}
                            name={meal.name}
                            description={meal.description}
                            price={meal.price}
                            id={meal.id}/>);
                })}
            </ul>
        </Card>
    );
}

export default AvailableMeals;