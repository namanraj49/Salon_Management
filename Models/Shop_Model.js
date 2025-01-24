const ShopSchema = new mongoose.Schema(
  {
     shopName:{
      type:String,
        required:true,
        lowercase:true,
        trim:true,
        index:true
   },
   ownerName:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        index:true

   },
     email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    
   },
      address:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    
   },

   shopImage:{
    type:String,
    required:true
   },

   barber:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Barber'
   },

   rating: {
    type: Number,
    default: 0,
  },


  reviews: [{
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
    },
    reviewText: String,
        rating: Number,
      }],


    

   

  }, { timestamps: true });

module.exports = mongoose.model('Shop', shopSchema);
