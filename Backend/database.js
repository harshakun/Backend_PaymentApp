const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://kannannaidu73:GqvrtqHdv8PE3OW3@cluster0.d3cju.mongodb.net/');

//create schema
const payment=mongoose.Schema({
    username:String,
    firstname:String,
    lastname:String,
    password:String
})

const account=mongoose.Schema({
    userid:{
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'user',
        required: true
    },
    balance:Number
})
const user=mongoose.model("user",payment);
const bank=mongoose.model("bank",account);
  

module.exports={
    user,
    bank
}