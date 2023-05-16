import mongoose from 'mongoose';

const CollectionSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    title: {
        type: String,
        required: true
    },
    policy: {
        type: String,
        required: true
    },
    mintDate: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        default: 0
    },
    royalty: {
        type: String,
        required: false
    },
    nmkrLink: {
        type: String,
        default: "",
    },
    jpgLink: {
        type: String,
        default: "",
    },
    bannerUrl: {
        type: String,
        default: "",
    },
    artistUrl: {
        type: String,
        default: "",
    },
    digitalArtUrl: {
        type: String,
        default: "",
    },
    physicalArtUrl: {
        type: String,
        default: "",
    },
    newRelease: {
        type: Number,
        default: 0,
    },
    artDesc: {
        type: String,
        required: false
    },
    supply: {
        type: String,
        required: true
    },
    mintingDetails: {
        type: String,
        required: false
    },
    aboutMe: {
        type: String,
        required: false
    },
    twitter: {
        type: String,
        required: false
    },
    instagram: {
        type: String,
        required: false
    },
    discord: {
        type: String,
        required: false
    },
    webLink: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    patronId: {
        type: [String],
        default: []
    }
}, {timestamps: true})

export default mongoose.models.Collection || mongoose.model('Collection', CollectionSchema)