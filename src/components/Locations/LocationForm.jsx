import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLocationFailure, addLocationStart, addLocationSuccess } from '../../store/redux-store/LocationSlice';
import { toast } from 'react-toastify';

const LocationForm = ({ toggleLocation }) => {
    const [input, setInput] = useState({
        title: "",
        position: { lat: "", lng: "" },
        collectionId: ""
    })
    const collections = useSelector((state) => state.collection.collections)
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name)
        console.log(value)

        if (name === 'title') {
            setInput(prevInput => ({
                ...prevInput,
                title: value
            }));
        } else if (name === 'lat') {
            setInput(prevInput => ({
                ...prevInput,
                position: {
                    ...prevInput.position,
                    lat: value
                }
            }));
        } else if (name === 'lng') {
            setInput(prevInput => ({
                ...prevInput,
                position: {
                    ...prevInput.position,
                    lng: value
                }
            }));
        } else if (name === 'collectionId') {
            setInput(prevInput => ({
                ...prevInput,
                collectionId: value
            }));
        }
    }

    console.log(input)

    const submit = async (e) => {
        e.preventDefault();
        dispatch(addLocationStart())
        try {
            const res = await axios.post(`http://localhost:3000/api/locations`, input);
            dispatch(addLocationSuccess(res.data));
            toast.success("Successfully added")
            toggleLocation()
        } catch (err) {
            dispatch(addLocationFailure())
            toast.error("Something went wrong")
        }
    }

    return (
        <form className='w-[50vw] h-[40vh] flex flex-col gap-4 px-4 font-[inter]' onSubmit={submit}>
            <div className="flex flex-col">
                <label className='font-semibold text-sm text-slate-600' htmlFor="visibility">Collection</label>
                <select
                    name="collectionId"
                    required
                    onChange={handleChange}
                    className='bg-white outline-[#9EA6A9] outline-1 p-1 rounded-lg text-sm border focus:outline-none'
                    id="visibility"
                >
                    {/* Automatically select the first option */}
                    <option value="" selected disabled>
                        Select a collection
                    </option>
                    {collections.map((item) => (
                        <option key={item._id} value={item._id}>
                            {item.title}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col">
                <label className='font-semibold text-sm text-slate-600' htmlFor="title">Title/City</label>
                <input name="title" onChange={handleChange} className='bg-white outline text-md text-[#9EA6A9]  outline-[#9EA6A9] outline-1 p-1 rounded-lg' type="text" placeholder='Enter Merchant Title/City' />
            </div>
            <div className="flex flex-col">
                <label className='font-semibold text-sm text-slate-600' htmlFor="title">Latitude</label>
                <input name="lat" onChange={handleChange} className='bg-white text-slate-600 outline text-md text-[#9EA6A9]  outline-[#9EA6A9] outline-1 p-1 rounded-lg' type="text" placeholder='Enter the latitude' />
            </div>

            <div className="flex flex-col">
                <label className='font-semibold text-sm text-slate-600' htmlFor="tags">Longitude </label>
                <input name="lng" onChange={handleChange} className=' bg-white outline text-slate-600  outline-[#9EA6A9] outline-1 p-1 rounded-lg' type="text" placeholder='Enter the longitude' />
            </div>
            <div className="flex justify-end gap-3">
                <button onClick={toggleLocation} className='text-xs font-semibold text-slate-600'>Cancel</button>
                <button className='text-xs font-semibold text-white bg-[#2CA568] px-4 py-2 rounded-lg'>Add Location</button>
            </div>
        </form>
    )
}

export default LocationForm;
