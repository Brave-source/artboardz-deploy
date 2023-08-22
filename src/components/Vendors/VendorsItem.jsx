import React from 'react';
import DefoultImage from '../../Assets/Icons/defaultProfile.png'
import Image from 'next/image';
import EditIcon from '../../Assets/Icons/EditIcon';
import { TrashIcon } from "@heroicons/react/24/outline";
import MerchantsEdit from './MerchantsEdit';
import { useState } from 'react';
import AddTaskIcon from '@mui/icons-material/AddTask';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PreviewIcon from '@mui/icons-material/Preview';
const VendorsItem = () => {
  // Placeholder array with 3 objects to create 3 rows
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleMerchantModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const confirmDelete = (id) => {
    Notiflix.Confirm.show(
      "Delete merchant!!!",
      "You are about to delete this merchant",
      "Delete",
      "Cancel",
      function okCb() {
        deleteMerchant(id);
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

  const deleteMerchant = async(id) => {
    dispatch(deleteMerchantStart())
    try {
      // globalURL == "www" ? `${externalURL}/api/merchants/${id}` :`${baseURL}/api/merchants/${id}`
      await axios.delete(`http://localhost:3000/api/merchants/${id}`);
      dispatch(deleteMerchantSuccess(id))
    }catch(err){
      console.log(err);
      dispatch(deleteMerchantFailure())
    }
  }

  return (
    <div>
      {merchants.map((item, index) => (
        <div className="grid grid-cols-6 space-y-2 place-items-center text-black" key={index}>
          <div className="flex gap-2 items-center ml-6">
            <Image src={item?.partnerImage? item?.partnerImage : DefoultImage} width={100} height={100} alt="Placeholder" className="h-8 w-8"/> {/* Placeholder for image */}
          </div>
          <div className="flex gap-2 items-center">
            <p>{item?.username}</p> {/* Placeholder for user name */}
          </div>
          <div className="flex gap-2 items-center">
            <p>{item?.partnerName}</p> {/* Placeholder for partner name */}
          </div>
          <div className="flex gap-2 items-center">
            <p>{item?.contactNumber1}</p> {/* Placeholder for contact number */}
          </div>
          <div className="flex gap-2 items-center">
            <p>{item?.type}</p> {/* Placeholder for business type */}
          </div>
          <div>
          <div className="grid grid-cols-3 py-5 place-items-left mr-6">
        <button onClick={toggleMerchantModal}>
          <PreviewIcon />
        </button>
        <button onClick={() => confirmDelete(id)}>
            <AddTaskIcon className="w-5 h-5" />
          </button>
          <button onClick={() => confirmDelete(id)}>
            <HighlightOffIcon className="w-5 h-5" />
          </button>
      </div>
          </div>
        </div>
      ))}
      <MerchantsEdit 
       isOpen={isModalOpen} 
       setIsOpen={setIsModalOpen} 
       toggleMerchantModal={toggleMerchantModal} />
    </div>
  );
}

export default VendorsItem;
