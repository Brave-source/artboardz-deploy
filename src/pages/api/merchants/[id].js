import Merchant from "../../../models/Merchant";
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

  if (method === "PUT") {
    
  }

  if (method === "DELETE") {
    try {
        await Merchant.findByIdAndDelete(id);
        res.status(200).json("Merchant successfully deleted!")
    }catch(err){
        console.log(err);
    }
  }
}
