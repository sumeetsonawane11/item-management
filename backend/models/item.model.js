const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    provider: { type: String, required: true },
    availableDate: { type: String, required: true },
    qty: { type: String, required: true },
    location: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true }
});

module.exports = mongoose.model('Item', itemSchema);