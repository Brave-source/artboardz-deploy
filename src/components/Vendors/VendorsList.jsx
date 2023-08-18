import React from 'react';
import Card from '../UI/Card';
import VendorsItem from './VendorsItem';

const VendorsList = () => {
  return (
    <Card>
        <div className="bg-[#14171F] p-5 text-center text-sm font-semibold">
            <div className="grid grid-cols-6 place-items-center text-white">
                <div className="flex gap-2 items-center">
                    <p>Image</p>
                </div>
                <div className="flex gap-2 items-center">
                    <p>User name</p>
                </div>
                <div className="flex gap-2 items-center">
                    <p>Partner Name</p>
                </div>
                <div className="flex gap-2 items-center">
                    <p>Contact number</p>
                </div>
                <div className="flex gap-2 items-center">
                    <p>Business tipe</p>
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
