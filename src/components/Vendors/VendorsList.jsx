import React from 'react';
import Card from '../UI/Card';
import VendorsItem from './VendorsItem';

const VendorsList = () => {
  return (
    <Card>
        <div className="bg-[#14171F] p-5 text-center text-sm font-semibold">
            <div className="grid grid-cols-6 place-items-center text-white">
                <div className="flex gap-2 items-center">
                    <p>Policy</p>
                </div>
                <div className="flex gap-2 items-center">
                    <p>Artist Name</p>
                </div>
                <div className="flex gap-2 items-center">
                    <p>Artboard Title</p>
                </div>
                <div className="flex gap-2 items-center">
                    <p>Location</p>
                </div>
                <div className="flex gap-2 items-center">
                    <p>Supply</p>
                </div>
                <div>
                    <p>Action</p>
                </div>
            </div>
        </div>
        <VendorsItem />
    </Card>
  );
}

export default VendorsList;
