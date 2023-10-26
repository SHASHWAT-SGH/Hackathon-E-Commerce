import axios from 'axios';
import React, { useContext, useState } from 'react'
import { apiURL } from '../../App';
import { productsContext } from '../../contexts/productsContext';

export default function Categories({ setFetching }) {
    const [scrollLeft, setScrollLeft] = useState(0);
    const [selected, setselected] = useState('')
    const [selectedRecco, setselectedRecco] = useState(false);

    const { category, setCategory, setProductData, setSelectedCategory } = useContext(productsContext)

    const handleWheelScroll = (event) => {
        const { deltaX } = event;
        setScrollLeft((prevScrollLeft) => prevScrollLeft + deltaX);
    };

    const toggleCategory = async (categorySelected) => {
        setselectedRecco(false)
        setFetching(false)
        setSelectedCategory(categorySelected)
        await axios.get(`${apiURL}/api/products?category=${categorySelected}`, { withCredentials: true }).then((data) => {
            setProductData(data.data)
            categorySelected === '' ? setselected('') : setselected(data.data[0].category)
            setFetching(true)
        })

    }

    const toggleRecco = async () => {
        setFetching(false)
        setselected("")
        setSelectedCategory("")
        setselectedRecco(true)
        await axios.get(`${apiURL}/api/recommended`, { withCredentials: true }).then((data) => {
            setProductData(data.data.products)
            // console.log(data.data.products)
            setFetching(true);
        })

    }

    return (
        <>
            <div onWheel={handleWheelScroll} className="products-categories">
                <div className="slider-container">
                    <div className="slider">
                        <button className={selectedRecco ? `selected-category-buttonRecco` : `category-buttonRecco`} onClick={() => { toggleRecco() }}>Recommended</button>

                        <button className={selected === '' ? `selected-category-button` : `category-button`} onClick={() => toggleCategory('')}>All Products</button>
                        {
                            category?.map((data, index) => (
                                <button className={data === selected ? `selected-category-button` : `category-button`} key={index} onClick={() => toggleCategory(data)}>{data}</button>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
