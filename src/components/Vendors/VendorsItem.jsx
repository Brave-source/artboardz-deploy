import React from 'react';
import DefoultImage from '../../Assets/Icons/defaultProfile.png'
import Image from 'next/image';
import EditIcon from '../../Assets/Icons/EditIcon';
import { TrashIcon } from "@heroicons/react/24/outline";
import MerchantsEdit from './MerchantsEdit';
import { useState } from 'react';

const VendorsItem = () => {
  // Placeholder array with 3 objects to create 3 rows
  const placeholderData = [
    { userName: 'User Name 1', partnerName: 'Partner Name 1', contactNumber: '123-456-7890', businessType: 'Type 1' },
    { userName: 'User Name 2', partnerName: 'Partner Name 2', contactNumber: '123-456-7891', businessType: 'Type 2' },
    { userName: 'User Name 3', partnerName: 'Partner Name 3', contactNumber: '123-456-7892', businessType: 'Type 3' },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleMerchantModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      {placeholderData.map((item, index) => (
        <div className="grid grid-cols-6 space-y-2 place-items-center text-black" key={index}>
          <div className="flex gap-2 items-center ml-6">
            <Image src={DefoultImage} alt="Placeholder" className="h-8 w-8"/> {/* Placeholder for image */}
          </div>
          <div className="flex gap-2 items-center">
            <p>{item.userName}</p> {/* Placeholder for user name */}
          </div>
          <div className="flex gap-2 items-center">
            <p>{item.partnerName}</p> {/* Placeholder for partner name */}
          </div>
          <div className="flex gap-2 items-center">
            <p>{item.contactNumber}</p> {/* Placeholder for contact number */}
          </div>
          <div className="flex gap-2 items-center">
            <p>{item.businessType}</p> {/* Placeholder for business type */}
          </div>
          <div>
          <div className="grid grid-cols-2 py-5 place-items-left mr-6">
        <button onClick={toggleMerchantModal}>
          <EditIcon />
        </button>
        <button onClick={() => confirmDelete(id)}>
            <TrashIcon className="w-5 h-5" />
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
