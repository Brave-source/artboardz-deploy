import { useState } from "react";
import CancelIcon from "../../Assets/Icons/CancelIcon";
import OptionsIcon from "../../Assets/Icons/Options";
import { Avatar } from "../UI/Avatar";
import CloseIcon from '@mui/icons-material/Close';

const CollectorsItems = ({
  image,
  walletAddress,
  name,
  nationality,
  twitter,
  uniqueCollection,
  collectionSize,
  display,
}) => {
  const [actionsPanelIsShown, setActionsPanelIsShown] = useState(false);
  const toggleActionHandler = (second) => {
    setActionsPanelIsShown((oldState) => !oldState);
  };
  const displayColor = display ? "bg-[#059669]" : "bg-[#DC2626]";

  const nfts = collectionSize?.filter((item) => uniqueCollection?.includes(item.policyId))

  return (
    <li className="grid grid-cols-9 py-5 place-items-center text-sm font-semibold tracking-wide break-word border-b border-[#AECEFF] last-of-type:border-none text-[#323A46] relative">
      <div className="w-[48px] aspect-square rounded-full">
        <Avatar image={image ? image : "https://firebasestorage.googleapis.com/v0/b/cardano-d265c.appspot.com/o/defaultProfile.png?alt=media&token=a2172f23-507f-4e25-a64d-beb767d9d0f3"} />
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
        <p>{uniqueCollection.length}</p>
      </div>
      <div>
        <p>{nfts.length}</p>
      </div>
      <div className="w-full">
        <p
          className={`${displayColor} py-[5px] w-full text-center rounded-md text-slate-700`}
        >
          {display ? "Displayed" : "Not Displayed"}
        </p>
      </div>
      <button onClick={toggleActionHandler}>
        <OptionsIcon />
      </button>
      {actionsPanelIsShown && (
        <div className="absolute  right-0 rounded border border-black p-5 bg-white space-y-3 z-50">
          <p className="flex gap-2 items-center">
            Display User
            <input type="checkbox" className="toggle toggle-xs" />
            <CloseIcon onClick={toggleActionHandler} className="relative bottom-4 left-4"/>
          </p>
          <button>
          <p>Delete User</p>
          </button>
        </div>
      )}
    </li>
  );
};

export default CollectorsItems;
