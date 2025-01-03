import mongoose from "mongoose";

const serviceProviderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required:true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  cnicPicture: {
    type: String,
    required: true,
  },
  // categoryId:{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Categories",
  //   required: true,
  // },
  location: {
    type: String,
    default: null, 
    trim: true,
  },
  // isTechnical:{
  //   type:Boolean,
  //   required:true,
  // },
  ordersCompleted: { type: Number, default: 0 }, 
  overallEarnings: { type: Number, default: 0 }, 
}, {timestamps: true, });

const serviceProvider = mongoose.model("ServiceProvider", serviceProviderSchema);

export default serviceProvider;
