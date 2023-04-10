import { useState } from "react";
import CancelIcon from "../../Assets/Icons/CancelIcon";
import OptionsIcon from "../../Assets/Icons/Options";
import CloseIcon from '@mui/icons-material/Close';
import { Avatar } from "../UI/Avatar";
import { deleteCollectorFailure, deleteCollectorStart, deleteCollectorSuccess } from "../../store/redux-store/CollectorSlice";
import axios from "axios";
import Notiflix from "notiflix";
import { useDispatch } from "react-redux";

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
  const [value, setValue] = useState(null);
  const dispatch = useDispatch();
  const toggleActionHandler = (second) => {
    setActionsPanelIsShown((oldState) => !oldState);
  };
  const displayColor = display ? "bg-[#059669]" : "bg-[#DC2626]";
  const nfts = collectionSize?.filter((item) => uniqueCollection?.includes(item.policyId))
console.log(value)
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
  const deleteCollector = async(id) => {
    dispatch(deleteCollectorStart())
    try {
      await axios.delete(`${baseURL}/api/collectors/${id}`);
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
      <Avatar image={image ? image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvFFG-hAuwWCF1wpo8rDXVEfoFI4_MTg0V8Q&usqp=CAU"} />
    </div>
    <div>
      <p className="break-all">{walletAddress.slice(0,5)}...{walletAddress.slice(walletAddress.length - 4)}</p>
    </div>
    <div>
      <p>{name}</p>
    </div>
    <div>
      <p>{nationality}</p>
    </div>
    <div>
      <p>{twitter.slice(20)}</p>
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
        {display ? "Displayed" : "Not Displayed"}
      </p>
    </div>
    <div onClick={toggleActionHandler}>
      <button>
        <OptionsIcon />
      </button>
    </div>
    {actionsPanelIsShown && (
      <div className="absolute  right-0 rounded border border-black p-5 bg-white space-y-3 z-50">
        <p className="flex gap-2 items-center">
          Display User
          <input type="checkbox" className="toggle toggle-xs" onChange={(e) => setValue(e.target.value)} />
          <CloseIcon onClick={toggleActionHandler} className="relative bottom-4 left-4"/>
        </p>
        <button onClick={() => deleteCollector(id)}>
          Delete User
        </button>
      </div>
    )}
  </li>
  );
};

export default CollectorsItems;
