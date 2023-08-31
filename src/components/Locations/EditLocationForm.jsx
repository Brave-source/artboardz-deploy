import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateLocationFailure, updateLocationStart, updateLocationSuccess } from '../../store/redux-store/LocationSlice';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditLocationForm = ({ toggEditLocation, id }) => {
    const externalURL = "https://www.admin.artboardz.net";
    const globalURL = window.location.hostname.substring(0,3).toLocaleLowerCase();
    const location = useSelector((state) => state.location.locations.filter((item) => item._id === id))[0];
    const [title, setTitle] = useState(location.title);
    const [lat, setLat] = useState(location.position.lat);
    const [lng, setLng] = useState(location.position.lng);

    const dispatch = useDispatch()
    
    const submit = async(e) => {
        e.preventDefault();
        const data = {
            title,
            _id: location._id,
            position: {lat, lng},
            collectionId: location.collectionId,
        }
        dispatch(updateLocationStart());
        try {
            // const res = await axios.put(`http://localhost:3000/api/locations/${id}`, data);
            const res = await axios.put(globalURL == "www" ? `${externalURL}/api/locations/${id}` :`${baseURL}/api/locations/${id}`, data);
            dispatch(updateLocationSuccess({id, data}));
            toggEditLocation()
            toast.success("Location successfully edited")
        }catch(err) {
            toast.error("Error! something went wrong")
            dispatch(updateLocationFailure());
        }
    }

    return (
        <form className='w-[50vw] h-[30vh] flex flex-col gap-4 px-4 font-[inter]' onSubmit={submit}>
            <div className="flex flex-col">
                <label className='font-semibold text-sm text-slate-600' htmlFor="title">Title/City</label>
                <input className='bg-white outline text-md text-[#9EA6A9]  outline-[#9EA6A9] outline-1 p-1 rounded-lg' name='title' value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder='' />
            </div>
            <div className="flex flex-col">
                <label className='font-semibold text-sm text-slate-600' htmlFor="title">Latitude</label>
                <input className='bg-white text-slate-600 outline text-md text-[#9EA6A9]  outline-[#9EA6A9] outline-1 p-1 rounded-lg' name='lat' value={lat} onChange={(e)=> setLat(e.target.value)} type="text" placeholder='' />
            </div>

            <div className="flex flex-col">
                <label className='font-semibold text-sm text-slate-600' htmlFor="tags">Longitude </label>
                <input className=' bg-white outline text-slate-600  outline-[#9EA6A9] outline-1 p-1 rounded-lg' name='lng' value={lng} onChange={(e) => setLng(e.target.value)} type="text" placeholder='' />
            </div>
            <div className="flex justify-end gap-3">
                <button onClick={toggEditLocation} className='text-xs font-semibold text-slate-600'>Cancel</button>
                <button className='text-xs font-semibold text-white bg-[#2CA568] px-4 py-2 rounded-lg'>Update</button>
            </div>
        </form>
    )
}

export default EditLocationForm;
