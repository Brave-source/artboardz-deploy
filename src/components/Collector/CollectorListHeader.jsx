import React from "react";
import TrafficIcon from "../../Assets/Icons/Traffic";

const CollectorListHeader = () => {
  return (
    <div className="bg-[#14171F] p-5 text-center text-sm font-semibold">
      <div className="grid grid-cols-9 place-items-center text-white">
        <div>
          <p>Profile Image</p>
        </div>
        <div className="flex gap-2 items-center">
          <p>Wallet Address</p> <TrafficIcon />
        </div>
        <div className="flex gap-2 items-center">
          <p>Name</p> <TrafficIcon />
        </div>
        <div>
          <p>Nationality</p>
        </div>
        <div>
          <p>Twitter</p>
        </div>
        <div>
          <p>Unique Collections</p>
        </div>
        <div>
          <p>Collections Size</p>
        </div>
        <div className="flex gap-2 items-center">
          <p>Display</p> <TrafficIcon />
        </div>
        <div>
          <p>Actions</p>
        </div>
      </div>
    </div>
  );
};

export default CollectorListHeader;
