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

  export const Customer = mongoose.model("Customer",customerSchema)
  