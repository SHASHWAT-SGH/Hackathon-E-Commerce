import React from 'react'

function products() {
    return (
        <div>
            Hello
        </div>
    )
}

function CartPage() {
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ fontSize: 100, width: '50%', height: '100%', bottom: '0', marginTop: 70, backgroundColor: 'red' }}>
                {products()}
            </div>
            <div style={{ fontSize: 100, width: '50%', height: '80%', bottom: 0, backgroundColor: 'red' }}>
                hi
            </div>
        </div>
    )
}

export default CartPage
