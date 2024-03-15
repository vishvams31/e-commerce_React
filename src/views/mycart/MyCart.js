import React, { useEffect, useState } from 'react';
import { getCartItems } from '../../services/Service';
import Topbar from '../../components/topbar/Topbar';
import './myCart.css';
import ProductList from '../../components/productList/ProductList';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import LoginModal from '../../components/loginModal/LoginModal';
import { loginCall } from '../../redux/actions/AuthActions';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import message from '../../constants/Message';


const MyCart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm();

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
                setShowModal(true);
            }
        } else {
            toast.error("your cart is empty")
        }
    };

    const closeModal = () => {
        setShowModal(false); // Close the modal
    };
    const handleLogin = (data) => {
        if (data) {
            const userCredentials = {
                email: data.email,
                password: data.password,
            };
            console.log(userCredentials)
            dispatch(loginCall(userCredentials, navigate));
            closeModal();
        }
        else {
            toast.error("please enter email and password")
        }
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
                <form onSubmit={handleSubmit(handleLogin)}>
                    <input
                        type="email"
                        placeholder="Email"
                        {...register("email", { required: true })}
                    />
                    {errors.email && <div className="error">{message.FIELD_REQUIRED}</div>}
                    <input
                        type="password"
                        placeholder="Password"
                        {...register("password", { required: true })}
                    />
                    {errors.password && <div className="error">{message.FIELD_REQUIRED}</div>}
                    <button className="Login-button" type="submit">Login</button>
                </form>
            </LoginModal>
        </>
    );
};

export default MyCart;
