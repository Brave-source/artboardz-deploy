import React from "react";
import { Avatar } from "../UI/Avatar";
import { CardanoWallet, MeshBadge } from "@meshsdk/react";

export const Header = () => {
   console.log(window.location.hostname.substring(0,3))
   console.log(window.origin)
  return (
    <header className="col-span-full h-full bg-[#14171F] py-[10px] px-[32px] flex justify-between items-center">
      <h1 className="text-white text-2xl tracking-wide">Admin Panel</h1>
      <div className="w-12 aspect-square">
        <Avatar image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvFFG-hAuwWCF1wpo8rDXVEfoFI4_MTg0V8Q&usqp=CAU" />
      </div>
    </header>
  );
};
