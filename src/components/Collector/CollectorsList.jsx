import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCollectorFailure, getCollectorStart, getCollectorSuccess } from "../../store/redux-store/CollectorSlice";
import { baseURL } from "../../utils/url";
import CollectorsItems from "./CollectorsItems";

const DUMMY_DATA = [
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvFFG-hAuwWCF1wpo8rDXVEfoFI4_MTg0V8Q&usqp=CAU",
    walletAddress: "1ExAmpLe0FaBiTco1NAdDr3sSV5tsGaMF6hd",
    artboardTag: "The Terminator",
    nationality: "chinese",
    twitter: "@twitter",
    uniqueCollection: 4,
    collectionSize: 10,
    display: true,
  },

  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvFFG-hAuwWCF1wpo8rDXVEfoFI4_MTg0V8Q&usqp=CAU",
    walletAddress: "addrljl;jl;dsa;ljfkfjklee9jl.jdfl;jd",
    artboardTag: "The Terminator",
    nationality: "chinese",
    twitter: "@twitter",
    uniqueCollection: 4,
    collectionSize: 10,
    display: false,
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvFFG-hAuwWCF1wpo8rDXVEfoFI4_MTg0V8Q&usqp=CAU",
    walletAddress: "addrljl;jl;dsa;ljfkfjklee9jl.jdfl;jd",
    artboardTag: "The Terminator",
    nationality: "chinese",
    twitter: "@twitter",
    uniqueCollection: 4,
    collectionSize: 10,
    display: true,
  },
];

const CollectorsList = () => {
  const dispatch = useDispatch()
  const collectors = useSelector((collector) => collector.collector.collectors)
  
  useEffect(() => {
    const getCollectors = async() => {
      dispatch(getCollectorStart());
      try {
        const res = await axios.get(`${baseURL}/api/collectors`);
        dispatch(getCollectorSuccess(res.data));
      }catch(err) {
        dispatch(getCollectorFailure())
      }
    }
    getCollectors();
  },[])

  return (
    <ul className="px-5">
      {collectors.map((data, index) => {
        return (
          <CollectorsItems
            key={index}
            image={data.image}
            walletAddress={data.stakeAddress}
            name={data.name}
            nationality={data.nationality}
            twitter={data.twitter}
            uniqueCollection={data.policyIds}
            collectionSize={data.assets}
            display={data.display}
          />
        );
      })}
    </ul>
  );
};

export default CollectorsList;
