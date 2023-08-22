import { useState } from "react";
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

const CollectorsItems = ({
  image,
  walletAddress,
  name,
  nationality,
  twitter,
  uniqueCollection,
  collectionSize,
  display,
  id
}) => {
  const [actionsPanelIsShown, setActionsPanelIsShown] = useState(false);
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

  const deleteCollector = async(id) => {
    dispatch(deleteCollectorStart())
    try {
      await axios.delete(`http://localhost:3000/api/collectors/${id}`)
      // await axios.delete(globalURL == "www" ? `${externalURL}/api/collectors/${id}`:`${baseURL}/api/collectors/${id}`);
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
      <Avatar image={image ? image : "https://firebasestorage.googleapis.com/v0/b/cardano-d265c.appspot.com/o/defaultProfile.png?alt=media&token=a2172f23-507f-4e25-a64d-beb767d9d0f3"} />
    </div>
    <div>
      <a href={`https://pool.pm/${walletAddress}`} target="_blank" rel="noreferrer" >
      <p className="break-all">{walletAddress?.slice(0,5)}...{walletAddress?.slice(walletAddress.length - 4)}</p>
      </a>
    </div>
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
