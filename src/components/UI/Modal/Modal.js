import classes from "./Modal.module.css";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onClick}/>;
}

const ModalOverlay = (props) => {
    return (
        <div className={classes.modal}>{props.children}</div>
    );
}

const Modal = (props) => {
    const portalElement = document.getElementById("overlays");

    return (
        <>
            {ReactDOM.createPortal(<Backdrop onClick={props.onClick}/>, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </>
    );
}

export default Modal;
