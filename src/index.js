import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import {CartItemsProvider} from "./store/cart-items";

ReactDOM.render(
    <CartItemsProvider>
        <App/>
    </CartItemsProvider>
    , document.getElementById('root'));
