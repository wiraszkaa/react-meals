import classes from "./Checkout.module.css";
import cartClasses from "../../Header/HeaderCartButton/HeaderCartButton.module.css"
import useInput from "../../../hooks/use-input";

const Checkout = (props) => {
    const {
        value: enteredName,
        isValid: nameIsValid,
        hasError: nameHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameInputBlurHandler,
        reset: resetNameInput,
    } = useInput((name) => name.trim() !== '');

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const {
        value: enteredAddress,
        isValid: addressIsValid,
        hasError: addressHasError,
        valueChangeHandler: addressChangeHandler,
        inputBlurHandler: addressInputBlurHandler,
        reset: resetAddressInput,
    } = useInput((address) => address.trim() !== '');

    const {
        value: enteredEmail,
        isValid: emailIsValid,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailInputBlurHandler,
        reset: resetEmailInput,
    } = useInput(validateEmail);

    let formIsValid = false;
    if (nameIsValid && addressIsValid && emailIsValid) {
        formIsValid = true;
    }

    const submitHandler = (event) => {
        event.preventDefault();

        if (nameHasError || addressHasError || emailHasError) {
            return;
        }

        props.onConfirm({
            name: enteredName,
            address: enteredAddress,
            email: enteredEmail,
        });

        resetNameInput();
        resetAddressInput();
        resetEmailInput();
    }

    return (
        <form onSubmit={submitHandler}>
            <div className={classes['control-group']}>
                <div className={`${classes['form-control']} ${nameHasError && classes.invalid}`}>
                    <label htmlFor='name'>Full Name</label>
                    <input
                        type='text'
                        id='name'
                        value={enteredName}
                        onChange={nameChangeHandler}
                        onBlur={nameInputBlurHandler}
                    />
                    {nameHasError && <p className={classes['error-text']}>Full Name must not be empty.</p>}
                </div>
                <div className={`${classes['form-control']} ${addressHasError && classes.invalid}`}>
                    <label htmlFor='address'>Address</label>
                    <input
                        type='text'
                        id='address'
                        value={enteredAddress}
                        onChange={addressChangeHandler}
                        onBlur={addressInputBlurHandler}
                    />
                    {addressHasError && <p className={classes['error-text']}>Address is invalid.</p>}
                </div>
                <div className={`${classes['form-control']} ${emailHasError && classes.invalid}`}>
                    <label htmlFor='email'>E-Mail Address</label>
                    <input
                        type='text'
                        id='email'
                        value={enteredEmail}
                        onChange={emailChangeHandler}
                        onBlur={emailInputBlurHandler}
                    />
                    {emailHasError && <p className={classes['error-text']}>Email is invalid.</p>}
                </div>
            </div>
            <div className={classes['form-actions']}>
                <button disabled={!formIsValid} className={cartClasses.button}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;