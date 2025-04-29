import React, { useEffect, useState } from 'react';
import Tooltip from '../components/Tooltip/Tooltip.jsx';
import MenuCard from '../components/Card/Card.jsx';
import Button from '../components/Button/Button.jsx'; 
import '../styles/main.scss';

const MenuPage = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetch('https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
      })
      .catch(err => console.error('Error fetching meals:', err));
  }, []);

  const handleSeeMore = () => {
    setVisibleCount(prevCount => prevCount + 6);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setVisibleCount(6);
  };

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category === selectedCategory);

  const visibleItems = filteredProducts.slice(0, visibleCount);

  return (
    <div className="menu-container">
      <h1 className="menu">Browse our menu</h1>
      <p className="menu-text">
        Use our menu to place an order online, or{' '}
        <Tooltip text="Call here: +370 123 45 678" component="span">
          <span className="highlight">phone</span>
        </Tooltip>{' '}
        our store to place a pickup order. Fast and fresh food.
      </p>

      <div className="menu-buttons">
        <Button className="button--menu" onClick={() => handleCategoryClick('Dessert')}>Dessert</Button>
        <Button className="button--menu" onClick={() => handleCategoryClick('Dinner')}>Dinner</Button>
        <Button className="button--menu" onClick={() => handleCategoryClick('Breakfast')}>Breakfast</Button>
      </div>

      <div className="item-cards">
        {visibleItems.map(product => (
          <MenuCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>

      {visibleCount < filteredProducts.length && (
        <Button className="button--more" onClick={handleSeeMore}>
          See More
        </Button>
      )}
    </div>
  );
};

export default MenuPage;
