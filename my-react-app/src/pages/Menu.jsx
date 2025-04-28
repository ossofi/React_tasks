import React, { Component } from 'react';
import Tooltip from '../components/Tooltip/Tooltip.jsx';
import MenuCard from '../components/Card/Card.jsx';
import Button from '../components/Button/Button.jsx'; 

class MenuPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      visibleCount: 6,
    };
  }

  componentDidMount() {
    fetch('https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals')
      .then(res => res.json())
      .then(data => {
        this.setState({ products: data });
      })
      .catch(err => console.error('Error fetching meals:', err));
  }

  handleSeeMore = () => {
    this.setState(prevState => ({
      visibleCount: prevState.visibleCount + 6,
    }));
  };

  render() {
    const { products, visibleCount } = this.state;
    const visibleItems = products.slice(0, visibleCount);

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
          <Button className="button--menu">Desert</Button>
          <Button className="button--menu">Dinner</Button>
          <Button className="button--menu">Breakfast</Button>
        </div>

        <div className="item-cards">
          {visibleItems.map(product => (
            <MenuCard
              key={product.id}
              product={product}
              onAddToCart={this.props.onAddToCart}
            />
          ))}
        </div>

        {visibleCount < products.length && (
          <Button className="button--more" onClick={this.handleSeeMore}>
            See More
          </Button>
        )}
      </div>
    );
  }
}

export default MenuPage;
