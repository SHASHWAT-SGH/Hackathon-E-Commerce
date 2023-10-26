import React, { useEffect, useState } from 'react'
import { apiURL } from '../../App';
import axios from 'axios';
import MyOrderItems from './MyOrderItems';

function MyOrders() {

    const [orderData, setOrderData] = useState([]);
    const [fetching, setFetching] = useState(false)

    useEffect(async () => {
        await axios
            .get(`${apiURL}/api/getOrders`, { withCredentials: true })
            .then((data) => {
                // setOrderData(data.data.products)
                console.log(data.data)
                setFetching(true)
            })

    }, [])

    return (
        <div style={{ width: '90%', marginTop: '7%' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', marginLeft: '2.5rem', alignItems: 'center' }}>My Orders</div>
            {/* {orderData?.map((p) => (
                <MyOrderItems
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
                />
            ))} */}

            {/* < MyOrderItems />
            <MyOrderItems /> */}
        </div >
    )
}

export default MyOrders
