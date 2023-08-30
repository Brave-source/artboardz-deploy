import Vendor from "../../../models/Vendor";
import dbConnect from "../../../utils/mongo";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
    cookies
  } = req;
  const token = cookies.token

  await dbConnect();

  if (method === "GET") {
    
  }

  if(method === "PUT") {
    try {
     const updateLocation = await Vendor.findByIdAndUpdate(id, req.body);
     res.status(200).json(updateLocation);
    }catch(err) {
     console.log(err)
     res.status(500).json(err);
    }
 }

  if (method === "DELETE") {
    try {
        await Vendor.findByIdAndDelete(id);
        res.status(200).json("Location successfully deleted!")
    }catch(err){
        console.log(err);
    }
  }
}
