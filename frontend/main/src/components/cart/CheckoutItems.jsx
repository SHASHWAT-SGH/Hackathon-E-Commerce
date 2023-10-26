import React from 'react'



function CheckoutItems({ key, id, name, quantity, price, index }) {
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.7rem', backgroundColor: '#ffffff47', borderRadius: '0.5rem', padding: '1rem', }}>
                <div style={{ width: '10%' }}>
                    {index + 1}.
                </div>
                <div style={{ width: '30%' }}>
                    {name}
                </div>
                <div style={{ width: '20%' }}>
                    ₹{price}
                </div>
                <div style={{ width: '20%' }}>
                    {quantity}
                </div>
                <div style={{ width: '20%' }}>
                    ₹{quantity * price}
                </div>
            </div>
        </div>
    )
}

export default CheckoutItems
