import classes from './MealsSummary.module.css';

const MealsSummary = () => {
    return (
        <section className={classes.summary}>
            <h2>Best food in Your neighborhood</h2>
            <p>
                Find meal that suits You best. Enjoy it and feel the best specialities in area.
            </p>
            <p>
                All our meals are cooked with high-quality ingredients, just-in-time and
                of course by experienced chefs!
            </p>
        </section>
    );
};

export default MealsSummary;