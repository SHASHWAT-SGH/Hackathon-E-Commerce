import React, { useState } from 'react'
import './CartProduct.css'
import { useEffect } from 'react'
import axios from 'axios'
import { apiURL } from '../../App'

function CartProduct({ cart, id, name, description, price, date, location, category, quantity, brand, thumbnail, updateCart, setUpdateCart }) {

    const [currentQuantity, setCurrentQuantity] = useState(quantity);

    // console.log(id)
    async function handleDeleteCart() {
        // console.log(`${apiURL}/api/deleteOneFromCart?productId=${id}`)
        await axios.get(`${apiURL}/api/deleteOneFromCart?productId=${id}`, {
            withCredentials: true,
        })
        // .then(res => console.log(res.data))
        // .catch(err => console.log("not"))
    }



    async function handleCountMinus() {
        await axios
            .post(
                `${apiURL}/api/addToCart`,
                { productId: id, count: currentQuantity - 1 },
                { withCredentials: true }
            ).then((r) => {
                setCurrentQuantity(currentQuantity - 1)
                setUpdateCart(!updateCart)
            })

    }
    async function handleCountPlus() {
        await axios
            .post(
                `${apiURL}/api/addToCart`,
                { productId: id, count: currentQuantity + 1 },
                { withCredentials: true }
            ).then((r) => {
                setCurrentQuantity(currentQuantity + 1)
                setUpdateCart(!updateCart)
            })

    }
    // console.log(name)
    return (
        <div className='product-container'>
            <div style={{ width: '30%' }}>
                <img style={{ width: '100%', height: '15rem', borderTopLeftRadius: '2rem', borderBottomLeftRadius: '2rem' }} src={thumbnail} alt="" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '70%', padding: '0.7rem' }}>
                <div style={{ marginLeft: '2rem', width: '70%' }}>
                    <div style={{ fontSize: 30, height: '30%', fontWeight: 'bold' }}>
                        {name}
                    </div>
                    <div style={{ height: '40%' }}>
                        <div>Category : {category}</div>
                        <div>Posted : {date}</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
                        <div className='product-button'>Move To Wishlist</div>
                        <div className='product-button' onClick={handleDeleteCart}>Remove X</div>
                    </div>
                </div>
                <div style={{ width: '30%', fontSize: '1.2rem' }}>
                    <div>
                        Price:
                        ₹{price}
                    </div>
                    Quantity:
                    <div style={{ display: 'flex', width: '70%', height: '2rem', margin: '1rem' }}>
                        <div style={{ width: '33%', backgroundColor: 'grey', borderRadius: '2rem', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={handleCountMinus} >-</div>
                        <div style={{ width: '33%', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{currentQuantity}</div>
                        <div style={{ width: '33%', backgroundColor: 'grey', borderRadius: '2rem', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={handleCountPlus}>+</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartProduct
