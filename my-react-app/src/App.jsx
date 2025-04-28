import React, { Component } from 'react';
import MenuPage from './pages/Menu';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartCount: 0,
    };
  }

  handleAddToCart = () => {
    this.setState(prevState => ({
      cartCount: prevState.cartCount + 1,
    }));
  };

  render() {
    return (
      <div className="app">
        <div className="app-container">
          <Header cartCount={this.state.cartCount} />
          <MenuPage onAddToCart={this.handleAddToCart} />
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
