import React from "react";
import CollectorsIcons from "../../Assets/Icons/Collectors";
import CollectionsIcons from "../../Assets/Icons/Collections";
import Link from "next/link";
import { useRouter } from 'next/router';

export const Navbar = () => {
  const router = useRouter();
  const activeClassHandler = ({ isActive }) => {
    return isActive
      ? "flex items-center gap-[10px] pl-[30px] border-l-4 border-white bg-[#4B5768]"
      : "flex items-center gap-[10px] pl-[30px]";
  };
  return (
    <nav className={router.pathname == "/" ? "hidden" : "bg-[#14171F] border-t border-white pt-10 text-white"}>
      <ul className="grid gap-5 font-semibold text-lg tracking-wide">
        <li>
          <Link className={activeClassHandler} href="/collectors">
            <span
              aria-hidden
              className="flex justify-center  h-[2rem]"
            >
              <CollectorsIcons />
              <p>
                Collectors
              </p>
            </span>
          </Link>
        </li>
        <li>
          <Link className={activeClassHandler} href="/collections">
            <span
              aria-hidden
              className="flex justify-center  h-[2rem]"
            >
              <CollectionsIcons />
              <p>
                Collections
              </p>
            </span>
            
          </Link>
        </li>
        <li>
          <Link className={activeClassHandler} href="/merchants">
            <span
              aria-hidden
              className="flex justify-center  h-[2rem]"
            >
              <CollectionsIcons />
              <p>
                Merchants
              </p>
            </span>
            
          </Link>
        </li>
      </ul>
    </nav>
  );
};
