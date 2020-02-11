import React, { Component } from 'react';
import ProductList from '../containers/product/ProductList'
import Cart from '../containers/product/Cart'

function Dashboard () {
    return (
        <div>
            <h1>Welcome To the E-Commerce Application</h1>
            <div>
                <h2>Shopping Cart Example</h2>
                <hr />
                <ProductList />
                <hr />
                <Cart />
            </div>
        </div>
    );
}

export default Dashboard;
