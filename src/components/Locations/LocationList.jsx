import Card from '../UI/Card';
import styles from "./filter.module.css"
import React, { useEffect, useState } from 'react';
import LocationItem from './LocationItem';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import LocationForm from './LocationForm';
import Modal from '../Modal';
import { getLocationFailure, getLocationStart, getLocationSuccess } from '../../store/redux-store/LocationSlice';

const LocationList = () => {
    const externalURL = "https://www.admin.artboardz.net";
    const globalURL = window.location.hostname.substring(0,3).toLocaleLowerCase();
    const dispatch = useDispatch()
    const [collectionId, setCollectionId] = useState("");
    const [filteredLocation, setFilteredLocation] = useState([]);
    const locations = useSelector((state) => state.location.locations);
    const collections = useSelector((state) => state.collection.collections);
    const [locationOpen, setLocationOpen] = useState(false);
    const toggLocation = () => setLocationOpen(!locationOpen);

    useEffect(() => {
        const getLocations = async () => {
            dispatch(getLocationStart())
            try {
                // const res = await axios.get(`http://localhost:3000/api/locations`);
                const res = await axios.get(globalURL == "www" ? `${externalURL}/api/locations` :`${baseURL}/api/locations`);
                dispatch(getLocationSuccess(res.data));
            } catch (er) {
                dispatch(getLocationFailure())
            }
        }
        getLocations();
    }, [])

    useEffect(() => {
        collectionId && setFilteredLocation(
            locations.filter((item) => item.collectionId === collectionId)
        )
    }, [collectionId])

    const handleFilters = (e) => {
        setCollectionId(e.target.value);
    }
    const emptyFilters = () => {
        setFilteredLocation([])
    }
    return (
        <Card>
            <div className={styles.filterContainer}>
                <button onClick={toggLocation} className={styles.button}>Add location</button>
                <select className={styles.filters} onClick={handleFilters}>
                    <option onClick={emptyFilters}>All</option>
                    {collections.map((item) => {
                        return (
                            <option value={item._id}>{item.title}</option>
                        )
                    })}
                </select>
            </div>
            <div className="bg-[#14171F] p-5 text-center text-sm font-semibold">
                <div className="grid grid-cols-4 place-items-center text-white">
                    <div className="flex gap-2 items-center">
                        <p>Title</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <p>Latitude</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <p>Longitude</p>
                    </div>
                    <div>
                        <p>Action</p>
                    </div>
                </div>
            </div>
            {filteredLocation.length > 0 ? <LocationItem locations={filteredLocation} /> : <LocationItem locations={locations} />}
            {/* <LocationItem locations={locations}/> */}
            {/* Question modal */}
            <Modal isOpen={locationOpen} onClose={() => { }}>
                <LocationForm toggleLocation={toggLocation} />

            </Modal>
        </Card>

    );
}

export default LocationList;
