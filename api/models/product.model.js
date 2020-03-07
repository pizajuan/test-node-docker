const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        validate: {
            validator: function (v) {
                return v > 0
            },
            message: 'You must provide price more than zero.'
        }
    },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);