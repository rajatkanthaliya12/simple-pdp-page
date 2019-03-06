import React from 'react';

const productList = (props) => {
    return (
        <div className="col-sm-12 col-md-4">
            <div className="product-card-container border-gray rounded border mx-2 my-3  bg-light">
                <div className="position-relatived">
                    {props.product.productName}
                </div>

                <div className="px-3 phone-img">
                    <img alt={props.product.productName} src={props.product.productImage} />
                </div>
                <button onClick={()=>props.addToCart(props.product.productName)} type="button" className="btn btn-secondary add-cart">Add to cart</button>
            </div>
        </div>
    );
};
 
export default productList;