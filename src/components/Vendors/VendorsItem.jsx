import React from 'react';
import DefoultImage from '../../Assets/Icons/defaultProfile.png'
import Image from 'next/image';
import MerchantsEdit from './MerchantsEdit';
import { useState } from 'react';
import AddTaskIcon from '@mui/icons-material/AddTask';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PreviewIcon from '@mui/icons-material/Preview';
import { useDispatch } from 'react-redux';
import Notiflix from 'notiflix';
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { deleteMerchantFailure, deleteMerchantStart, deleteMerchantSuccess } from '../../store/redux-store/MerchantSlice';
import axios from 'axios';
import { toast } from 'react-toastify';

const VendorsItem = ({merchants}) => {
  const externalURL = "https://www.admin.artboardz.net";
  const globalURL = window.location.hostname.substring(0,3).toLocaleLowerCase();
  // Placeholder array with 3 objects to create 3 rows
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleMerchantModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const confirmDelete = (id, img) => {
    Notiflix.Confirm.show(
      "Delete merchant!!!",
      "You are about to delete this merchant",
      "Delete",
      "Cancel",
      function okCb() {
        deleteMerchant(id, img);
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

  const deleteMerchant = async(id, image) => {
    dispatch(deleteMerchantStart())
    try {
      // await axios.delete(`http://localhost:3000/api/merchants/${id}`);
      await axios.delete(globalURL == "www" ? `${externalURL}/api/merchants/${id}` :`${baseURL}/api/merchants/${id}`);
      deleteImageFromS3(image)
      dispatch(deleteMerchantSuccess(id))
      toast.success("Successfully deleted!")
    }catch(err){
      console.log(err);
      dispatch(deleteMerchantFailure())
      toast.error("Something went wrong")
    }
  }

  return (
    <div>
      {merchants?.map((item, index) => (
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
        <button >
            <AddTaskIcon className="w-5 h-5" />
          </button>
          <button onClick={() => confirmDelete(item?._id, item?.partnerImage)}>
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
