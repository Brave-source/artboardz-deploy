import mongoose from "mongoose";

const MerchantSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: false
    },
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    password: {
        type: String, 
        required: false
    },
    contact: {
        type: Number,
        required: false
    },
    userImage: {
        type: String,
        required: true,
    },
    partnerImage: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    contact: {
        type: Number,
        required: false,
    },
    partnerName: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: true,
    },
    contactNumber1: {
        type: Number,
        required: false,
    },
    instagram: {
        type: String,
        required: true,
    },
    youtube: {
        type: String,
        required: true,
    },
    website: {
        type: String,
        required: true,
    },
    otherBenefits1: {
        type: String,
        required: true,
    },
    otherBenefits2: {
        type: String,
        required: true
    },
    acceptBookings: {
        type: Boolean,
        default: false,
    },
    firstDiscount: {
        type: Number,
        default: 0
    },
    secondDiscount: {
        type: Number,
        default: 0
    },
}, {timestamps: true});

export default mongoose.models.Merchant || mongoose.model("Merchant", MerchantSchema)