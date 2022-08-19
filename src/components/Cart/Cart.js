import CartItem from "./CartItem/CartItem";
import {useContext, useState} from "react";
import classes from "./Cart.module.css";
import CartItems from "../../store/cart-items";
import Modal from "../UI/Modal/Modal";
import Checkout from "./Checkout/Checkout";
import useHttp from "../../hooks/use-http";
import loading from "../../assets/loading.gif";

const Cart = (props) => {
    const [checkoutVisible, setCheckoutVisible] = useState(false);
    const [submissionStarted, setSubmissionStarted] = useState(false);
    const cartContext = useContext(CartItems);
    const {
        isLoading,
        error,
        sendRequest,
    } = useHttp();

    const hasItems = cartContext.items.length > 0;

    const cartItemRemoveHandler = (item) => {
        cartContext.removeItem(item);
    }

    const cartItemAddHandler = (item) => {
        cartContext.addItem({...item, amount: 1});
    }

    let content = <p>Cart is empty :c</p>

    if (hasItems) {
        content = cartContext.items.map((item) => {
            return (
                <CartItem
                    key={item.id}
                    id={item.id}
                    price={item.price}
                    name={item.name}
                    amount={item.amount}
                    onAdd={cartItemAddHandler.bind(null, item)}
                    onRemove={cartItemRemoveHandler.bind(null, item)}/>
            );
        });
    }

    const confirmCheckoutHandler = (data) => {
        const order = {
            user: data,
            orderItems: cartContext.items,
        }

        const requestConfig = {
            url: "<firebaseUri>/orders.json",
            method: 'POST',
            body: order,
            headers: {
                'Content-Type': 'application/json',
            },
        }
        sendRequest(requestConfig, (data) => console.log(data));
        setSubmissionStarted(true);
        cartContext.clearItems();
    }

    const openCheckoutHandler = () => {
        setCheckoutVisible(true);
    }

    const modalControls =
        <div className={classes.actions}>
            <button className={classes["button--alt"]} onClick={props.onClose}>Close</button>
            {hasItems && <button className={classes.button} onClick={openCheckoutHandler}>Order</button>}
        </div>

    const orderModal =
        <>
            <ul className={classes["cart-items"]}>
                {content}
            </ul>
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{`$${cartContext.items.reduce((curNumber, item) => {
                    return curNumber + item.price * item.amount;
                }, 0).toFixed(2)}`}</span>
            </div>
            {!checkoutVisible && modalControls}
            {checkoutVisible && <Checkout onConfirm={confirmCheckoutHandler}/>}
        </>

    const loadingModal =
        <div className={classes.loading}>
            <img src={loading} alt="Loading spinner"/>
        </div>

    const dataSentModal =
        <>
            <p>Thank You for Your Order. Further information will be sent to the e-mail address.</p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={props.onClose}>OK</button>
            </div>
        </>

    return (
        <Modal onClick={props.onClick}>
            {!submissionStarted && orderModal}
            {isLoading && loadingModal}
            {!isLoading && !error && submissionStarted && dataSentModal}
            {error && <p className={classes['error-text']}>Something went wrong.</p>}
        </Modal>
    );
}

export default Cart;