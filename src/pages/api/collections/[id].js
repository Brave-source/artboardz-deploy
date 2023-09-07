import dbConnect from "../../../utils/mongo";
import Collection from "../../../models/Collection";
import User from "../../../models/Collector"

export default async function handler(req, res) {
  const {
    method,
    query: { id },
    cookies
  } = req;
  const token = cookies.token

  await dbConnect();

  if (method === "GET") {
    try {
      const collection = await Collection.findById(id);
      res.status(200).json(collection);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "PUT") {
    try {
      const collection = await Collection.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(collection);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "DELETE") {
    const coll = await Collection.findById(id);
    const policy = coll.policy;
    const patronId = coll.patronId;
    try {   

      await Promise.all(
        patronId.map(async(item) => {
          return await User.findByIdAndUpdate(item,{
            $pull: { policyIds: policy }
          })
        })
      );
      
      await Collection.findByIdAndDelete(id);

      res.status(200).json("The collection has been deleted!");
    } catch (err) {
      res.status(500).json(err);
      console.log(err)
    }
  }
}
