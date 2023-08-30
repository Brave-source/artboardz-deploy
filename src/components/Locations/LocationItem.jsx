import React from 'react';
import { useState } from 'react';
import { TrashIcon } from "@heroicons/react/24/outline";
import EditIcon from "../../Assets/Icons/EditIcon";
import Image from 'next/image';
import Modal from '../Modal';
import EditLocationForm from './EditLocationForm';
import { deleteLocationFailure, deleteLocationStart, deleteLocationSuccess } from '../../store/redux-store/LocationSlice';
import axios from 'axios';
import Notiflix from 'notiflix';
import { useDispatch } from 'react-redux';

const LocationItem = ({locations}) => {
  const [id, setId] = useState("");
  const [editLocationOpen, seteditLocationOpen] = useState(false);
  const toggEditLocation = () => seteditLocationOpen(!editLocationOpen);
  const dispatch = useDispatch()

  const handleLocationId = (id) => {
    setId(id)
  }

  const confirmDelete = (id) => {
    Notiflix.Confirm.show(
      "Delete merchant!!!",
      "You are about to delete this merchant",
      "Delete",
      "Cancel",
      function okCb() {
        deleteLocation(id);
      },
      function cancelCb() {
        console.log("Delete Canceled");
      },
      {
        width: "320px",
        borderRadius: "3px",
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom",
      }
    );
  };

  const deleteLocation = async(id) => {
    dispatch(deleteLocationStart())
    try {
      // globalURL == "www" ? `${externalURL}/api/merchants/${id}` :`${baseURL}/api/merchants/${id}`
      await axios.delete(`http://localhost:3000/api/locations/${id}`);
      dispatch(deleteLocationSuccess(id))
    }catch(err){
      dispatch(deleteLocationFailure())
    }
  }

  return (
    <div>
        {locations?.map((item) => {
           return (
            <>
            <li className="grid grid-cols-4 py-5 place-items-center text-sm font-semibold tracking-wide break-word border-b border-[#AECEFF] last-of-type:border-none text-[#323A46]">
              <div>
                <p>{item?.title}</p>
              </div>
              <div>
                <p>{item?.position.lat}</p>
              </div>
              <div>
                <p>{item?.position.lng}</p>
              </div>
                <div className="grid grid-cols-2 py-5 place-items-left">
                <button onClick={() => {
                  handleLocationId(item._id)
                  toggEditLocation()
                }} >
                  <EditIcon />
                </button>
                <button onClick={(e) => {
                  e.stopPropagation()
                  confirmDelete(item._id)
                }} >
                    <TrashIcon className="w-5 h-5" />
                  </button>
              </div>
            </li>
            {/* Question modal */}
            <Modal isOpen={editLocationOpen} onClose={() => { }}>
                <EditLocationForm toggEditLocation={toggEditLocation} id={id} />

            </Modal>
    </>
          )
       })}
    </div>
  );
}

export default LocationItem;
