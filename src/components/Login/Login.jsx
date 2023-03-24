import React from 'react';
import {Box, Button} from '@mui/material'
import { useEffect } from "react";
import { Buffer } from "buffer";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getNFTById, getNFTsForAddress } from '../../utils/blockfrost';
import { getAdminFailure, getAdminStart, getAdminSuccess } from "../../store/redux-store/AdminSlice";
import { useRouter } from "next/router";
import { useAddress, useWallet } from '@meshsdk/react';
import { baseURL } from '../../utils/url';

const Login = () => {

  const dispatch = useDispatch()
  const router = useRouter()
  let csl, wallet;

useEffect(() => {
  document.querySelector("#main-layout");
}, []);
async function getStakeAddress(){
  const networkId = await wallet.getNetworkId();
  const changeAddrHex = await wallet.getChangeAddress();
  // derive the stakeAddress from the change address to be sure we are getting
  // the stake address of the currently active account.
  const changeAddress = csl.Address.from_bytes( Buffer.from(changeAddrHex, 'hex') );
  const stakeCredential = csl.BaseAddress.from_address(changeAddress).stake_cred();
  const stakeAddress = csl.RewardAddress.new(networkId, stakeCredential).to_address();
  return [stakeAddress.to_hex(), stakeAddress.to_bech32()];
}

  async function authenticate(){
    dispatch(getAdminStart())
    try{
        if (!csl) await loadCsl(); // make sure CSL is loaded before doing anything else.
        wallet = await window.cardano.eternl.enable();
        const [stakeAddrHex, stakeAddrBech32] = await getStakeAddress();
        const address = await getStakeAddress();
        // console.log(address[1]);
        // const resdata = await getNFTById("addr_test1qzww627ztazsdfrp6sty9tadyrrktl532ea52kt8r942awhtpewhzlzckjny2004lzf2ct229ykw9gug30shpl5q0y9sc67s8a", "07f40263969617defb3d50aaf54c822e95f814af8ea75ae89aa133b5")
        // const resdata = await getNFTsForAddress("addr_test1qrqhkcyjywzr5jhyaf587yyydg6369zam8urw8wpkyxr5p9drr2zf0whzt4quk03egdn4yaesm29288k0t56uz2qavtsjdux8d");
        // console.log(resdata)
        const messageUtf = `account: ${stakeAddrBech32}`;
        const messageHex = Buffer.from(messageUtf).toString("hex");    
        const sigData = await wallet.signData(stakeAddrHex, messageHex);
        const res = await axios.post(`${baseURL}/api/collectors`, sigData);
        dispatch(getAdminSuccess(res.data))
        

    }catch(err){
        console.log(err)
        dispatch(getAdminFailure())
    }

}

  async function loadCsl(){
    csl = await import("@emurgo/cardano-serialization-lib-browser/cardano_serialization_lib");
};

  const   handleClick = (e) => {
    e.preventDefault()
    authenticate()

  }
  // const address = useWallet();
  // console.log(address);
  return (
    <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    sx={{ height: '80vh' }}>
      <Button onClick={handleClick}>Login</Button>
      </Box>
  )
}

export default Login
