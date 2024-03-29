import { useEffect, useState } from "react";
import CancelIcon from "../../Assets/Icons/CancelIcon";
import OptionsIcon from "../../Assets/Icons/Options";
import CloseIcon from '@mui/icons-material/Close';
import { Avatar } from "../UI/Avatar";
import { deleteCollectorFailure, deleteCollectorStart, deleteCollectorSuccess, updateCollectorFailure, updateCollectorStart, updateCollectorSuccess } from "../../store/redux-store/CollectorSlice";
import axios from "axios";
import Notiflix from "notiflix";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { baseURL } from "../../utils/url";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const CollectorsItems = ({
  image,
  address,
  name,
  nationality,
  twitter,
  uniqueCollection,
  collectionSize,
  display,
  id
}) => {
  const [actionsPanelIsShown, setActionsPanelIsShown] = useState(false);
  const [img, setImg] = useState(null);
  const externalURL = "https://www.admin.artboardz.net"
  const globalURL = window.location.hostname.substring(0,3).toLocaleLowerCase()

  const dispatch = useDispatch();
  const toggleActionHandler = (second) => {
    setActionsPanelIsShown((oldState) => !oldState);
  };
  const displayColor = display ? "bg-[#DC2626]": "bg-[#059669]";
  const nfts = collectionSize?.filter((item) => uniqueCollection?.includes(item.policyId))
  const collector = useSelector((collector) => collector.collector.collectors.filter((item) => item?._id === id))[0]
  const confirmDelete = (id) => {
    Notiflix.Confirm.show(
      "Delete Collection!!!",
      "You are about to delete this collection",
      "Delete",
      "Cancel",
      function okCb() {
        deleteCollector(id);
      },
      function cancelCb() {
        console.log("Delete Canceled");
      },
      {
        width: "320px",
        borderRadius: "3px",
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom",
      }
    );
  };

  useEffect(() =>{
    img && deleteImageFromS3(img)
  },[img])
  
  const handleDisplay = async() => {
    const user = {...collector, display: !collector.display};
    dispatch(updateCollectorStart())
    try{
      // http://localhost:3000/api/collectors
      const res = await axios.put(globalURL == "www" ? `${externalURL}/api/collectors/${id}`:`${baseURL}/api/collectors/${id}`, user);
      dispatch(updateCollectorSuccess({user, id}))
    }catch(err) {
      dispatch(updateCollectorFailure())
    }
  }

  const deleteImageFromS3 = async (img) => {

    const bucketParams = { Bucket: "artboardz", Key: img.split("/")[3] };
    const cred = {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY,
    }
      const client = new S3Client({ region: "us-east-1", credentials: cred});
    try {
      const data = await client.send(new DeleteObjectCommand(bucketParams));
      console.log("Success. Object deleted.", data);
      return data; // For unit tests.
    } catch (err) {
      console.log("Error", err);
    }
  };

  const deleteCollector = async(id) => {
    dispatch(deleteCollectorStart())
    try {
      // await axios.delete(`http://localhost:3000/api/collectors/${id}`)
      await axios.delete(globalURL == "www" ? `${externalURL}/api/collectors/${id}`:`${baseURL}/api/collectors/${id}`);
      setImg(image)
      dispatch(deleteCollectorSuccess(id))
      toast.success("Successfully deleted")
    }catch(err){
      dispatch(deleteCollectorFailure())
      toast.error("Something went wrong")
    }
  }
  return (
    <li className="grid grid-cols-9 py-5 place-items-center text-sm font-semibold tracking-wide break-word border-b border-[#AECEFF] last-of-type:border-none text-[#323A46] relative">
    <div className="w-[48px] aspect-square rounded-full">
      <Avatar image={image ? image : "https://artboardz.s3.us-east-1.amazonaws.com/defaultProfile.png"} />
    </div>
    {address?.length > 0 ? (
       <div>
       <a href={`https://pool.pm/${address[0]}`} target="_blank" rel="noreferrer" >
       <p className="break-all">{address[0]?.slice(0,5)}...{address[0]?.slice(address[0]?.length - 4)}</p>
       </a>
     </div>
    ): (
      <div>....</div>
    )}
    <div>
      <p>{name}</p>
    </div>
    <div>
      <p>{nationality}</p>
    </div>
    <div>
      <p>{twitter?.slice(20)}</p>
    </div>
    <div>
      <p>{uniqueCollection?.length}</p>
    </div>
    <div>
      <p>{nfts?.length}</p>
    </div>
    <div className="w-full">
      <p
        className={`${displayColor} py-[5px] w-full text-center rounded-md text-slate-700`}
      >
        {display ? "Not Displayed" : "Displayed"}
      </p>
    </div>
    <div onClick={toggleActionHandler}>
      <button>
        <OptionsIcon />
      </button>
    </div>
    {actionsPanelIsShown && (
      // className="toggle toggle-xs" 
      <div className="absolute  right-0 rounded border border-black p-5 bg-white space-y-3 z-50">
        <p className="flex gap-2 items-center">
          Display User
          <input type="checkbox" className="toggle toggle-xs" onChange={handleDisplay} />
          <CloseIcon onClick={toggleActionHandler} className="relative bottom-4 left-4"/>
        </p>
        <button onClick={(e) => {
          e.stopPropagation()
          e.nativeEvent.preventDefault()
          confirmDelete(id)
        }}>
          Delete User
        </button>
      </div>
    )}
  </li>
  );
};

export default CollectorsItems;
