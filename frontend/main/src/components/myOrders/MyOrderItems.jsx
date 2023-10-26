import './MyOrders.css'


function MyOrderItems() {
    return (
        <div className='product-container'>
            <div style={{ width: '30%' }}>
                <img style={{ width: '100%', height: '15rem', borderTopLeftRadius: '2rem', borderBottomLeftRadius: '2rem' }} src={require('../../assets/img/sampleImg.png')} alt="" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '70%', padding: '0.5rem' }}>
                <div style={{ marginLeft: '1rem', width: '70%' }}>
                    <div style={{ fontSize: 30, height: '30%', fontWeight: 'bold', margin: '0.3rem' }}>
                        Product Name
                    </div>
                    <div style={{ height: '25%', margin: '0.2rem' }}>
                        <div>Category : others</div>
                        <div>Posted : 12/45/7888</div>
                    </div>
                    <div>
                        Will be delivered in 3 working days
                    </div>
                    {/* <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
                        <div className='product-button' onClick={handleMoveToWishlist}>Move To Wishlist</div>
                        <div className='product-button' onClick={handleDeleteCart}>Remove</div>
                    </div> */}
                </div>
                <div style={{ width: '50%', fontSize: '1.2rem', fontWeight: 'bold', margin: '0.3rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ width: '70%' }}>
                        Price : ₹5000
                    </div>
                    <div className='quantity-counter-container'>
                        Quantity: 5
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyOrderItems
