import mongoose from "mongoose";

const VendorSchema = new mongoose.Schema({
  collectionId: {
    type: String,
    required: true,
  },
  position: {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    }
  },
  title: {
      type: String,
      required: false
  },
  desc: {
      type: String,
      required: false
  },
  img: {
      type: String,
      default: ""
  }
}, {timestamps:  true})

export default mongoose.models.Vendor || mongoose.model("Vendor", VendorSchema)