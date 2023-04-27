import React from 'react';
import {Box, Button} from '@mui/material'
import { useEffect } from "react";
import { Buffer } from "buffer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getNFTById, getNFTsForAddress } from '../../utils/blockfrost';
import { getAdminFailure, getAdminStart, getAdminSuccess } from "../../store/redux-store/AdminSlice";
import { useRouter } from "next/router";
import { useAddress, useWallet } from '@meshsdk/react';
import { baseURL } from '../../utils/url';

const Login = () => {
  const externalURL = "https://www.admin.artboardz.net"
  const globalURL = window.location.hostname.substring(0,3).toLocaleLowerCase()
  const dispatch = useDispatch()
  const router = useRouter()

  const isAuthenticated = useSelector((state) => state.admin.isAuthenticated)
  
  useEffect(() => {
    if(isAuthenticated) {
      router.push("/collections")
    }
  },[isAuthenticated, router]);

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
        const resdata = await getNFTsForAddress("addr1q84y5yfjprlrawlnsawqtyj0njwvu7dw2zfkwyap0pmxz820y83zyvgf2hsjua6v07fnt8zejzsncnkcx6h8yqv60reqapaqpg")
        // const resdata = await getNFTsForAddress("0cc01b98d9a241aa5c3a0c7d7d1b9d53485fcf881a47ddb009380ec14f726967696e7353313232");
        console.log(resdata)
        const messageUtf = `account: ${stakeAddrBech32}`;
        const messageHex = Buffer.from(messageUtf).toString("hex");  
        const sigData = await wallet.signData(stakeAddrHex, messageHex);
        // globalURL == "www" ? `${externalURL}/api/collectors` : `${baseURL}
        const res = await axios.post(`http:/localhost:3000/api/collectors`, sigData);
        dispatch(getAdminSuccess(res.data))
        router.push("/collections")
    }catch(err){
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
