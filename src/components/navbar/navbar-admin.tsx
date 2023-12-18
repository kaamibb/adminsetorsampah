"use client";
// Navbar.js

import React from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div className="bg-green-50 rounded-xl m-3">
      <ul className="flex justify-between items-center">
        <div>
        </div>

        <div className="flex gap-2 justify-center items-center">
          {!session ? (
            <></>
          ) : (
            <>
              <li className="md:text-sm text-xs md:p-4 p-2 font-semibold transition-all duration-300">
                {session.user?.name ? session.user?.name : session.user?.email}
              </li>
              <li>
                <button
                  onClick={() => {
                    signOut();
                  }}
                  className="bg-green-300 hover:bg-green-400 rounded-xl text-gray-900 font-semibold hover:bg-orange focus:outline-none focus:bg-red-800 md:text-sm text-xs md:p-2 p-2 mr-2 transition-all duration-300"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
