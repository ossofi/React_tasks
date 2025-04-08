import { products } from '../data/data.jsx';
import Tooltip from "../components/Tooltip.jsx";

const MenuPage = () => {
  return (
    <div className='menu-container'>
      <h1 className='menu'>Browse our menu</h1>
      <p className='menu-text'>
        Use our menu to place an order online, or{" "}
        <Tooltip text="Call here: +370 123 45 678" component="span">
          <span className="highlight">phone</span>
        </Tooltip>{" "}
        our store to place a pickup order. Fast and fresh food.
      </p>
      <div className='menu-buttons'>
        <button className='menu-button'>Desert</button>
        <button className='menu-button'>Dinner</button>
        <button className='menu-button'>Breakfast</button>
      </div>
      <div className="item-cards">
        {products.map((product) => (
          <div className="item-card" key={product.title}> 
            <div className="item-card-left">
              <img src={product.img} alt={product.title} className="item-img" />
            </div>
            <div className="item-card-right">
              <div className="item-info">
                <h2 className='product-title'>{product.title}</h2>
                <span className='card-price'>{product.price}</span>
              </div>
              <p className="item-description">{product.description}</p>
              <div className="item-footer">
                <div className="item-amount">
                  <span>1</span>
                </div>
                <button className="add-to-cart">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className='more-button'>See More</button>
    </div>
  );
}

export default MenuPage;
