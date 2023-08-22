
import React, { useState } from 'react';
import CardHeader from '../UI/CardHeader';
import CameraIcon from '../../Assets/Icons/CameraIcon';
import EditIcon from '../../Assets/Icons/EditIcon';
import { TrashIcon } from '@heroicons/react/24/outline';


const index = () => {
    const [entries, setEntries] = useState([
        {
            position: { lat: "", lng: "" },
            title: 'Placeholder Title 1',
            desc: 'Placeholder Description 1',
            img: '',
            link: 'http://example.com/1',
        },
        {
            position: { lat: "", lng: "" },
            title: 'Placeholder Title 2',
            desc: 'Placeholder Description 2',
            img: '',
            link: 'http://example.com/2',
        }
    ]);

    const handleInputChange = (index, field, value) => {
        const newEntries = [...entries];
        if (field === 'lat' || field === 'lng') {
            newEntries[index].position = {
                ...newEntries[index].position,
                [field]: value,
            };
        } else {
            newEntries[index][field] = value;
        }
        setEntries(newEntries);
    };

    const handleImageChange = (index, file) => {
        const newEntries = [...entries];
        newEntries[index].img = URL.createObjectURL(file);
        setEntries(newEntries);
    };
  return (
    <div className='h-[100vh] w-full'>
            <CardHeader type='Locations' />
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-3 gap-4">
                    {entries.map((entry, index) => (
                        <div key={index} className="border rounded p-4">
                                  <div className="grid grid-cols-2 py-5 place-items-left mr-6">
                             
        <div>
        <button >
          <EditIcon className="w-5 h-5 "/>
        </button>
        <button >
            <TrashIcon className="w-5 h-5 ml-2  pt-1" />
          </button>
      </div>
      <h3 className="text-xl mb-2">Entry {index + 1}</h3>
      </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="latitude"
                className="focus:bg-transparent bg-[#272832] border border-gray-300 rounded px-2 py-1 w-full"
                value={entry.position.lat}
                onChange={(e) => handleInputChange(index, 'lat', e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="longitude"
                className="focus:bg-transparent bg-[#272832] border border-gray-300 rounded px-2 py-1 w-full"
                value={entry.position.lng}
                onChange={(e) => handleInputChange(index, 'lng', e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Title"
                className="focus:bg-transparent bg-[#272832] border border-gray-300 rounded px-2 py-1 w-full"
                value={entry.title}
                onChange={(e) => handleInputChange(index, 'title', e.target.value)}
              />
            </div>
            <div>
              <textarea
                placeholder="Description"
                className="focus:bg-transparent bg-[#272832] border border-gray-300 rounded px-2 py-1 w-full"
                value={entry.desc}
                onChange={(e) => handleInputChange(index, 'desc', e.target.value)}
              ></textarea>
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Link"
                className="focus:bg-transparent bg-[#272832] border border-gray-300 rounded px-2 py-1 w-full"
                value={entry.link}
                onChange={(e) => handleInputChange(index, 'title', e.target.value)}
              />
            </div>
            <div className="flex flex-col  ">
              <span className="text-[#B3B5BD] text-base">
              Image
              </span>
              <label
                                htmlFor={`entryImage-${index}`}
                                className="focus:bg-transparent bg-[#272832] focus:outline-white focus:outline rounded-md h-[150px] text-base px-3 flex items-center justify-center"
                            >
                                {entry.img ?
                                    <img src={entry.img} alt={`entry-${index}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                    :
                                    <CameraIcon />
                                }
                            </label>
                            <input
                                type="file"
                                name={`entryImage-${index}`}
                                id={`entryImage-${index}`}
                                onChange={(e) => handleImageChange(index, e.target.files[0])}
                                accept="image/*"
                                hidden
                            />
            </div>
      
          </div>
          
        ))}
      </div>
      
    </div>
    </div>
  );
}

export default index;
