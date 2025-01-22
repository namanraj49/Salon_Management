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
  },
{timestamps:true}
);
  
export const Barber = mongoose.model("Barber",barberSchema) 