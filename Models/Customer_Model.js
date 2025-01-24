const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      unique:true,
    },
    password:{
         type:String,
         required:true,
    },
    appointments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment',
    }],
    favorites: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Barber',
    }],
  });

 
  
module.exports = mongoose.model('Customer', customerSchema);