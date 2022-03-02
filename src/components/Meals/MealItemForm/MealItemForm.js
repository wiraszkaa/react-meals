import Input from "../../UI/Input/Input";
import classes from "./MealItemForm.module.css";
import {useState} from "react";

const MealItemForm = (props) => {
    const [amount, setAmount] = useState(1);

    const amountChangeHandler = (event) => {
        event.preventDefault();
        setAmount(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAddItem(amount);
        setAmount(1);
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input
                label="Amount"
                input={{
                    type: "number",
                    id: props.id,
                    min: "1",
                    step: "1",
                    value: amount,
                    onChange: amountChangeHandler}}/>
            <button type="submit">+ Add</button>
        </form>
    );
}

export default MealItemForm;