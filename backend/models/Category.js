"use strict"
const {  Schema, model} = require('mongoose')
/* ------------------------------------------------------- *
{ "name": "Category 1" }
/* ------------------------------------------------------- */
// Category Model:

const CategorySchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true,'Categroy name is required'],
        unique: [true,'Category name is already exists']
    },

}, { collection: 'categories', timestamps: true })


module.exports = model('Category', CategorySchema)