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
import validation from "./FormValidation";
import CameraIcon from "../../Assets/Icons/CameraIcon";
import { baseURL } from "../../utils/url";
import { UIActions } from "../../store/redux-store/UI-slice";
import { updateCollectionFailure, updateCollectionStart, updateCollectionSuccess } from "../../store/redux-store/CollectionSlice";

const GeneralDescForm = ({ id, setIsOpen }) => {
 
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const [Banner, setBanner] = useState(null);
  const [Artist, setArtist] = useState(null);
  const [digitalArtboard, setdigitalArtboard] = useState(null);
  const [physicalArtboard, setphysicalArtboard] = useState(null);

  // image preview
  const [BannerUrl, setBannerUrl] = useState(null);
  const [ArtistUrl, setArtistUrl] = useState(null);
  const [digitalArtboardUrl, setdigitalArtboardUrl] = useState(null);
  const [physicalArtboardUrl, setphysicalArtboardUrl] = useState(null);

  const dispatch = useDispatch();

  const collection = useSelector((collection) => collection.collection.collections.filter((item) => item._id === id)[0]);
  const { isFetching } = useSelector((collection) => collection.collection);
  
  const hideFormHandler = (evt) => {
    evt.preventDefault();
    setIsOpen((prev) => !prev)
  };
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
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
  const updateInput  = {
    bannerUrl: inputs.bannerUrl ? inputs.bannerUrl : collection.bannerUrl,
    artistUrl: inputs.artistUrl ? inputs.artistUrl : collection.artistUrl,
    aboutMe: inputs.aboutMe ? inputs.aboutMe : collection.aboutMe,
    mintDate: inputs.mintDate ? inputs.mintDate : collection.mintDate,
    mintingDetails: inputs.mintingDetails ? inputs.mintingDetails : collection.mintingDetails,
    country: inputs.country ? inputs.country : collection.country,
    city: inputs.city ? inputs.city : collection.city,
    physicalArtUrl: inputs.physicalArtUrl ? inputs.physicalArtUrl : collection.physicalArtUrl,
    digitalArtUrl: inputs.digitalArtUrl ? inputs.digitalArtUrl : collection.digitalArtUrl,
    discord: inputs.discord ? inputs.discord : collection.discord,
    twitter: inputs.twitter ? inputs.twitter : collection.twitter,
    instagram: inputs.instagram ? inputs.instagram : collection.instagram,
    name: inputs.name ? inputs.name : collection.name,
    newRelease: inputs.newRelease? inputs.newRelease : collection.newRelease,
    jpgLink: inputs.jpgLink? inputs.jpgLink : collection.jpgLink,
    nmkrLink: inputs.nmkrLink ? inputs.nmkrLink : collection.nmkrLink,
    policy: inputs.policy ? inputs.policy : collection.policy,
    price: inputs.price ? inputs.price : collection.price,
    royalty: inputs.royalty ? inputs.royalty : collection.royalty,
    supply: inputs.supply ? inputs.supply : collection.supply,
    title: inputs.title ? inputs.title : collection.title,
    _id: id
  }
  const formSubmitHandler = async (evt) => {
    evt.preventDefault();
    // setErrors(validation(updateInput));
    dispatch(updateCollectionStart());
    
    try {
      const res = await axios.put(`${baseURL}/api/collections/${id}`,updateInput);
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
    <form className="grid grid-cols-3 gap-4" onSubmit={formSubmitHandler}>
    <div className="flex flex-col">
      <label htmlFor="policy" className="text-[#B3B5BD] text-base">
        Policy
      </label>
      <input
        type="text"
        name="policy"
        id="policy"
        disabled
        onChange={handleChange}
        placeholder={collection.policy}
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
        placeholder={collection.title}
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
        placeholder={collection.name}
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
        placeholder={collection.mintDate}
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
        placeholder={collection.price}
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
        placeholder={collection.supply}
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
        placeholder={collection.royalty}
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
        placeholder={collection.newRelease}
        className="focus:bg-transparent bg-[#272832] focus:outline-white focus:outline rounded-md h-11 text-base px-3"
      >
        <option value="1">Yes</option>
        <option value="0">No</option>
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
        placeholder={collection.country}
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
        placeholder={collection.city}
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
        placeholder={collection.nmkrLink}
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
        placeholder={collection.jpgLink}
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
        placeholder={collection.artDesc}
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
        placeholder={collection.aboutMe}
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
        placeholder={collection.mintingDetails}
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
          placeholder={collection.twitter}
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
          placeholder={collection.discord}
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
          placeholder={collection.instagram}
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
                  <div style={{width: '100%', height: '100%', position: 'relative'}}>
        <Image
          alt='Banner'
          src={collection.bannerUrl}
          fill
          objectFit='contain'
        />
        </div>
        }
      </label>
      <input
        type="file"
        name="ArtImage"
        id="Artboard image"
        onChange={(e) => setBanner(e.target.files[0])}
        accept="image/png, image/jpeg image/jpg"
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
          <div style={{width: '100%', height: '100%', position: 'relative'}}>
          <Image
            alt='Banner'
            src={collection.artistUrl}
            fill
            objectFit='contain'
          />
          </div>
        }
      </label>
      <input
        type="file"
        name="Artboard location image"
        id="Artboard location image"
        onChange={(e) => setArtist(e.target.files[0])}
        accept="image/png, image/jpeg"
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
          <div style={{width: '100%', height: '100%', position: 'relative'}}>
          <Image
            alt='Banner'
            src={collection.digitalArtUrl}
            fill
            objectFit='contain'
          />
          </div>
        }
      </label>
      <input
        type="file"
        name="personal/working image"
        id="personal/working image"
        onChange={(e) => setdigitalArtboard(e.target.files[0])}
        accept="image/png, image/jpeg"
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
          <div style={{width: '100%', height: '100%', position: 'relative'}}>
          <Image
            alt='Banner'
            src={collection.physicalArtUrl}
            fill
            objectFit='contain'
          />
          </div>
        }
      </label>
      <input
        type="file"
        name="Physical Artboard"
        id="Physical Artboard"
        onChange={(e) => setphysicalArtboard(e.target.files[0])}
        accept="image/png, image/jpeg"
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