import classes from "./MealItem.module.css";
import MealItemForm from "../MealItemForm/MealItemForm";
import {useContext} from "react";
import CartItems from "../../../store/cart-items";

const MealItem = (props) => {
    const price = `$${props.price.toFixed(2)}`;

    const cartItems = useContext(CartItems);

    const addItemHandler = (amount) => {
        cartItems.addItem({
            id: props.id,
            name: props.name,
            price: props.price,
            amount: amount,
        });
    }

    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm id={props.id} onAddItem={addItemHandler}/>
            </div>
        </li>
    );
}

export default MealItem;