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
  const dispatch = useDispatch();
  const collectors = useSelector((collector) => collector.collector.collectors);
  const externalURL = "https://www.admin.artboardz.net";
  const globalURL = window.location.hostname.substring(0,3).toLocaleLowerCase();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const getCollectors = async() => {
      dispatch(getCollectorStart());
      try {
        const res = await axios.get(globalURL == "www" ? `${externalURL}/api/collectors` :`${baseURL}/api/collectors`);
        dispatch(getCollectorSuccess(res.data));
      }catch(err) {
        dispatch(getCollectorFailure())
      }
    }
    getCollectors();
  },[]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = collectors.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(collectors.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="px-5">
      <ul> 
        {currentItems.length > 0 && currentItems.map((data, index) => {
          return (
            <CollectorsItems
              key={index}
              id={data?._id}
              image={data?.image}
              walletAddress={data?.stakeAddress}
              name={data?.name}
              nationality={data?.nationality}
              twitter={data?.twitter}
              uniqueCollection={data?.policyIds}
              collectionSize={data?.assets}
              display={data?.display}
            />
          );
        })}
      </ul>
      <div className="flex justify-center pb-10">
        {pageNumbers.map((number) => {
          return (
            <button
              key={number}
              onClick={() => handlePageClick(number)}
              className={`px-3 py-1 rounded-lg mx-1 ${currentPage === number ? "bg-gray-800 text-white" : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"}`}
            >
              {number}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CollectorsList;