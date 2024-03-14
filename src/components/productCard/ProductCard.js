// src/components/ProductCard.js
import React from 'react';
import './productCard.css';
import { addToCart } from '../../services/Service';
const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <div className="product-image-container">
                <img src={product.image} alt={product.title} className="product-image" />
            </div>
            <div className="product-info">
                <h2 className="product-title">{product.title}</h2>
                <p className="product-price">Price: ${product.price}</p>
                <button className="add-to-cart-button" onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductCard;
