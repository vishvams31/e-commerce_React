// src/components/ProductCard.js
import React from 'react';
import './productCardCart.css';
import { removeFromCart } from '../../services/Service';
import { useNavigate } from 'react-router-dom';
const ProductCardCart = ({ product }) => {
    const navigate = useNavigate()
    return (
        <div className="product-card">
            <div className="product-image-container">
                <img src={product.image} alt={product.title} className="product-image" />
            </div>
            <div className="product-info">
                <h2 className="product-title">{product.title}</h2>
                <p className="product-price">${product.price}</p>
                <button className="remove-button" onClick={() => removeFromCart(product.id, navigate)}>Remove</button>
            </div>
        </div>
    );
};

export default ProductCardCart;
