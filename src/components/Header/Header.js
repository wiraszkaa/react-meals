import HeaderCartButton from "./HeaderCartButton/HeaderCartButton";
import classes from "./Header.module.css";
import veganImage from "../../assets/vegan.png";

const Header = (props) => {


    return (<>
            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton onOpen={props.onOpen}/>
            </header>
            <div className={classes["main-image"]}>
                <img src={veganImage} alt="A table full of delicious food!"/>
            </div>
        </>
    );
}

export default Header;