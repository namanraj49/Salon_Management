import Shop_Model from "./Shop_Model";

const barberSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    experience: {
      type: Number, // Years of experience
      required: true,
    },
    specialties: [String], // E.g., "fade", "beard trim"
   
    availability: {
      type: [{
        day: {
          type: String,
          required: true,
        },

        startTime: {
          type: String,
          required: true,
        },

        endTime: {
          type: String,
          required: true,
        },

      }],

      default: [],
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

      shop_owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Shop',
        required:true
      },
      schedule:{
        Monday:[{start:String,end:String}],
        Tuesday:[{start:String,end:String}],
        Wednesday:[{start:String,end:String}],
        Thursday:[{start:String,end:String}],
        Friday:[{start:String,end:String}],
        Saturday:[{start:String,end:String}],
        Sunday:[{start:String,end:String}],
      }
  },
{timestamps:true}
);
  
export const Barber = mongoose.model("Barber",barberSchema) 