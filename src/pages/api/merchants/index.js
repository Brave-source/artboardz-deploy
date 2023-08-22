import dbConnect from "../../../utils/mongo";
import Merchant from "../../../models/Merchant";

export default async function handler (req, res) {
    const {method} = req;

    await dbConnect();

    if(method === "GET") {
        try {
            const merchants = await Merchant.find().sort({createdAt: -1});
            res.status(200).json(merchants);
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