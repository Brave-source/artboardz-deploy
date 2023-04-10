import React from "react";
import { Avatar } from "../UI/Avatar";
import { CardanoWallet, MeshBadge } from "@meshsdk/react";

export const Header = () => {
  
  return (
    <header className="col-span-full h-full bg-[#14171F] py-[10px] px-[32px] flex justify-between items-center">
      <h1 className="text-white text-2xl tracking-wide">Admin Panel</h1>
      <div className="w-12 aspect-square">
        <Avatar image="https://firebasestorage.googleapis.com/v0/b/cardano-d265c.appspot.com/o/defaultProfile.png?alt=media&token=a2172f23-507f-4e25-a64d-beb767d9d0f3" />
      </div>
    </header>
  );
};
