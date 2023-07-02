import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import Image from "next/image";
import app from "../../firebase";
import { toast } from "react-toastify";
import axios from 'axios';
import CameraIcon from "../../Assets/Icons/CameraIcon";
import { baseURL } from "../../utils/url";
import { updateCollectionFailure, updateCollectionStart, updateCollectionSuccess } from "../../store/redux-store/CollectionSlice";

const GeneralDescForm = () => {
 
  const [inputs, setInputs] = useState({});
  const [vendorsImage, setvendorsImage] = useState(null);
  const [vendorsImageUrl, setvendorsImageUrl] = useState(null)
  // const [lat, setLat] =  useState(vendor.position.lat);
  // const [lng, setLng] = useState(vendor.position.lng);
  // const [title, setTitle] = useState(vendor.title);
  // const [desc, setDesc] = useState(vendor.desc);
  // const [img, setImg] = useState(vendor.img);

  const dispatch = useDispatch();
  const externalURL = "https://www.admin.artboardz.net"
  const globalURL = window.location.hostname.substring(0,3).toLocaleLowerCase()

  const { isFetching } = useSelector((collection) => collection.collection);
  const vendors = useSelector((vendor) => vendor.collection.vendor);
  const vendor = vendors.vendor;

    const handleVendor = (e) => {
        console.log(e.target.value)
    }
  
  const hideFormHandler = (evt) => {
    evt.preventDefault();
    setVendor((prev) => !prev)
  }

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
             console.log("Upload is running" + progress);
            break;
          default:
            break;
        }
      },
      (error) => {
        toast.error("Try again!")
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
         if(urlType == 'img') {

         } else {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
         }
          toast.success("Successfully upload photo!")
        });
      }
    );
  };

  useEffect(() => {
    if (vendorsImage) {
      setvendorsImageUrl(URL.createObjectURL(vendorsImage));
    }
  
  }, [vendorsImage]);

  useEffect(() => {
    vendorsImage && uploadFile(vendorsImage, "img");
  }, [vendorsImage]);

//   const updateInput  = {
//     bannerUrl: inputs.bannerUrl ? inputs.bannerUrl : collection.bannerUrl,
//     artistUrl: inputs.artistUrl ? inputs.artistUrl : collection.artistUrl,
//     physicalArtUrl: inputs.physicalArtUrl ? inputs.physicalArtUrl : collection.physicalArtUrl,
//     digitalArtUrl: inputs.digitalArtUrl ? inputs.digitalArtUrl : collection.digitalArtUrl,
//     aboutMe,
//     mintDate,
//     mintingDetails,
//     country,
//     city,
//     discord,
//     twitter,
//     instagram,
//     name,
//     newRelease,
//     jpgLink,
//     nmkrLink,
//     policy,
//     price,
//     royalty,
//     supply,
//     title,
//     artDesc,
//     webLink,
//     _id: id,
//     vendors,
//   }
  const formSubmitHandler = async (evt) => {
    evt.preventDefault();
    // setErrors(validation(updateInput));
    dispatch(updateCollectionStart());
    
    try {
      // const res = await axios.put(`http://localhost:3000/api/collections/${id}`, updateInput)
      const res = await axios.put(globalURL == "www" ? `${externalURL}/api/collections/${id}` :`${baseURL}/api/collections/${id}`,updateInput);
      dispatch(updateCollectionSuccess({id, updateInput}));
      setIsOpen((prev) => !prev)
      toast.success("Successfully edited")
    }catch(err) {
      console.log(err);
      dispatch(updateCollectionFailure())
      toast.error("something went wrong")
    }
  };

  return (
    <form className="grid grid-cols-1 gap-4 bg-[#272832]" onSubmit={formSubmitHandler}>
    
            <div className="flex flex-col">
              <input
                type="text"
                className="focus:bg-transparent bg-[#272832] focus:outline-white focus:outline rounded-md h-11 text-base px-3"
                value={vendor.position.lat}
                // onChange={(e) => setLat(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                className="focus:bg-transparent bg-[#272832] focus:outline-white focus:outline rounded-md h-11 text-base px-3"
                value={vendor.position.lng}
                // onChange={(e) => setLng(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                className="focus:bg-transparent bg-[#272832] focus:outline-white focus:outline rounded-md h-11 text-base px-3"
                value={vendor.title}
                // onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <textarea
                className="focus:bg-transparent bg-[#272832] focus:outline-white focus:outline rounded-md h-11 text-base px-3"
                value={vendor.desc}
                // onChange={(e) => setDesc(e.target.value)}
              ></textarea>
            </div>
            {/* <div className="flex flex-col  ">
              <span className="text-[#B3B5BD] text-base">
              Image
              </span>
              <label
                htmlFor="vendorsImage"
                className="focus:bg-transparent bg-[#272832] focus:outline-white focus:outline rounded-md h-[150px] text-base px-3 flex items-center justify-center"
              >
                {vendorsImage && vendorsImageUrl ?
                <div style={{width: '100%', height: '100%', position: 'relative'}}>
                  <Image src={img? img : vendorsImageUrl} fill objectFit='contain'/>
                  </div>
                  :
                  <CameraIcon />
                }
              </label>
              <input 
                type="file"
                name="vendorsImag"
                id="vendorsImage"
                onChange={(e) => setImg(e.target.files[0])}
                accept="image/*"
                hidden
              />
            </div> */}
    <div className="grid grid-cols-2 gap-3 col-span-full">
    <footer className=" flex justify-center gap-6  col-span-2">
      <button
        onClick={hideFormHandler}
        className="px-[20px] py-[10px] border border-white rounded-md text-sm"
      >
        Cancel
      </button>
      {isFetching ? (
        <button className="px-[20px] py-[10px] bg-blue-400 rounded-md text-sm cursor-not-allowed">
          Updating...
        </button>):(
          <button className="px-[20px] py-[10px] bg-[#4C66F0] rounded-md text-sm">
          Update
        </button>
      )}
    </footer>
    </div>
  </form>
  );
};

export default GeneralDescForm;
