import React, { Component } from 'react';
import './App.css';
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
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            {
              (!allValueAdded) ?
                <div className="row">
                  {this.state.productData.map((product, i) => {
                    if (product.isPublished === "true" && !product.addedToCart) {
                      return <ProductList addToCart={this.addOrRemoveToCart} key={i} product={product} />
                    }
                  })}
                </div> : <div className="jumbotron">
                  No more products available
            </div>
            }
          </div>
          <div className="col-md-4">
            <ShoppingCart products={this.state.cartValue} removeToCart={this.addOrRemoveToCart} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
