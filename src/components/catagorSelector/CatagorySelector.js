// src/components/CategorySelector.js
import React, { useState, useEffect } from 'react';
import { fetchCategories } from '../../services/Service';
import './categorySelector.css'

const CategorySelector = ({ onCategorySelect }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchCategories();
            setCategories(response.data);
        };

        fetchData();
    }, []);

    return (
        <div className="category-selector">
            <select onChange={(e) => onCategorySelect(e.target.value)}>
                <option value="">All Categories</option>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CategorySelector;
