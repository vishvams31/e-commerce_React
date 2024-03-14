// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import './productList.css';
import ProductCard from '../productCard/ProductCard';
import { fetchProducts } from '../../services/Service';
import ProductCardCart from '../productCardCart/ProductCardCart';

const ProductList = ({ category, sortOrder, searchResults, cart, cartItems }) => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    // console.log(products.length)
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const totalCartPage = Math.ceil(cartItems && (cartItems.length / itemsPerPage));


    useEffect(() => {
        const fetchData = async () => {
            if (searchResults && searchResults.length > 0) {
                setProducts(searchResults);
            } else {
                const response = await fetchProducts(category, sortOrder, itemsPerPage);
                setProducts(response.data);
            };
        }
        fetchData();
    }, [category, sortOrder, searchResults, currentPage]);
    const paginatedProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const paginatedCartProducts = cartItems ? cartItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : [];
    // console.log(paginatedProducts)

    return (
        <>
            <div className="product-list">
                {!cart && paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />

                ))}
                {
                    cart && (paginatedCartProducts.map(item => (
                        <li key={item.id}>
                            <ProductCardCart key={item.id} product={item} />
                        </li>
                    )))
                }
            </div>
            <div className="pagination-buttons">
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={(!cart) ? currentPage >= totalPages : currentPage >= totalCartPage}>Next</button>
            </div>


        </>

    );
};


export default ProductList;
