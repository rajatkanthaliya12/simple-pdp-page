import React, { Component } from 'react';
import './App.scss';
import { data } from "./productData/data";
import ProductList from "./component/productList";
import ShoppingCart from "./component/shoppingCart";


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      productData: [],
      cartValue: [],
      allValueAdded:false
    };
  }

  // Using Lifecycle because if data came from server async way.
  componentDidMount() {
    this.setState({ productData: data });
  }


  addOrRemoveToCart = productName => {
    const productData = this.state.productData.map((product, i) => {
      if (productName === product.productName) {
        product.addedToCart = !product.addedToCart;
      }
      return product;
    })
    const cartValue = productData.filter(product => product.addedToCart);
    const allValueAdded = !productData.find(product => !product.addedToCart && product.isPublished==="true");
    this.setState({ productData, cartValue,allValueAdded });
  };


  render() {
    const allValueAdded = this.state.allValueAdded;
    return (
      <div>
        <ProductList  />
      </div>
    );
  }
}

export default App;
