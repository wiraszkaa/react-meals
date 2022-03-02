import CartIcon from "../../Cart/CartIcon/CartIcon";
import classes from "./HeaderCartButton.module.css";
import {useContext} from "react";
import CartItems from "../../../store/cart-items";

const HeaderCartButton = (props) => {
    const cartContext = useContext(CartItems);

    return (
        <>
            <button className={classes.button} onClick={props.onOpen}>
                <span className={classes.icon}>
                    <CartIcon/>
                </span>
                <span>Your Cart</span>
                <span className={classes.badge}>
                    {cartContext.items.reduce((curNumber, item) => {
                        return curNumber + +item.amount;
                    }, 0)}
                </span>
            </button>
        </>
    );
}

export default HeaderCartButton;