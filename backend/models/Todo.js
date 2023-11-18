"use strict"
const {  Schema, model} = require('mongoose')
/* ------------------------------------------------------- *
{ "title": "Todo 1" , 
    "userId":"1213123123123123",
    "catergoryId":"123234234234234",
    "isCompleted":false,
    "description":"Todo description"
}
/* ------------------------------------------------------- */
// Todo Model:

const TodoSchema = new Schema({
     userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },
     categoryId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref:"Category"
    },
    title:{
        type:String, 
        require:[true, 'Todo Title is requird'],
        trim: true,
        minlength: [3,'Todo Title must be 3 characters minimum']
    },
    description:{
        type:String, 
        require:[true, 'Todo Description is requird'],
        trim: true,
        minlength: [10,'Todo Descripton must be 10 characters minimum']
    },
    isCompleted:{
        type:Boolean, 
        default:false,
    }


}, { collection: 'todos', timestamps: true })


module.exports = model('Todo', TodoSchema)