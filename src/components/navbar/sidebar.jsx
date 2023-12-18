// Sidebar.js
"use client"
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();

  return (
    <nav className="bg-green-300 w-full">
      {/* Sidebar Content */}
      <div className="">
        {/* Your Logo or Branding */}
        <div className="flex items-center mb-4 ml-4 py-6">
          <img
            src="/img/navbarlogo-02.png"
            alt="Logo"
            className="w-32 mr-2 pt-0"
          />
        </div>

        {/* Navigation Links */}
        <ul>
          <li className={router.pathname === "/dashboard" ? "active" : ""}>
            <Link href="/dashboard">
              <div className="text-gray-900 font-semibold bg-green-50 flex items-center p-2 ml-4 rounded-lg hover:bg-green-50 transition">
                <span className="mr-2"></span> Dashboard
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
