import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: false
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
        unique: true
    },
    password: {
        type: String,
        required: false,
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
    address: {
        type: [String],
        default: [],
    },
    artboardTag: {
        type: String,
        required: false
    },
    display: {
        type: Boolean,
        default: false
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
    display: {
        type: Boolean,
         default: false
    },
    policyIds: {
        type: [String],
        default: []
    },
}, {timestamps: true});

export default mongoose.models.User || mongoose.model("User", UserSchema)