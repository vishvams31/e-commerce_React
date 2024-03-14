import React, { useEffect, useState } from 'react';
import { getCartItems, removeFromCart } from '../../services/Service';
import Topbar from '../../components/topbar/Topbar';
import './myCart.css';
import ProductList from '../../components/productList/ProductList';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import LoginModal from '../../components/loginModal/LoginModal';


const MyCart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [cart, setCart] = useState(false);
    const [showModal, setShowModal] = useState(false); // State to control modal visibility

    useEffect(() => {
        const items = getCartItems();
        setCartItems(items);
    }, []);

    const handleCheckout = () => {
        const user = localStorage.getItem('user');
        if (cartItems.length > 0) {
            if (user) {
                toast.success("Successfully checked out");
                localStorage.removeItem("cart")
                navigate("/");
            }
            else {
                setShowModal(true); // Show the modal if the user is not logged in
            }
        } else {
            toast.error("your cart is empty")
        }
    };

    const closeModal = () => {
        setShowModal(false); // Close the modal
    };

    return (
        <>
            <Topbar cart={true} />
            <div className="my-cart">
                <h2 className='title'>My Cart</h2>
                <div className="cart-items">
                    {cartItems.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <ProductList cart={true} cartItems={cartItems} />
                    )}
                </div>
                <div className="checkoutDiv">
                    <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
                </div>
            </div>
            <LoginModal isOpen={showModal} onClose={closeModal}>
                <h3>Login Required</h3>
                <p>You need to log in to proceed with checkout.</p>
                <button onClick={() => navigate('/login')}>Go to Login</button>
            </LoginModal>
        </>
    );
};

export default MyCart;
