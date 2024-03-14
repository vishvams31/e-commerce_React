import toast from 'react-hot-toast';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import message from '../constants/Message';
const API_BASE_URL = 'https://fakestoreapi.com';

// src/services

export const fetchProducts = (category, sortOrder,) => {
    let url = category ? `${API_BASE_URL}/products/category/${category}` : `${API_BASE_URL}/products`;
    return axios.get(url, {
        params: {
            sort: sortOrder,
        },
    });
};
//catagory choose
export const fetchCategories = () => {
    return axios.get(`${API_BASE_URL}/products/categories`);
};
//user details

export const fetchUserDetails = () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        // console.log(user);
        return user;
    } catch (error) {
        console.error(message.ERR_USER_DETAILS, error);
        return null;
    }
};
//register a user
export const handleClick = async (data, navigate) => {
    if (data.preventDefault) {
        data.preventDefault();
    }
    const { password, firstname, lastname, email, mobilenumber } = data;

    const hashPassword = async (password) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    };

    try {
        const hashedPassword = await hashPassword(password);

        const userId = Date.now().toString();
        const newUser = {
            id: userId,
            firstname,
            lastname,
            email,
            mobilenumber,
            password: hashedPassword
        };

        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        existingUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(existingUsers));
        toast.success(message.SUCCESS_REGISTER);
        navigate("/login");
    } catch (err) {
        console.log(err);
    }
};


//update userInformation
export const updateUser = (values, user) => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = storedUsers.findIndex(u => u.id === user.id);

    if (userIndex !== -1) {
        const updatedUser = {
            ...user,
            firstname: values.firstname,
            lastname: values.lastname,
            email: values.email,
            mobilenumber: values.mobilenumber,
        };
        storedUsers[userIndex] = updatedUser;
        localStorage.setItem('users', JSON.stringify(storedUsers));
        localStorage.setItem('user', JSON.stringify(updatedUser));
        toast.success(message.SUCCESS_UPDATE);
    } else {
        toast.error(message.USER_BOT_FOUND);
    }
};

//change Password
export const changePassword = (newPassword, user) => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = storedUsers.findIndex(u => u.id === user.id);

    if (userIndex !== -1) {
        const salt = bcrypt.genSaltSync(10);
        const hashedNewPassword = bcrypt.hashSync(newPassword, salt);
        const updatedUser = {
            ...user,
            password: hashedNewPassword,
        };
        storedUsers[userIndex] = updatedUser;
        localStorage.setItem('users', JSON.stringify(storedUsers));

        // Update the current user's object in local storage 
        const currentUser = JSON.parse(localStorage.getItem('user'));
        if (currentUser && currentUser.id === user.id) {
            localStorage.setItem('user', JSON.stringify(updatedUser));
        }

        toast.success(message.SUCCESS_PASSWORD);
    } else {
        toast.error(message.USER_BOT_FOUND);
    }
};
//upon update check email is unique
export const checkEmailUniqueness = (email) => {
    try {
        // Retrieve the users array from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const isEmailUnique = !users.some(user => user.email === email);

        return isEmailUnique;
    } catch (error) {
        console.error(message.ERR_EMAIL_UNIQUE, error);
        return false;
    }
};
async function searchProductIdByTitle(title) {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        const product = products.find(p => p.title.toLowerCase() === title.toLowerCase());
        return product ? product.id : null;
    } catch (error) {
        console.error("Failed to fetch products or find product ID:", error);
        return null;
    }
}
async function fetchProductDetails(id) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const product = await response.json();
        return product;
    } catch (error) {
        console.error("Failed to fetch product details:", error);
        return null;
    }
}
export async function searchProductByTitle(title) {
    const productId = await searchProductIdByTitle(title);
    if (!productId) {
        console.log("Product not found.");
        return null;
    }
    const productDetails = await fetchProductDetails(productId);
    return productDetails;
}
//addtocart
export function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success("added to cart")
}
//get cart items
export function getCartItems() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}
//remove from the cart
export function removeFromCart(productId, navigate) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success("item removed successfully")
    navigate('/')
}




