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
import { AddCollectionFormIsShown, UIActions } from "../../store/redux-store/UI-slice";
import { updateCollectionFailure, updateCollectionStart, updateCollectionSuccess } from "../../store/redux-store/CollectionSlice";

const GeneralDescForm = ({ id, setIsOpen, collection }) => {
 
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
  const externalURL = "https://www.admin.artboardz.net"
  const globalURL = window.location.hostname.substring(0,3).toLocaleLowerCase()

  const { isFetching } = useSelector((collection) => collection.collection);
  const [policy, setPolicy] = useState(collection.policy);
  const [price, setPrice] = useState(collection.price);
  const [supply, setSupply] = useState(collection.supply)
  const [mintDate, setMintDate] = useState(collection.mintDate)
  const [aboutMe, setAboutMe] = useState(collection.aboutMe)
  const [country, setCountry] = useState(collection.country)
  const [city, setCity] = useState(collection.city)
  const [twitter, setTwitter] = useState(collection.twitter)
  const [title, setTitle] = useState(collection.title)
  const [name, setName] = useState(collection.name)
  const [artDesc, setArtDesc] = useState(collection.artDesc)
  const [instagram, setInstagram] = useState(collection.instagram)
  const [discord, setDiscord] = useState(collection.discord)
  const [newRelease, setNewRelease] = useState(collection.newRelease)
  const [jpgLink, setJpgLink] = useState(collection.jpgLink)
  const [nmkrLink, setNmkrLink] = useState(collection.nmkrLink)
  const [mintingDetails, setMintingDetails] = useState(collection.mintingDetails)
  const [royalty, setRoyalty] = useState(collection.royalty)
  
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
    physicalArtUrl: inputs.physicalArtUrl ? inputs.physicalArtUrl : collection.physicalArtUrl,
    digitalArtUrl: inputs.digitalArtUrl ? inputs.digitalArtUrl : collection.digitalArtUrl,
    aboutMe,
    mintDate,
    mintingDetails,
    country,
    city,
    discord,
    twitter,
    instagram,
    name,
    newRelease,
    jpgLink,
    nmkrLink,
    policy,
    price,
    royalty,
    supply,
    title,
    artDesc,
    _id: id
  }
  const formSubmitHandler = async (evt) => {
    evt.preventDefault();
    // setErrors(validation(updateInput));
    dispatch(updateCollectionStart());
    
    try {
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
        onChange={(e) => setPolicy(e.target.value)}
        value={policy}
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
        onChange={(e) => setTitle(e.target.value)}
        value={title}
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
        onChange={(e)=> setName(e.target.value)}
        value={name}
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
        onChange={(e)=> setMintDate(e.target.value)}
        value={mintDate}
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
        onChange={(e)=> setPrice(e.target.value)}
        value={price}
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
        onChange={(e)=> setSupply(e.target.value)}
        value={supply}
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
        onChange={(e)=> setRoyalty(e.target.value)}
        value={royalty}
        className="focus:bg-transparent bg-[#272832] focus:outline-white focus:outline rounded-md h-11 text-base px-3"
      />
    </div>
    <div className="flex flex-col">
      <label htmlFor="New Release" className="text-[#B3B5BD] text-base">
        New Release
      </label>
      {collection.newRelease > 0 ? (
        <select
        name="newRelease"
        id="New Release"
        onChange={(e)=> setNewRelease(e.target.value)}
        placeholder={newRelease}
        className="focus:bg-transparent bg-[#272832] focus:outline-white focus:outline rounded-md h-11 text-base px-3"
      >
        <option value="1">Yes</option>
        <option value="0">No</option>
        </select>
      ): (
        <select
        name="newRelease"
        id="New Release"
        onChange={(e)=> setNewRelease(e.target.value)}
        placeholder={newRelease}
        className="focus:bg-transparent bg-[#272832] focus:outline-white focus:outline rounded-md h-11 text-base px-3"
      >
        <option value="0">No</option>
        <option value="1">Yes</option>
        </select>
      )}
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
        onChange={(e)=> setCountry(e.target.value)}
        value={country}
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
        onChange={(e)=> setCity(e.target.value)}
        value={city}
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
        onChange={(e)=> setNmkrLink(e.target.value)}
        value={nmkrLink}
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
        onChange={(e)=> setJpgLink(e.target.value)}
        value={jpgLink}
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
        onChange={(e)=> setArtDesc(e.target.value)}
        value={artDesc}
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
        onChange={(e)=> setAboutMe(e.target.value)}
        value={aboutMe}
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
        onChange={(e)=> setMintingDetails(e.target.value)}
        value={mintingDetails}
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
          onChange={(e)=> setTwitter(e.target.value)}
          value={twitter}
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
          onChange={(e)=> setDiscord(e.target.value)}
          value={discord}
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
          onChange={(e)=> setInstagram(e.target.value)}
          value={instagram}
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