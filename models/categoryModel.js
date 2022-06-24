const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
},{
    timestamps: true
});

module.exports = new mongoose.model('Product', categorySchema);