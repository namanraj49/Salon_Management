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

    

   

  }, { timestamps: true });

module.exports = mongoose.model('Shop', shopSchema);
