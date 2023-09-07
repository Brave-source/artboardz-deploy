import axios from "axios";
import {useEffect } from "react";
import CollectionItem from "./CollectionsIItem";
import { useDispatch, useSelector } from "react-redux";
import { getCollectionFailure, getCollectionStart, getCollectionSuccess } from "../../store/redux-store/CollectionSlice";
import { baseURL } from "../../utils/url";

const DUMMY_DATA = [
  {
    Policy: "adsf98qywhtglhasgoidgj",
    artistName: "Serge",
    artboardTitle: "First Project",
    location: "CapeTown",
    supplyTime: "50",
  },
  {
    Policy: "adsf98qywhtglhasgoidgj",
    artistName: "Serge",
    artboardTitle: "Second Project",
    location: "CapeTown",
    supplyTime: "50",
  },
{
    Policy: "adsf98qywhtglhasgoidgj",
    artistName: "Serge",
    artboardTitle: "Third Project",
    location: "CapeTown",
    supplyTime: "50",
  },  
];
const CollectionList = () => {
const dispatch = useDispatch()
const collections = useSelector((state) => state.collection.collections)
const externalURL = "https://www.admin.artboardz.net";
const globalURL = window.location.hostname.substring(0,3).toLocaleLowerCase()

useEffect(() => {
  const getCollections = async() => {
    dispatch(getCollectionStart())
    try {
      // const res = await axios.get(`http://localhost:3000/api/collections`)
      const res = await axios.get(globalURL == "www" ? `${externalURL}/api/collections` :`${baseURL}/api/collections`)
      dispatch(getCollectionSuccess((res.data)));
    }catch(err){
      dispatch(getCollectionFailure())
    }
  }
  getCollections()
},[])
return (
    <ul className="px-5">
      {collections.map((data, index) => {
        return (
          <CollectionItem
            key={data?._id}
            id={data?._id}
            Policy={data?.policy}
            artistName={data?.name}
            artboardTitle={data?.title}
            supplyTime={data?.supply}
            location={data?.location}
            city={data?.city}
            country={data?.country}
            bannerUrl={data?.bannerUrl}
            artistUrl={data?.artistUrl}
            digitalUrl={data?.digitalArtUrl}
            physicalUrl={data?.physicalArtUrl}
          />
        );
      })}
    </ul>
  );
};

export default CollectionList;
