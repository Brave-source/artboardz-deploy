import React from 'react';
import { TrashIcon } from "@heroicons/react/24/outline";
import EditIcon from "../../Assets/Icons/EditIcon";
import Image from 'next/image';

const LocationItem = ({locations}) => {
  return (
    <div>
        {locations?.map((item) => {
           return (
            <>
            <li className="grid grid-cols-5 py-5 place-items-center text-sm font-semibold tracking-wide break-word border-b border-[#AECEFF] last-of-type:border-none text-[#323A46]">
              <div>
                <Image src={item?.img} width={100} height={100} unoptimized={true} className="break-all" />
              </div>
              <div>
                <p>{item?.title}</p>
              </div>
              <div>
                <p>{item?.position.lat}</p>
              </div>
              <div>
                <p>{item?.position.lng}</p>
              </div>
                <div className="grid grid-cols-2 py-5 place-items-left">
                <button >
                  <EditIcon />
                </button>
                <button >
                    <TrashIcon className="w-5 h-5" />
                  </button>
              </div>
            </li>
    </>
          )
       })}
    </div>
  );
}

export default LocationItem;
