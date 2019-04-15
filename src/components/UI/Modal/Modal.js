import React from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';

const Modal = (props) => (
    <Aux>
        <div 
            className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}
            >
            {props.children}
        </div>
        <Backdrop show={props.show} clicked={props.modalClosed}/>
    </Aux>
);

export default Modal;