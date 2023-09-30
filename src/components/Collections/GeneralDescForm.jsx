import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from 'axios';
import CameraIcon from "../../Assets/Icons/CameraIcon";
import { UIActions } from "../../store/redux-store/UI-slice";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { addCollectionFailure, addCollectionStart, addCollectionSuccess } from "../../store/redux-store/CollectionSlice";
import Image from "next/image";
import {v4 as uuid} from "uuid";

const GeneralDescForm = () => {
  const [entries, setEntries] = useState([]);

  const handleInputChange = (index, field, value) => {
    const newEntries = [...entries];
    if(field == 'lat' || field == 'lng') {
      newEntries[index].position = {
        ...newEntries[index].position,
        [field]: value,
      };
    } else {
      newEntries[index][field] = value;
    }
    setEntries(newEntries);
  };

  const handleAddEntry = (e) => {
    e.stopPropagation()
    const newEntry = {
      position: {
        lat: "",
        lng: "" 
      },
      title: '',
    };
    setEntries([...entries, newEntry]);
  };

  const [inputs, setInputs] = useState({});
  const [Banner, setBanner] = useState(null);
  const [Artist, setArtist] = useState(null);
  const [errors, setErrors] = useState({});
  const [digitalArtboard, setdigitalArtboard] = useState(null);
  const [physicalArtboard, setphysicalArtboard] = useState(null);
  const dispatch = useDispatch();

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

   const uploadFile = async (file, urlType) => {
    const cred = {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY,
    }
      const client = new S3Client({ region: "us-east-1", credentials: cred});
      const key = `${uuid()}.${file.name}`;
      const command = new PutObjectCommand({
        Bucket: "artboardz",
        Key: key,
        Body: file,
      });
      try {
        const signedUrl = await getSignedUrl(client, command, { expiresIn: 3600 });
        console.log(`Successfully uploaded file. URL: ${signedUrl}`);
        await fetch(signedUrl, {
          method: "PUT",
          headers: {
            "Content-Type" : "image/jpg"
          },
          body: file
        })
        .then((data) => {
          if(urlType == "img") {
            const newEntries = [...entries];
            newEntries[entries.length-1][urlType] = `https://artboardz.s3.us-east-1.amazonaws.com/${key}`;
            setEntries(newEntries)
           } else {
             setInputs((prev) => {
               return { ...prev, [urlType]: `https://artboardz.s3.us-east-1.amazonaws.com/${key}` };
             });
           }
          toast.success("Image successfully upload")
        })
        .catch((err) => toast.error("Image upload failed! try again"));
      } catch (err) {
        console.error("Error uploading file: ", err);
        toast.error("Image upload failed! try again")
      }
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

  const hideFormHandler = (evt) => {
    evt.preventDefault();
    dispatch(UIActions.hideAddCollectionForm());
    dispatch(UIActions.hideEditCollectionForm());
  };

  const data = {
    ...inputs,
    vendors: entries,
  }

  const formSubmitHandler = async(evt) => {
    evt.preventDefault();
    // setErrors(validation(inputs))
    dispatch(addCollectionStart())
    try {
      // const res = await axios.post(`http://localhost:3000/api/collections`, data)
      const res = await axios.post(globalURL == "www" ? `${externalURL}/api/collections` :`${baseURL}/api/collections`, data)
      dispatch(UIActions.hideAddCollectionForm())
      dispatch(addCollectionSuccess(res.data));
      toast.success("Successfully added")
    }catch(err) {
      console.log(err)
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
      <div className="flex flex-col">
        <label htmlFor="country" className="text-[#B3B5BD] text-base">
          Artist Wallet
        </label>
        <input
          type="text"
          name="wallet"
          id="Wallet"
          onChange={handleChange}
          className="focus:bg-transparent bg-[#272832] focus:outline-white focus:outline rounded-md h-11 text-base px-3"
        />
      </div>
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
          Marketplace Link
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

      <div className="grid grid-cols-4 gap-3 col-span-full">
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
<div className="flex flex-col">
  <label htmlFor="Website" className="text-[#B3B5BD] text-base">
    Website
  </label>
  <input
    type="url"
    name="WebLink"
    id="Website"
    onChange={handleChange}
    className="focus:bg-transparent bg-[#272832] focus:outline-white focus:outline rounded-md h-11 text-base px-3"
  />
  {errors.Website && <p className="text-red-400">{errors.Website}</p>}
</div>
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
            <Image src={physicalArtboardUrl} fill objectFit='contain'/>
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
      <div className="col-span-2">
      <div className="container mx-auto p-4">
      <div className="grid grid-cols-2 gap-4">
        { entries && entries?.map((entry, index) => (
          <div key={index} className="border rounded p-4">
            <h3 className="text-xl mb-2">Entry {index + 1}</h3>
            <div className="mb-4">
              <input
                type="text"
                placeholder="latitude"
                className="focus:bg-transparent bg-[#272832] border border-gray-300 rounded px-2 py-1 w-full"
                value={entry.position.lat}
                onChange={(e) => handleInputChange(index, 'lat', e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="longitude"
                className="focus:bg-transparent bg-[#272832] border border-gray-300 rounded px-2 py-1 w-full"
                value={entry.position.lng}
                onChange={(e) => handleInputChange(index, 'lng', e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Title"
                className="focus:bg-transparent bg-[#272832] border border-gray-300 rounded px-2 py-1 w-full"
                value={entry.title}
                onChange={(e) => handleInputChange(index, 'title', e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
          onClick={(e)=> {
            e.stopPropagation()
            e.nativeEvent.preventDefault()
            handleAddEntry(e)
          }}
        >
          Add Location
        </button>
      
      </div>
    </div>
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
