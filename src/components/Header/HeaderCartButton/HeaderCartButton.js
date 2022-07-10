import CartIcon from "../../Cart/CartIcon/CartIcon";
import classes from "./HeaderCartButton.module.css";
import {useContext, useEffect, useState} from "react";
import CartItems from "../../../store/cart-items";

const HeaderCartButton = (props) => {
    const [buttonIsHighlighted, setButtonIsHighlighted] = useState(false);

    const cartContext = useContext(CartItems);

    const {items} = cartContext;

    const btnClasses = `${classes.button} ${buttonIsHighlighted ? classes.bump : ""}`;
    useEffect(() => {
        if(items.length === 0) {
            return;
        }
        setButtonIsHighlighted(true);
        const timer = setTimeout(() => {
            setButtonIsHighlighted(false);
        }, 300);

        return () => {
          clearTimeout(timer);
        };
    }, [items])

    return (
        <>
            <button className={btnClasses} onClick={props.onOpen}>
                <span className={classes.icon}>
                    <CartIcon/>
                </span>
                <span>Your Cart</span>
                <span className={classes.badge}>
                    {items.reduce((curNumber, item) => {
                        return curNumber + +item.amount;
                    }, 0)}
                </span>
            </button>
        </>
    );
}

export default HeaderCartButton;