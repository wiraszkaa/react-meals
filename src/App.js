import Header from "./components/Header/Header";
import MealsSummary from "./components/Meals/MealsSummary/MealsSummary";
import AvailableMeals from "./components/Meals/AvailableMeals/AvailableMeals";
import Cart from "./components/Cart/Cart";
import {useState} from "react";

function App() {
    const [isCartOpened, setIsCartOpened] = useState(false);

    const openCartHandler = () => {
        setIsCartOpened(true);
    }

    const closeCartHandler = () => {
        setIsCartOpened(false);
    }

    return (
        <>
            {isCartOpened && <Cart onClose={closeCartHandler} onClick={closeCartHandler} />}
            <Header onOpen={openCartHandler}/>
            <main>
                <MealsSummary/>
                <AvailableMeals/>
            </main>
        </>
    );
}

export default App;
