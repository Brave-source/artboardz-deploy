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
    artboardTag: {
        type: String,
        required: false
    },
    display: {
        type: Boolean,
        default: true
    },
    units: {
        type: [String],
        default: []
    },
    policyIds: {
        type: [String],
        default: []
    }
}, {timestamp: true});

export default mongoose.models.User || mongoose.model("User", UserSchema)