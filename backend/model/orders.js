const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrdersSchema = new Schema({
    uid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    user: {
        type: String
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    time:{ type: Date, default: Date.now }
});

const Orders = mongoose.model('Orders', OrdersSchema);
// -------------------------------------------------------------------------

module.exports = { Orders }