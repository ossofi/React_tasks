import React, { useEffect, useState } from 'react';
import Tooltip from '../components/Tooltip/Tooltip';
import MenuCard from '../components/Card/Card';
import Button from '../components/Button/Button';
import '../styles/main.scss';

interface Product {
  id: string;
  meal: string;
  price: number;
  img: string;
  category: string;
  instructions?: string;
}

interface MenuPageProps {
  user: { name: string; email: string } | null;
}

const MenuPage: React.FC<MenuPageProps> = ({ user }) => {
  const ITEMS_PER_PAGE = 6;

  const [products, setProducts] = useState<Product[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(ITEMS_PER_PAGE);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data: Product[]) => {
        setTimeout(() => {
          setProducts(data);
          const uniqueCategories = Array.from(new Set(data.map(item => item.category)));
          setCategories(uniqueCategories);
          setLoading(false);
        }, 500);
      })
      .catch(err => {
        setError('Failed to load meals');
        setLoading(false);
        console.error('Error fetching meals:', err);
      });
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  const visibleItems = filteredProducts.slice(0, visibleCount);

  const handleSeeMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setVisibleCount(ITEMS_PER_PAGE);
  };

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

      {loading && <p>Loading menu...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <>
          <div className="menu-buttons">
            {categories.map(category => (
              <Button
                key={category}
                className={`button--menu ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="item-cards">
            {visibleItems.map(product => (
              <MenuCard
                key={product.id}
                product={product}
                user={user}
                mode="menu"
              />
            ))}
          </div>

          {visibleCount < filteredProducts.length && (
            <Button className="button--more" onClick={handleSeeMore}>
              See More
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default MenuPage;
