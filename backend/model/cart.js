const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartSchema = new Schema({
    uid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    user:{
        type:String
    },
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        count: {
            type: Number,
            default: 1
        }
    }],

});

const Cart = mongoose.model('Cart', CartSchema);
// -------------------------------------------------------------------------

module.exports = { Cart }