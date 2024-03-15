// src/components/Modal.js
import React from 'react';
import './loginModal.css'

const LoginModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="login-modal-overlay">
            <div className="login-modal">
                {children}
                <button onClick={onClose}>Close</button>
            </div>
        </div>

    );
};

export default LoginModal;
