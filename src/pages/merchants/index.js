import React, { useEffect } from 'react';
import VendorsList from '../../components/Vendors/VendorsList';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getMerchantFailure, getMerchantStart, getMerchantSuccess } from '../../store/redux-store/MerchantSlice';

const index = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const getMerchants = async() => {
      dispatch(getMerchantStart());
     try {
         const res = await axios.get("http://localhost:3000/api/merchants");
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

export default index;
