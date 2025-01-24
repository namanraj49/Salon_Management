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


  /*customerSchema.pre("save",async function (next) {
    if(!this.isModified("password")){

      return next();
    }
    this.password = await bcrypt.hash(this.password,10)
    next()
  })

  userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
 }
 
 userSchema.methods.generateAccessToken = function(){
    return  jwt.sign({
         _id:this._id,
         email:this.email,
         username:this.username,
         fullName:this.fullName
     },
     process.env.ACCESS_TOKEN_SECRET,
     {
         expiresIn:process.env.ACCESS_TOKEN_EXPIRY,
     }
 )
 }
 userSchema.methods.generateRefreshToken = function(){
     return  jwt.sign({
         _id:this._id,
         
     },
     process.env.REFRESH_TOKEN_SECRET,
     {
         expiresIn:process.env.REFRESH_TOKEN_EXPIRY,
     }
 )
 }*/
 

  export const Customer = mongoose.model("Customer",customerSchema)
  