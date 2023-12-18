import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/navbar/navbar-admin";
import Datalist from "@/components/list/datalist";
import Sidebar from "@/components/navbar/sidebar";

export const metadata = {
        title: "Setor Sampah",
        description: "#LessPlasticMoreLife",
};

const Dashboard = async () => {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navbar */}
      {/* Container */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Sidebar (20%) */}
        <div className="lg:w-1/5 lg:h-auto bg-green-300  text-white  rounded-xl m-4 justify-center items-center shadow-xl">
          {/* Content for data selection */}
          <Sidebar />
        </div>
        {/* Main Content (80%) */}
        <div className="lg:w-4/5 bg-green-300 m-4 rounded-xl shadow-xl">
          {/* Data Display */}
          <Navbar />
          <Datalist />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
