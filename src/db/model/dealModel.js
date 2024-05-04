import mongoose from "mongoose";

const dealSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter deal title"],
  },
  image: {
    type: String,
  },
  price: { type: String, required: [true, "please enter deal price"] },
});

const Deal = mongoose.models.deals || mongoose.model("deals", dealSchema);
export default Deal;
