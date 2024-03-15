import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { searchProductByTitle } from '../../services/Service';
import ProductList from '../productList/ProductList';
import CategorySelector from '../catagorSelector/CatagorySelector';
import './topbar.css'
import CircularProgress from '@mui/material/CircularProgress';

export default function Topbar({ cart }) {
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortOrder, setSortOrder] = useState('desc');
    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector(state => state.auth.user);

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearch = async () => {
        const productDetails = await searchProductByTitle(searchQuery);
        if (productDetails) {
            setSearchResults([productDetails]);
        } else {
            setSearchResults([]);
        }
    };

    const handleCategoryChange = (catagory) => {
        setSelectedCategory(catagory);
    };

    const handleSortOrderChange = (event) => {
        setSortOrder(event.target.value);
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-2">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <a className="navbar-brand" href="#">E-Commerce</a>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form className="form-inline my-2 my-lg-0 mr-auto">
                        {!cart && (<div className="input-group">
                            <input className="form-control" type="search" placeholder="Search" aria-label="Search" value={searchQuery} onChange={handleInputChange} />
                            <div className="input-group-append">
                                <button className="btn btn-primary" type="button" onClick={handleSearch}>Search</button>
                            </div>
                        </div>)}
                    </form>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <Link to={user ? `/profile/${user.firstname}` : '/register'} style={{ textDecoration: "none", color: "white" }}>
                                <a className="nav-link">Profile</a>
                            </Link>
                        </li>
                        <li className="nav-item active">
                            <Link to={'/mycart'} style={{ textDecoration: "none", color: "white" }}>
                                <a className="nav-link" >My Cart</a>
                            </Link>
                        </li>
                        <li className="nav-item active">
                            <Link to={'/register'} style={{ textDecoration: "none", color: "white" }}>
                                <a className="nav-link" >Register</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
            {!cart && (
                <>
                    <div className="filters">
                        <CategorySelector onCategorySelect={handleCategoryChange} />
                        <select value={sortOrder} onChange={handleSortOrderChange}>
                            <option value="desc">Descending</option>
                            <option value="asc">Ascending</option>
                        </select>
                    </div>
                    <div >
                        {isLoading ? (
                            <CircularProgress /> // Show CircularProgress when isLoading is true
                        ) : (
                            <ProductList
                                searchResults={searchResults}
                                category={selectedCategory}
                                sortOrder={sortOrder}
                                cart={false}
                            />
                        )}
                    </div>
                </>
            )
            }
        </div>
    );
}
