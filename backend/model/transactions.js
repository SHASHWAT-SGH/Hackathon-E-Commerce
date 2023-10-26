const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartSchema = new Schema({
    senderId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    recieverId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    transactionId: [String],
    amount:{type:mongoose.Decimal128},
    time:{ type: Date, default: Date.now }
});

const Cart = mongoose.model('Cart', CartSchema);
// -------------------------------------------------------------------------

module.exports = { Cart }