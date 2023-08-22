import React, { useEffect } from 'react'
import { useState } from 'react';
import { FormControl, Modal, Select } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import DefoultImage from '../../Assets/Icons/defaultProfile.png'
import {Switch} from '@material-ui/core';
import {Box} from '@material-ui/core';
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { MenuItem } from '@mui/material';
import Image from 'next/image';


const BootstrapInput = styled(InputBase)(({ theme }) => ({
    "& .MuiInputBase-input": {
      borderRadius: 4,
      position: "relative",
      border: "1px solid #ced4da",
      fontSize: 16,
      padding: "5.4px 26px 10px 12px",
      color: "White",
      height: '20px',
      backgroundColor: "#07245B",
      fontFamily: [
        "Montserrat",
      ].join(","),
      "&:focus": {
        borderRadius: 4,
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  }));

const MerchantsEdit = ({ isOpen, setIsOpen }) => {
    const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [checked, setChecked] = useState(false); // Switch
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({ // Here you have almost all the inputs the switch and radio buttons are separated.
    username: '',
    password:'',
    firstName: '',
    lastName:  '',
    contactNumber1: '',
    userImage: '',
    partnerName: '',
    type: '',
    address: '',
    contact: '',
    desc: '',
    instagram: '',
    youtube: '',
    website: '',
    otherBenefits1: '',
    otherBenefits2: '',
    acceptBookings: false, //checkbox
  });
  const [merchantsForm, setMerchantsForm] = useState(false);

  const uploadFile = (file, imageUrl) => {
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
        toast.error("Upload failed! Try again");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prev) => ({...prev, [imageUrl]: downloadURL}));
          toast.success("Successsfully uploaded");
        });
      }
    );
  };


  const switchHandler = (event) => {
    setChecked(event.target.checked);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;


    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  useEffect(() => {
    file1 && uploadFile(file1, "userImage")
  }, [file1])

  useEffect(() => {
    file2 && uploadFile(file2, "partnerImage")
  }, [file2])
console.log(formData)
  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = {
      ...formData, 
      firstDiscount: selectedOption, 
      secondDiscount: selectedOption2, 
      userId: user._id
    }
    dispatch(addMerchantStart())
    try{
      const res = await axios.post("http://localhost:3000/api/merchants", data);
      dispatch(addMerchantSuccess(res.data))
      toast.success("Successfully created!");
      setShowForm(false);
    }catch(err) {
      console.log(err);
      dispatch(addMerchantFailure())
      toast.error("something went wrong");
    }
   
  };
  
  const [selectedOption, setSelectedOption] = useState(''); //Radio Buttons Artboardz holder
  const [selectedOption2, setSelectedOption2] = useState(''); //Radio Buttons Monet holder
  
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleOptionChange2 = (event) => {
    setSelectedOption2(event.target.value);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  }

  const ImageRendering = (prop) => {
    const UserImage = (
      <Image
        src={prop.image}
        width={100}
        height={100}
        alt=""
        className="rounded-full w-[100px] h-[100px] object-cover"
      />
    );

    return  UserImage ;
  };

  const ImageRendering2 = (prop) => {
    const UserImage = (
      <Image
        // src={prop.image}
        width={300}
        height={300}
        alt=""
        className=" w-[300px] h-[300px] object-cover"
      />
    );

    return UserImage ;
     
  };

  const handleImage1Change = (e) => {
    const selectedFile = e.target.files[0];
    setFile1(selectedFile);
  };

  const handleImage2Change = (e) => {
    const selectedFile = e.target.files[0];
    setFile2(selectedFile);
  };

    const [closeModal, setCloseModal] = useState(false);
  return (
<Modal open={isOpen} onClose={() => setIsOpen(false)} sx={{outline: 'none'}}>
<div style={{  maxHeight: '100vh' }} className=' bg-black overflow-y-auto '>
<form className="text-white mr-4 bg-primary-color font-Montserrat m-8" onSubmit={handleSubmit}>
      <h1 className="text-center text-[24px]" >Become a Merchant</h1>
      <p className="text-[24px]">User</p>
      <div className="w-full h-0 border border-1 border-[#123D90]"></div>

      <div className="mt-4">
        <label
          htmlFor="image"
          className="rounded-full border border-white w-[100px] h-[100px] flex items-center justify-center"
        >
          {file1 ? (
            <img
              src={URL.createObjectURL(file1)}
              className="rounded-full w-[100%] h-[100%] object-cover"
              alt=""
            />
          ) : (
            <ImageRendering image={DefoultImage} />
          )}
        </label>
        <input type="file" name="image" id="image" hidden onChange={handleImage1Change} disabled />
      </div>

      <div className="grid grid-cols-4 gap-x-2 gap-y-2">
        <div className="flex gap-2 flex-col w-full">
          <label htmlFor="name">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            disabled
            placeholder="Username"
            className="bg-[#07245B] border px-3 border-white rounded h-10 focus:outline-blue-500"
          />
        </div>
        <div className="flex gap-2 flex-col w-full">
          <label htmlFor="name">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            disabled
            className="bg-[#07245B] border px-3 border-white rounded h-10 focus:outline-blue-500"
          />
        </div>
        <div className="flex gap-2 flex-col w-full">
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            disabled
            className="bg-[#07245B] border px-3 border-white rounded h-10 focus:outline-blue-500"
          />
        </div>
        <div className="flex gap-2 flex-col w-full">
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            disabled
            className="bg-[#07245B] border px-3 border-white rounded h-10 focus:outline-blue-500"
          />
        </div>
        <div className="flex gap-2 flex-col w-full">
          <label htmlFor="name">Contact Number</label>
          <input
            type="text"
            name="contactNumber1"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Contact Number"
            className="bg-[#07245B] border px-3 border-white rounded h-10 focus:outline-blue-500"
          />
        </div><div>
        </div><div>
        </div><div>
        </div>
      </div>

      <p className="text-[24px] mt-4">Partner Information</p>
      <div className="w-full h-0 border border-1 border-[#123D90]"></div>

      <div className="flex">
        <label className="mt-4" htmlFor="name">
          Pull information from google maps
        </label>
        <Switch
          className="mt-2 ml-2"
          {...{ inputProps: { 'aria-label': 'Switch demo' } }}
          checked={checked}
          onChange={switchHandler}
        />
      </div>

      <div className="mt-4">
        <label
          htmlFor="Thumbnail Image"
          className="border border-white w-[300px] h-[300px] flex items-center justify-center"
        >
          {file2 ? (
            <img
              src={URL.createObjectURL(file2)}
              className=" w-[300px] h-[300px] object-cover"
              alt=""
            />
          ) : (
            <ImageRendering2 image={file2} />
          )}
        </label>
        <input type="file" name="Thumbnail Image" id="Thumbnail Image" hidden onChange={handleImage2Change} />
      </div>

      <div className="grid grid-cols-4 gap-x-2 gap-y-2 mt-4">
        <div className="flex gap-2 flex-col w-full">
          <label htmlFor="name">Partner Name</label>
          <input
            type="text"
            name="partnerName"
            value={formData.partnerName}
            onChange={handleChange}
            placeholder="Partner Name"
            className="bg-[#07245B] border px-3 border-white rounded h-10 focus:outline-blue-500"
          />
        </div>

        <div className="flex gap-2 flex-col w-full">
          <label htmlFor="Type">Business Type</label>
          <Box sx={{ height: 40 }}>
            <FormControl variant="standard" fullWidth>
              <Select
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                name="type"
                value={formData.type}
                onChange={handleChange}
                input={<BootstrapInput />}
                className="bg-[#011335] h-[40px]"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Type">Type</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div className="flex gap-2 flex-col w-full">
          <label htmlFor="Address">Address</label>
          <input
            type="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="bg-[#07245B] border px-3 border-white rounded h-10 focus:outline-blue-500"
          />
         
        </div>
        <div className="flex gap-2 flex-col w-full">
          <label htmlFor="Contact Number2">Contact Number</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Contact Number"
            className="bg-[#07245B] border px-3 border-white rounded h-10 focus:outline-blue-500"
          />
          
        </div>
        <div className="flex gap-2 flex-col w-full">
        <label htmlFor="Longitude">Longitude</label>
        <input
            type="Longitude"
            name="longitude"
            // value={formData.address}
            onChange={handleChange}
            placeholder="Longitude"
            className="bg-[#07245B] border px-3 border-white rounded h-10 focus:outline-blue-500"
          />
          </div>
          <div className="flex gap-2 flex-col w-full">
           <label htmlFor="Latitude">Latitude</label>
           <input
            type="Latitude"
            name="latitude"
            // value={formData.address}
            onChange={handleChange}
            placeholder="Latitude"
            className="bg-[#07245B] border px-3 border-white rounded h-10 focus:outline-blue-500"
          />
          </div>
        <div className="flex gap-2 flex-col w-full col-span-4 h-[120px]">
          <label htmlFor="Description">Description</label>
          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            placeholder="Describe yourself (1000 words max)"
            className="bg-[#07245B] border px-3 border-white rounded h-[80px] focus:outline-blue-500 resize-none"
            style={{ verticalAlign: "top", padding: "8px" }}
          />
        </div>
      </div>
      <div >
        <p>Accept Bookings</p>
        <label className="container">
          <input
            type="checkbox"
            name="acceptBookings"
            checked={formData.acceptBookings}
            onChange={handleChange}
            className="mx-2"
          />
          <span className="checkmark"></span>
          Yes
        </label>
      </div>
      <p className="text-[24px] mt-4">Social Information</p>
      <div className="w-full h-0 border border-1 border-[#123D90]"></div>
      <div className="grid grid-cols-4 gap-x-2 gap-y-2 mt-4">
        <div className="flex gap-2 flex-col w-full">
          <label htmlFor="instagram">Instagram</label>
          <input
            type="text"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
            placeholder="Instagram"
            className="bg-[#07245B] border px-3 border-white rounded h-10 focus:outline-blue-500"
          />
        </div>
        <div className="flex gap-2 flex-col w-full">
          <label htmlFor="youtube">Youtube</label>
          <input
            type="text"
            name="youtube"
            value={formData.youtube}
            onChange={handleChange}
            placeholder="Youtube"
            className="bg-[#07245B] border px-3 border-white rounded h-10 focus:outline-blue-500"
          />
        </div>
        <div className="flex gap-2 flex-col w-full">
          <label htmlFor="Contact Number2">Website</label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="Website"
            className="bg-[#07245B] border px-3 border-white rounded h-10 focus:outline-blue-500"
          />
        </div>
        </div>
        <p className="text-[24px] mt-4">Patron Benefits</p>
<div className="w-full h-0 border border-1 border-[#123D90]"></div>
<p className='mt-4'>Artboardz Holders</p>
<p className='mt-2 text-[10px]'>Discount</p>
<div className='flex gap-4 ml-2 mt-2'>
      <label>
        <input
          type="radio"
          value="0"
          checked={selectedOption === '0'}
          onChange={handleOptionChange}
          className='mr-4'
        />
        0%
      </label>
      <br />
      <label>
        <input
          type="radio"
          value="10"
          checked={selectedOption === '10'}
          onChange={handleOptionChange}
          className='mr-4'
        />
        10%
      </label>
      <br />
      <label>
        <input
          type="radio"
          value="20"
          checked={selectedOption === '20'}
          onChange={handleOptionChange}
          className='mr-4'
        />
        20%
      </label>
      <br />
      <label>
        <input
          type="radio"
          value="30"
          checked={selectedOption === '30'}
          onChange={handleOptionChange}
          className='mr-4'
        />
        30%
      </label>
    </div>
    <p className='my-2 text-[10px]'>Other Benefits</p>
    <div className="flex gap-2 flex-col w-full  h-[120px]">
  {/* <label htmlFor="Other Benefits">Other Benefits</label> */}
  <textarea
    name="otherBenefits1"
    value={formData.otherBenefits1}
    onChange={handleChange}
    placeholder="Benefits provided (1000 words max)"
    className="bg-[#07245B] border px-3 border-white rounded h-[80px] focus:outline-blue-500 resize-none"
    style={{ verticalAlign: "top", padding:"8px"}}
  />
</div>
<p className='mt-4'>Monet Holders</p>
<p className='mt-2 text-[10px]'>Discount</p>
<div className='flex gap-4 ml-2 mt-2'>
      <label>
        <input
          type="radio"
          value="0"
          checked={selectedOption2 === '0'}
          onChange={handleOptionChange2}
          className='mr-4'
        />
        0%
      </label>
      <br />
      <label>
        <input
          type="radio"
          value="10"
          checked={selectedOption2 === '10'}
          onChange={handleOptionChange2}
          className='mr-4'
        />
        10%
      </label>
      <br />
      <label>
        <input
          type="radio"
          value="20"
          checked={selectedOption2 === '20'}
          onChange={handleOptionChange2}
          className='mr-4'
        />
        20%
      </label>
      <br />
      <label>
        <input
          type="radio"
          value="30"
          checked={selectedOption2=== '30'}
          onChange={handleOptionChange2}
          className='mr-4'
        />
        30%
      </label>
    </div>
    <p className='my-2 text-[10px]'>Other Benefits</p>
    <div className="flex gap-2 flex-col w-full  h-[120px]">
  {/* <label htmlFor="Other Benefits">Other Benefits</label> */}
  <textarea
    name="otherBenefits2"
    value={formData.otherBenefits2}
    onChange={handleChange}
    placeholder="Benefits provided (1000 words max)"
    className="bg-[#07245B] border px-3 border-white rounded h-[80px] focus:outline-blue-500 resize-none"
    style={{ verticalAlign: "top", padding:"8px"}}
  />
</div>
     <div className='flex'>
      <button type='submit' onClick={() => setIsOpen(false)} className="sm:mt-0 mt-4 w-[170px] bg-[#123D91] rounded-[5px] p-2 font-semibold mx-auto block tracking-wide text-base  hover:bg-transparent border border-2  border-[#123D91] mb-8">
        Cancel
      </button>
     <button type='submit' className="sm:mt-0 mt-4 w-[170px] bg-[#123D91] rounded-[5px] p-2 font-semibold mx-auto block tracking-wide text-base  hover:bg-transparent border border-2  border-[#123D91] mb-8">
        Submit
      </button>
      </div> 
    </form>
    </div>
  </Modal>
  )
}

export default MerchantsEdit