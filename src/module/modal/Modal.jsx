import React from 'react';
import cssModal from './Modal.module.css'

const Modal = ({children, visible, setVisible}) => {

    const rootClasses = [cssModal.modal]
    if (visible) {
        rootClasses.push(cssModal.active)
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={cssModal.modalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;