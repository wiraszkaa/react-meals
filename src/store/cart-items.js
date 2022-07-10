import React, {useReducer} from "react";

const CartItems = React.createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (item) => {},
    clearItems: () => {},
});

const cartReducer = (state, action) => {
    let updatedItems = [];
    if (action.type === "CLEAR") {
        return {items: updatedItems};
    }
    let updatedItem;
    const cartItemIndex = state.items.findIndex((item) => item.id === action.item.id);
    const cartItem = state.items[cartItemIndex];
    if (action.type === "ADD") {
        if (cartItem) {
            updatedItem = {
                ...cartItem,
                amount: +action.item.amount + +cartItem.amount
            }
            updatedItems = [...state.items];
            updatedItems[cartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }
    }
    if (action.type === "REMOVE") {
        if (cartItem.amount === 1) {
            updatedItems = state.items.filter((item) => item.id !== action.item.id);
        } else {
            updatedItem = {
                ...cartItem,
                amount: +cartItem.amount - 1
            }
            updatedItems = [...state.items];
            updatedItems[cartItemIndex] = updatedItem;
        }
    }
    return {items: updatedItems};
}

export const CartItemsProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, {items: []});

    const addItemHandler = (item) => {
        dispatchCartAction({type: "ADD", item: item});
    }

    const removeItemHandler = (item) => {
        dispatchCartAction({type: "REMOVE", item: item});
    }

    const clearItemsHandler = () => {
        dispatchCartAction({type: "CLEAR"});
    }

    return <CartItems.Provider value={{
        items: cartState.items,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        clearItems: clearItemsHandler,
    }}>{props.children}</CartItems.Provider>
}

export default CartItems;