import CartItem from "./CartItem/CartItem";
import {useContext} from "react";
import classes from "./Cart.module.css";
import CartItems from "../../store/cart-items";
import Modal from "../UI/Modal/Modal";

const Cart = (props) => {
    const cartContext = useContext(CartItems);

    const hasItems = cartContext.items.length > 0;

    const cartItemRemoveHandler = (item) => {
        cartContext.removeItem(item);
    }

    const cartItemAddHandler = (item) => {
        cartContext.addItem({...item, amount: 1});
    }

    let content = <p>Cart is empty :c</p>

    if(hasItems) {
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

    return (
      <Modal onClick={props.onClick}>
          <ul className={classes["cart-items"]}>
              {content}
          </ul>
          <div className={classes.total}>
              <span>Total Amount</span>
              <span>{`$${cartContext.items.reduce((curNumber, item) => {
                  return curNumber + item.price * item.amount;
              }, 0).toFixed(2)}`}</span>
          </div>
          <div className={classes.actions}>
              <button className={classes["button--alt"]} onClick={props.onClose}>Close</button>
              {hasItems && <button className={classes.button}>Order</button>}
          </div>
      </Modal>
    );
}

export default Cart;