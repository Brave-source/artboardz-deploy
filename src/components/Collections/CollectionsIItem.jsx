import React, { useEffect, useState } from "react";
import EditForm from './EditForm'
import { useDispatch } from "react-redux";
import { TrashIcon } from "@heroicons/react/24/outline";
import EditIcon from "../../Assets/Icons/EditIcon";
import { UIActions } from "../../store/redux-store/UI-slice";
import EditCollectionForm from "./EditCollectionForm";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import Notiflix from "notiflix";
import axios from "axios";
import { deleteCollectionFailure, deleteCollectionStart, deleteCollectionSuccess } from "../../store/redux-store/CollectionSlice";
import { baseURL } from "../../utils/url";
import { toast } from "react-toastify";

const CollectionItem = ({
  Policy,
  artistName,
  artboardTitle,
  bannerUrl,
  physicalUrl,
  artistUrl,
  digitalUrl,
  supplyTime,
  location,
  country,
  city,
 id
}) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [bannerImg, setBannerImg] = useState(null);
  const [artistImg, setArtistImg] = useState(null);
  const [physicalImg, setPhysicalImg] = useState(null);
  const [digitalImg, setDigitalImg] = useState(null);
  const externalURL = "https://www.admin.artboardz.net";
  const globalURL = window.location.hostname.substring(0,3).toLocaleLowerCase()

  useEffect(() => {
    console.log(artistImg)
    artistImg && deleteImageFromS3(artistImg);
  },[artistImg])
  
  useEffect(() => {
    physicalImg && deleteImageFromS3(physicalImg);
  },[physicalImg])

  useEffect(() => {
    digitalImg && deleteImageFromS3(digitalImg);
  },[digitalImg])

  useEffect(() => {
    bannerImg && deleteImageFromS3(bannerImg);
  },[bannerImg])

  const confirmDelete = (id) => {
    Notiflix.Confirm.show(
      "Delete Collection!!!",
      "You are about to delete this collection",
      "Delete",
      "Cancel",
      function okCb() {
        deleteCollection(id);
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
  console.log("function called")
  console.log(img.split("/")[3])
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

const deleteCollection = async(id) => {
  dispatch(deleteCollectionStart())
  try {
    // await axios.delete(`http://localhost:3000/api/collections/${id}`)
    await axios.delete(globalURL == "www" ? `${externalURL}/api/collections/${id}` :`${baseURL}/api/collections/${id}`);
    dispatch(deleteCollectionSuccess(id))
    deleteImageFromS3(artistUrl)
    deleteImageFromS3(bannerUrl)
    deleteImageFromS3(physicalUrl)
    deleteImageFromS3(digitalUrl)
    toast.success("Successfully deleted!")
    }catch(err){
      dispatch(deleteCollectionFailure())
      // toast.error("Something went wrong")
    }
  }

  const showEditCollectionFormHandler = () => {
    setIsOpen(true)
  };
  return (
    <>
    <li className="grid grid-cols-6 py-5 place-items-center text-sm font-semibold tracking-wide break-word border-b border-[#AECEFF] last-of-type:border-none text-[#323A46]">
      <div>
        <p className="break-all">{Policy?.slice(0,4)}***{Policy.slice(Policy.length -4)}</p>
      </div>
      <div>
        <p>{artistName}</p>
      </div>
      <div>
        <p>{artboardTitle}</p>
      </div>
      <div>
        <p>{city}, {country}</p>
      </div>
      <div>
        <p>{supplyTime}</p>
      </div>
        <div className="grid grid-cols-2 py-5 place-items-left">
        <button onClick={showEditCollectionFormHandler}>
          <EditIcon />
        </button>
        <button onClick={() => confirmDelete(id)}>
            <TrashIcon className="w-5 h-5" />
          </button>
      </div>
    </li>
    {isOpen && <EditCollectionForm 
      setIsOpen={setIsOpen} 
      id={id} 
    />}
    </>
  );
};

export default CollectionItem;