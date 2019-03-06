import React from 'react';

const ShoppingCart = (props) => {
    return (
        <div className="product-card-container border-gray rounded border mx-2 my-3  bg-light">
            <p>Shopping Cart</p>

            {props.products.length>0 ? props.products.map((product, i) => (
                <div key={i} className="cart-container border-gray rounded border mx-1 my-1  bg-light">
                    <div className="cart-value">
                        <span className="name">{product.productName}</span>
                        <button onClick={() => props.removeToCart(product.productName)} type="button" className="btn btn-secondary remove-cart">Remove</button>
                    </div>
                </div>

            )):<div className="jumbotron">No product added</div>}

        </div>

    );
};

export default ShoppingCart;