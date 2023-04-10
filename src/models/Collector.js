import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    image: {
        type: String,
        default: ""
    },
    nationality: {
        type: String, 
        required: false,
    },
    twitter: {
        type: String,
        required: false,
    },
    stakeAddress: {
        type: String,
        required: true,
    },
    display: {
        type: Boolean,
        default: true
    },
    assets: {
        type: [{
            name: {
                type: String,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            policyId: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                default: 1
            },
            unit: {
                type: String,
                required: true
            }
        }],
        default: []
    },
    policyIds: {
        type: [String],
        default: []
    }
}, {timestamp: true});

export default mongoose.models.User || mongoose.model("User", UserSchema)