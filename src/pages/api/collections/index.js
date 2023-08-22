import dbConnect from "../../../utils/mongo";
import Collection from "../../../models/Collection";
import Vendor from "../../../models/Vendor";

export default async function handler (req, res) {
    const {method} = req;

    await dbConnect();

    if(method === "GET") {
        try {
            const collections = await Collection.find().sort({createdAt: -1});
            res.status(200).json(collections);
        }catch(err) {
            console.log(err)
            res.status(500).json(err);
        }
    }

    if(method === "POST") {
        const vendors = req.body.vendors;
        try {
            const collection = await Collection.create(req.body);
            await Promise.all(
                vendors.map((item) => {
                    Vendor.create({
                        collectionId: collection._id,
                        position: item.position,
                        title: item.title,
                        desc: item.desc,
                        img: item.img
                    })
                })
            )
            res.status(200).json(collection);
        }catch(err) {
            res.status(500).json(err);
        }
    }
}