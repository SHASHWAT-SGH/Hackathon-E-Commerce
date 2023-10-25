import React from 'react'

function TotalPrice({ key, id, name, quantity, price, index }) {
    let newPrice = 0;
    function price(quantity, price) {
        newPrice = newPrice + (quantity * price);
    }
    return (
        <div>
            {newPrice}
        </div>
    )
}

export default TotalPrice
