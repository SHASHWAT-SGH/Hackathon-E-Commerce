import React, { useContext, useEffect, useState } from 'react'
import './CartPage.css'
import CartProduct from './CartProduct'
import { productsContext } from '../../contexts/productsContext'
import axios from 'axios';
import { apiURL } from '../../App';
import Checkout from './Checkout';



// function products() {
//     return (<></>
//         productdata.map((item, index) => {
//             return (
//                 <div className="skeleton-box" key={index}></div>
//             )
//         })
//     )
// }

function CartPage() {

    const { cartData, setCartData } = useContext(productsContext);
    const [fetching, setFetching] = useState(false)
    const [updateCart, setUpdateCart] = useState(false);


    useEffect(() => {
        axios
            .get(`${apiURL}/api/getCart`, { withCredentials: true })
            .then((data) => {
                setCartData(data.data.products)
                // console.log(data.data.products)
                setFetching(true)
            })

    }, [])

    useEffect(() => {
        axios
            .get(`${apiURL}/api/getCart`, { withCredentials: true })
            .then((data) => {
                setCartData(data.data.products)
                // console.log(data.data.products)
                setFetching(true)
            })

    }, [updateCart])



    return (
        <div style={{ display: 'flex', marginTop: 95 }}>
            <div style={{ width: '65%' }}>
                {cartData?.map((p) => (
                    <CartProduct
                        key={p.product._id}
                        id={p.product._id}
                        name={p.product.title}
                        description={p.product.description}
                        price={p.product.price}
                        date={p.product.date}
                        location={p.product.location}
                        category={p.product.category}
                        quantity={p.count}
                        brand={p.product.brand}
                        thumbnail={p.product.thumbnail}
                        updateCart={updateCart}
                        setUpdateCart={setUpdateCart}
                    />
                ))}
            </div>
            <div style={{ width: '35%' }}>
                <Checkout cartData={cartData} />
            </div>
        </div>
    )
}

export default CartPage
