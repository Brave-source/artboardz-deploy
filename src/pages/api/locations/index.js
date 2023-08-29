import dbConnect from "../../../utils/mongo";
import Vendor from "../../../models/Vendor";

export default async function handler (req, res) {
    const {method} = req;

    await dbConnect();

    if(method === "GET") {
        try {
            const vendors = await Vendor.find().sort({createdAt: -1});
            res.status(200).json(vendors);
        }catch(err) {
            console.log(err)
            res.status(500).json(err);
        }
    }

    if(method === "POST") {
       try {

       }catch(err) {

       }
    }
}