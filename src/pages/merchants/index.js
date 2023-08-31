import React, { useEffect } from 'react';
import VendorsList from '../../components/Vendors/VendorsList';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getMerchantFailure, getMerchantStart, getMerchantSuccess } from '../../store/redux-store/MerchantSlice';

const Merchants = () => {
  const externalURL = "https://www.admin.artboardz.net";
  const globalURL = window.location.hostname.substring(0,3).toLocaleLowerCase();
  const dispatch = useDispatch();
  
  useEffect(() => {
    const getMerchants = async() => {
      dispatch(getMerchantStart());
     try {
        //  const res = await axios.get("http://localhost:3000/api/merchants");
         const res = await axios.get(globalURL == "www" ? `${externalURL}/api/merchants` :`${baseURL}/api/merchants`);
         dispatch(getMerchantSuccess(res.data));
     }catch(err) {
      dispatch(getMerchantFailure())
     }
    } 
    getMerchants();
 }, [])
  return (
    <VendorsList />
  );
}

export default Merchants;
