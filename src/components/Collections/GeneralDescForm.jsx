import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from 'axios';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import CameraIcon from "../../Assets/Icons/CameraIcon";
import validation from "./FormValidation";
import { UIActions } from "../../store/redux-store/UI-slice";
import CircularProgress from '@mui/material/CircularProgress';
import { addCollectionFailure, addCollectionStart, addCollectionSuccess } from "../../store/redux-store/CollectionSlice";
import Image from "next/image";
import { baseURL } from "../../utils/url";

const GeneralDescForm = () => {
  const [inputs, setInputs] = useState({});
  const [Banner, setBanner] = useState(null);
  const [Artist, setArtist] = useState(null);
  const [errors, setErrors] = useState({});
  const [digitalArtboard, setdigitalArtboard] = useState(null);
  const [physicalArtboard, setphysicalArtboard] = useState(null);
  const dispatch = useDispatch();
  const externalURL = "https://www.admin.artboardz.net"
  const globalURL = window.location.hostname.substring(0,3).toLocaleLowerCase()

  // image preview
  const [BannerUrl, setBannerUrl] = useState(null);
  const [ArtistUrl, setArtistUrl] = useState(null);
  const [digitalArtboardUrl, setdigitalArtboardUrl] = useState(null);
  const [physicalArtboardUrl, setphysicalArtboardUrl] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const { isFetching } = useSelector((collection) => collection.collection);

  const uploadFile= (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
         
        // urlType === "artImg" ? setImgPerc(Math.round(progress)) : setPersonalImagePer(Math.round(progress));
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
        toast.error("Error! Try again")
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
          toast.success("Successfully upload photo!")
        });
      }
    );
  };

  useEffect(() => {
    if (Banner) {
      setBannerUrl(URL.createObjectURL(Banner));
    }
    if (Artist) {
      setArtistUrl(URL.createObjectURL(Artist));
    }
    if (digitalArtboard) {
      setdigitalArtboardUrl(URL.createObjectURL(digitalArtboard));
    }
    if (physicalArtboard) {
      setphysicalArtboardUrl(URL.createObjectURL(physicalArtboard));
    }
    console.log("BannerUrl: ", BannerUrl)
    console.log("ArtistUrl", ArtistUrl)
    console.log("digitalArtboardUrl: ", digitalArtboardUrl)
    console.log("physicalArtboardUrl: ", physicalArtboardUrl)
  }, [Banner, Artist, digitalArtboard, physicalArtboard]);

  useEffect(() => {
    Banner && uploadFile(Banner , "bannerUrl");
  }, [Banner]);

  useEffect(() => {
    Artist && uploadFile(Artist, "artistUrl");
  }, [Artist]);

  useEffect(() => {
    digitalArtboard && uploadFile(digitalArtboard, "digitalArtUrl");
  }, [digitalArtboard]);

  useEffect(() => {
    physicalArtboard && uploadFile(physicalArtboard, "physicalArtUrl");
  }, [physicalArtboard]);

  const hideFormHandler = (evt) => {
    evt.preventDefault();
    dispatch(UIActions.hideAddCollectionForm());
    dispatch(UIActions.hideEditCollectionForm());
  };

  const formSubmitHandler = async(evt) => {
    evt.preventDefault();
    // setErrors(validation(inputs))
    dispatch(addCollectionStart())
    try {
      const res = await axios.post(globalURL == "www" ? `${externalURL}/api/collections` :`${baseURL}/api/collections`, inputs)
      dispatch(UIActions.hideAddCollectionForm())
      dispatch(addCollectionSuccess(res.data));
      toast.success("Successfully added")
    }catch(err) {
      dispatch(addCollectionFailure())
      toast.error("Error! something went wrong")
    }
  };

  return (
    <form className="grid grid-cols-3 gap-4" onSubmit={formSubmitHandler}>
      <div className="flex flex-col">
        <label htmlFor="policy" className="text-[#B3B5BD] text-base">
          Policy
        </label>
        <input
          type="text"
          name="policy"
          id="policy"
          onChange={handleChange}
          className="focus:bg-transparent bg-[#272832] focus:outline-white focus:outline rounded-md h-11 text-base px-3"
        />
      </div>
     
      <div className="flex flex-col">
        <label htmlFor="Artboard Title" className="text-[#B3B5BD] text-base">
          Artboard Title
        </label>
        <input
          type="text"
          name="title"
          id="Artboard Title"
          onChange={handleChange}
          className="focus:bg-transparent bg-[#272832] focus:outline-white focus:outline rounded-md h-11 text-base px-3"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="Artist name" className="text-[#B3B5BD] text-base">
          Artist Name
        </label>
        <input
          type="text"
          name="name"
          id="Artist name"
          onChange={handleChange}
          className="focus:bg-transparent bg-[#272832] focus:outline-white focus:outline rounded-md h-11 text-base px-3"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="Mint Date" className="text-[#B3B5BD] text-base">
          Mint Date
        </label>
        <input
          type="text"
          name="mintDate"
          id="Artist name"
          onChange={handleChange}
          className="focus:bg-transparent bg-[#272832] focus:outline-white focus:outline rounded-md h-11 text-base px-3"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="Mint Price" className="text-[#B3B5BD] text-base">
          Mint Price
        </label>
        <input
          type="text"
          name="price"
          id="Artist name"
          onChange={handleChange}
          className="focus:bg-transparent bg-[#272832] focus:outline-white focus:outline rounded-md h-11 text-base px-3"
        />
      </div>
      
      <div className="flex flex-col">
        <label htmlFor="Supply" className="text-[#B3B5BD] text-base">
          Supply
        </label>
        <input
          type="text"
          name="supply"
          id="Supply"
          onChange={handleChange}
          className="focus:bg-transparent bg-[#272832] focus:outline-white focus:outline rounded-md h-11 text-base px-3"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="royalty" className="text-[#B3B5BD] text-base">
          Royalty
        </label>
        <input
          type="text"
          name="royalty"
          id="Royalty"
          onChange={handleChange}
          className="focus:bg-transparent bg-[#272832] focus:outline-white focus:outline rounded-md h-11 text-base px-3"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="New Release" className="text-[#B3B5BD] text-base">
          New Release
        </label>
        <select
          name="newRelease"
          id="New Release"
          onChange={handleChange}
          className="focus:bg-transparent bg-[#272832] focus:outline-white focus:outline rounded-md h-11 text-base px-3"
        >
          <option value="0">No</option>
          <option value="1">Yes</option>
          </select>
      </div>
      <div></div>
      <div className="flex flex-col">
        <label htmlFor="country" className="text-[#B3B5BD] text-base">
          Country
        </label>
        <input
          type="text"
          name="country"
          id="Royalty"
          onChange={handleChange}
          className="focus:bg-transparent bg-[#272832] focus:outline-white focus:outline rounded-md h-11 text-base px-3"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="city" className="text-[#B3B5BD] text-base">
          City
        </label>
        <input
          type="text"
          name="city"
          id="City"
          onChange={handleChange}
          className="focus:bg-transparent bg-[#272832] focus:outline-white focus:outline rounded-md h-11 text-base px-3"
        />
      </div>
      <div></div>
      <div className="flex flex-col">
        <label htmlFor="NMKR" className="text-[#B3B5BD] text-base">
          NMKR mint link
        </label>
        <input
          type="text"
          name="nmkrLink"
          id="NMKR"
          onChange={handleChange}
          className="focus:bg-transparent bg-[#272832] focus:outline-white focus:outline rounded-md h-11 text-base px-3"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="JPG" className="text-[#B3B5BD] text-base">
          JPGstore link
        </label>
        <input
          type="text"
          name="jpgLink"
          id="JPG"
          onChange={handleChange}
          className="focus:bg-transparent bg-[#272832] focus:outline-white focus:outline rounded-md h-11 text-base px-3"
        />
      </div>
      
      <div className="flex flex-col col-span-full">
        <label
          htmlFor="Artboard Description"
          className="text-[#B3B5BD] text-base"
        >
          Artboard Description
        </label>
        <textarea
          rows={5}
          name="artDesc"
          id="Artboard Description"
          onChange={handleChange}
          className="focus:bg-transparent bg-[#272832] focus:outline-white focus:outline rounded-md text-base px-3"
        />
      </div>
      <div className="flex flex-col col-span-full">
        <label htmlFor="about me" className="text-[#B3B5BD] text-base">
          Artist Description
        </label>
        <textarea
          rows={5}
          name="aboutMe"
          id=" about me"
          onChange={handleChange}
          className="focus:bg-transparent bg-[#272832] focus:outline-white focus:outline h-[150px] rounded-md text-base px-3"
        />
      </div>
      <div className="flex flex-col col-span-full">
        <label htmlFor="Minting details" className="text-[#B3B5BD] text-base">
          Other Details
        </label>
        <textarea
          rows={5}
          name="mintingDetails"
          id="Minting details"
          onChange={handleChange}
          className="focus:bg-transparent bg-[#272832] focus:outline-white focus:outline h-[150px] rounded-md  text-base px-3"
        />
      </div>
      
        <div className="flex flex-col">
          <label htmlFor="Twitter" className="text-[#B3B5BD] text-base">
            Twitter
          </label>
          <input
            type="url"
            name="twitter"
            id="Twitter"
            onChange={handleChange}
            className="focus:bg-transparent bg-[#272832] focus:outline-white focus:outline rounded-md h-11 text-base px-3"
          />
          {errors.twitter && <p className="text-red-400">{errors.twitter}</p>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="Discord" className="text-[#B3B5BD] text-base">
            Discord
          </label>
          <input
            type="url"
            name="discord"
            id="Discord"
            onChange={handleChange}
            className="focus:bg-transparent bg-[#272832] focus:outline-white focus:outline rounded-md h-11 text-base px-3"
          />
          {errors.discord && <p className="text-red-400">{errors.discord}</p>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="Instagram" className="text-[#B3B5BD] text-base">
            Instagram
          </label>
          <input
            type="url"
            name="instagram"
            id="Instagram"
            onChange={handleChange}
            className="focus:bg-transparent bg-[#272832] focus:outline-white focus:outline rounded-md h-11 text-base px-3"
          />
          {errors.instagram && <p className="text-red-400">{errors.instagram}</p>}
        </div>
      <div className="grid grid-cols-2 gap-3 col-span-full">
      <div className="flex flex-col ">
        <span className="text-[#B3B5BD] text-base ">
          Banner
        </span>
        <label
          htmlFor="Artboard image"
          className="focus:bg-transparent bg-[#272832] focus:outline-white focus:outline rounded-md h-[150px] text-base px-3 flex items-center justify-center overflow-hidden"
        >
          {Banner && BannerUrl ?
            // <Image src={BannerUrl} width={280} height={140}  />
            <div style={{width: '100%', height: '100%', position: 'relative'}}>
  <Image
    alt='Banner'
    src={BannerUrl}
    fill
    objectFit='contain'
  />
</div>
            :
            <CameraIcon />
          }
        </label>
        <input
          type="file"
          name="ArtImage"
          id="Artboard image"
          onChange={(e) => setBanner(e.target.files[0])}
          accept="image/*"
          hidden
        />
      </div>
      <div className="flex flex-col ">
        <span className="text-[#B3B5BD] text-base">
          Artist
        </span>
        <label
          htmlFor="Artboard location image"
          className="focus:bg-transparent bg-[#272832] focus:outline-white focus:outline rounded-md h-[150px] text-base px-3 flex items-center justify-center"
        >
          {Artist && ArtistUrl ?
          <div style={{width: '100%', height: '100%', position: 'relative'}}>
            <Image src={ArtistUrl} fill
    objectFit='contain' />
            </div>
            :
            <CameraIcon />
          }
        </label>
        <input
          type="file"
          name="Artboard location image"
          id="Artboard location image"
          onChange={(e) => setArtist(e.target.files[0])}
          accept="image/*"
          hidden
        />
      </div>
      <div className="flex flex-col ">
        <span className="text-[#B3B5BD] text-base">
          Digital Artboard
        </span>
        <label
          htmlFor="personal/working image"
          className="focus:bg-transparent bg-[#272832] focus:outline-white focus:outline rounded-md h-[150px] text-base px-3 flex items-center justify-center"
        >
          {digitalArtboard && digitalArtboardUrl ?
          <div style={{width: '100%', height: '100%', position: 'relative'}}>
            <Image src={digitalArtboardUrl} fill
    objectFit='contain' />
            </div>
            :
            <CameraIcon />
          }
        </label>
        <input
          type="file"
          name="personal/working image"
          id="personal/working image"
          onChange={(e) => setdigitalArtboard(e.target.files[0])}
          accept="image/*"
          hidden
        />
      </div>
      <div className="flex flex-col  ">
        <span className="text-[#B3B5BD] text-base">
        Physical Artboard
        </span>
        <label
          htmlFor="Physical Artboard"
          className="focus:bg-transparent bg-[#272832] focus:outline-white focus:outline rounded-md h-[150px] text-base px-3 flex items-center justify-center"
        >
          {physicalArtboard && physicalArtboardUrl ?
          <div style={{width: '100%', height: '100%', position: 'relative'}}>
            <Image src={physicalArtboardUrl} fill
    objectFit='contain'/>
            </div>
            :
            <CameraIcon />
          }
        </label>
        <input
          type="file"
          name="Physical Artboard"
          id="Physical Artboard"
          onChange={(e) => setphysicalArtboard(e.target.files[0])}
          accept="image/*"
          hidden
        />
      </div>
      </div>
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
            Saving...
          </button>):(
            <button className="px-[20px] py-[10px] bg-[#4C66F0] rounded-md text-sm">
            Create
          </button>
        )}
      </footer>
      </div>
    </form>
  );
};

export default GeneralDescForm;
