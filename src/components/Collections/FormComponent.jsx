import React, { useState } from 'react';

const FormComponent = () => {
  const [entries, setEntries] = useState([]);

  const handleInputChange = (index, field, value) => {
    const newEntries = [...entries];
    newEntries[index][field] = value;
    setEntries(newEntries);
  };

  const handleAddEntry = () => {
    const newEntry = {
      x: '',
      y: '',
      title: '',
      description: '',
    };
    setEntries([...entries, newEntry]);
  };

  const log =() =>{
    console.log(entries)
  }
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-2 gap-4">
        {entries.map((entry, index) => (
          <div key={index} className="border rounded p-4">
            <h3 className="text-xl mb-2">Entry {index + 1}</h3>
            <div className="mb-4">
              <input
                type="text"
                placeholder="x"
                className="border border-gray-300 rounded px-2 py-1 w-full"
                value={entry.x}
                onChange={(e) => handleInputChange(index, 'x', e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="y"
                className="border border-gray-300 rounded px-2 py-1 w-full"
                value={entry.y}
                onChange={(e) => handleInputChange(index, 'y', e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Title"
                className="border border-gray-300 rounded px-2 py-1 w-full"
                value={entry.title}
                onChange={(e) => handleInputChange(index, 'title', e.target.value)}
              />
            </div>
            <div>
              <textarea
                placeholder="Description"
                className="border border-gray-300 rounded px-2 py-1 w-full"
                value={entry.description}
                onChange={(e) => handleInputChange(index, 'description', e.target.value)}
              ></textarea>
            </div>
            <div className="flex flex-col  ">
        <span className="text-[#B3B5BD] text-base">
        Physical Artboard
        </span>
        <label
          htmlFor="Physical Artboard"
          className="focus:bg-transparent bg-[#272832] focus:outline-white focus:outline rounded-md h-[150px] text-base px-3 flex items-center justify-center"
        >
          {physicalArtboard && physicalArtboardUrl ?
          <div style={{width: '100%', height: '100%', position: 'relative'}}>
            <Image src={physicalArtboardUrl} fill
    objectFit='contain'/>
            </div>
            :
            <CameraIcon />
          }
        </label>
        <input
          type="file"
          name="Physical Artboard"
          id="Physical Artboard"
          onChange={(e) => setphysicalArtboard(e.target.files[0])}
          accept="image/*"
          hidden
        />
      </div>
          </div>
        ))}
      </div>
      <div className="flex mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
          onClick={handleAddEntry}
        >
          Add New Entry
        </button>
        
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
          onClick={log}
        >
          Add New Entry
        </button>
      </div>
    </div>
  );
};

export default FormComponent;
