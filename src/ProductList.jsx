import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
    const [showCart, setShowCart] = useState(false);
    
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                {
                    name: "Snake Plant",
                    image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
                    description: "Produces oxygen at night, improving air quality effortlessly.",
                    cost: "$15"
                },
                {
                    name: "Spider Plant",
                    image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
                    description: "Filters formaldehyde and xylene from the air, very easy to care for.",
                    cost: "$12"
                },
                {
                    name: "Peace Lily",
                    image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg",
                    description: "Beautiful white flowers, excellent at removing indoor pollutants.",
                    cost: "$25"
                }
            ]
        },
        {
            category: "Aromatic Fragrant Plants",
            plants: [
                {
                    name: "Lavender",
                    image: "https://cdn.pixabay.com/photo/2015/07/21/04/04/lavender-853472_1280.jpg",
                    description: "Calming scent, used in aromatherapy to reduce stress.",
                    cost: "$20"
                },
                {
                    name: "Jasmine",
                    image: "https://cdn.pixabay.com/photo/2018/03/10/12/37/plant-3213968_1280.jpg",
                    description: "Sweet fragrance, promotes relaxation and better sleep.",
                    cost: "$18"
                },
                {
                    name: "Rosemary",
                    image: "https://cdn.pixabay.com/photo/2016/10/01/16/09/rosemary-1707831_1280.jpg",
                    description: "Invigorating scent, great for culinary use and focus.",
                    cost: "$16"
                }
            ]
        },
        {
            category: "Succulents & Cacti",
            plants: [
                {
                    name: "Aloe Vera",
                    image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg",
                    description: "Soothing sap, used for skin ailments and minor burns.",
                    cost: "$14"
                },
                {
                    name: "Echeveria",
                    image: "https://cdn.pixabay.com/photo/2016/11/21/16/05/cacti-1846147_1280.jpg",
                    description: "Beautiful rosette shapes, almost zero maintenance.",
                    cost: "$10"
                },
                {
                    name: "Jade Plant",
                    image: "https://cdn.pixabay.com/photo/2014/10/10/18/16/jade-plant-483567_1280.jpg",
                    description: "Symbol of good luck and prosperity, very resilient.",
                    cost: "$18"
                }
            ]
        }
    ];

    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    return (
        <div style={{ width: '100vw', minHeight: '100vh', backgroundColor: '#f9fdfa', overflowX: 'hidden', margin: 0, padding: 0 }}>
            <div className="navbar">
                <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); window.location.reload(); }}>
                    <div className="nav-logo-icon">🌿</div>
                    <span className="nav-logo-text">Paradise Nursery</span>
                </a>
                <div className="navbar-links">
                    <a href="#" className={`nav-link ${!showCart ? 'active' : ''}`} onClick={handlePlantsClick}>Plants</a>
                    <a href="#" className={`nav-link cart-icon-container ${showCart ? 'active' : ''}`} onClick={handleCartClick}>
                        Cart <span className="cart-icon">{totalItems}</span>
                    </a>
                </div>
            </div>

            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((category, index) => (
                        <div key={index} className="category-section">
                            <h2>{category.category}</h2>
                            <div className="product-list">
                                {category.plants.map((plant, plantIndex) => {
                                    const isAdded = cartItems.find(item => item.name === plant.name);
                                    return (
                                        <div key={plantIndex} className="product-card">
                                            <div className="product-image-container">
                                                <div className="product-badge">{plant.cost}</div>
                                                <img 
                                                    className="product-image" 
                                                    src={plant.image} 
                                                    alt={plant.name} 
                                                    onError={(e) => {
                                                        e.target.onerror = null; 
                                                        e.target.src="https://cdn.pixabay.com/photo/2018/11/17/07/11/succulents-3820697_1280.jpg"
                                                    }}
                                                />
                                            </div>
                                            <div className="product-content">
                                                <div className="product-title">{plant.name}</div>
                                                <div className="product-description">{plant.description}</div>
                                                <button 
                                                    className={`product-button ${isAdded ? 'added' : ''}`} 
                                                    onClick={() => handleAddToCart(plant)}
                                                    disabled={isAdded !== undefined}
                                                >
                                                    {isAdded ? "Added to Cart" : "Add to Cart"}
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={handlePlantsClick} />
            )}
        </div>
    );
}

export default ProductList;
