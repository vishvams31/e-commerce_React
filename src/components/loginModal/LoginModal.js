// src/components/Modal.js
import React from 'react';
import './loginModal.css'

const Modal = ({ isOpen, onClose, children, title }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {title && <h2>{title}</h2>}
                {children}
            </div>
        </div>
    );
};

export default Modal;
