import React, { useEffect, useLayoutEffect, useState } from 'react'
import './Checkout.css'
import CheckoutItems from './CheckoutItems'
import { useContext } from 'react';
import { productsContext } from '../../contexts/productsContext';
import { useNavigate } from "react-router-dom";


function Checkout({ cartData }) {

    const navigate = useNavigate();

    const { totalPrice, setTotalPrice } = useContext(productsContext)
    useEffect(() => {
        if (cartData.length > 0) {
            const newTotalPrice = cartData.reduce((total, p) => total + (p.product.price * p.count), 0);
            setTotalPrice(newTotalPrice);
        } else {
            setTotalPrice(0);
        }
    }, [cartData]);


    return (
        <div className='checkout-container'>
            <div className="checkout-heading">
                Order Summary:
            </div>
            <div className="checkout-subHeading">
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontWeight: 'bold', marginBottom: '1rem', fontSize: '1rem' }}>
                    <div style={{ width: '10%' }}>
                        No.
                    </div>
                    <div style={{ width: '30%' }}>
                        Product Name
                    </div>
                    <div style={{ width: '20%' }}>
                        Price
                    </div>
                    <div style={{ width: '20%' }}>
                        Quantity
                    </div>
                    <div style={{ width: '20%' }}>
                        Total
                    </div>

                </div>
                {
                    cartData?.map((p, index) => {
                        return (
                            <CheckoutItems
                                index={index}
                                key={p.product._id}
                                id={p.product._id}
                                name={p.product.title}
                                quantity={p.count}
                                price={p.product.price}

                            />
                        )
                    })
                }
                <hr />
                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: '1.5rem' }}>
                        Payable Amount :
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                        ₹{totalPrice}
                    </div>
                </div>
                <div className="order-button">
                    <div onClick={() => navigate("/payments")}>Order Now</div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
