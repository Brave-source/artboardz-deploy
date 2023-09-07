import React from "react";
import { Avatar } from "../UI/Avatar";
import {defaultProfile} from "../../Assets/Icons/defaultProfile.png";
import { CardanoWallet, MeshBadge } from "@meshsdk/react";

export const Header = () => {
  
  return (
    <header className="col-span-full h-full bg-[#14171F] py-[10px] px-[32px] flex justify-between items-center">
      <h1 className="text-white text-2xl tracking-wide">Admin Panel</h1>
      <div className="w-12 aspect-square">
        <Avatar image="https://artboardz.s3.us-east-1.amazonaws.com/defaultProfile.png" />
      </div>
    </header>
  );
};
