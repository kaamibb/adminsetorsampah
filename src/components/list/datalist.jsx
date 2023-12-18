"use client";
import React, { useState, useEffect } from "react";
import RemoveBtn from "../button/RemoveData";
import { useRouter } from "next/navigation";
import { TrashIcon } from "@heroicons/react/solid";

const getdata = async () => {
  try {
    const res = await fetch("/api/data", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading data: ", error);
    throw error;
  }
};

const Datalist = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getdata();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const removeData = async (email) => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      try {
        const res = await fetch(`/api/data?email=${email}`, {
          method: "DELETE",
        });

        if (res.ok) {
          setData((prevData) => prevData.filter((item) => item.email !== email));
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error deleting data:", error);
        setError(error.message);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
    <div className="overflow-x-auto">
      {data.length > 0 ? (
          <table className="min-w-full bg-white text-black rounded-xl ">
            <thead>
            <tr className="bg-slate-200 rounded-t-xl">
                <th className="border-b p-3 text-left">Name</th>
                <th className="border-b p-3 text-left">Email</th>
                <th className="border-b p-3 text-left">Lokasi Gunung</th>
                <th className="border-b p-3 text-left">Kertas</th>
                <th className="border-b p-3 text-left">Plastik</th>
                <th className="border-b p-3 text-left">Kaleng</th>
                <th className="border-b p-3 text-left">Tanggal Naik</th>
                <th className="border-b p-3 text-left">Tanggal Turun</th>
                <th className="border-b p-3 text-left">Status</th>
                <th className="border-b p-3 text-left">Total Poin</th>
                <th className="border-b p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.email} className="text-black hover:bg-slate-300">
                  <td className="border-b p-3">{item.name}</td>
                  <td className="border-b p-3">{item.email}</td>
                  <td className="border-b p-3">{item.lokasigunung}</td>
                  <td className="border-b p-3">{item.kertas}</td>
                  <td className="border-b p-3">{item.plastik}</td>
                  <td className="border-b p-3">{item.kaleng}</td>
                  <td className="border-b p-3">{item.tanggalNaik}</td>
                  <td className="border-b p-3">{item.tanggalTurun}</td>
                  <td className="border-b p-3">{item.status}</td>
                  <td className="border-b p-3">{item.totalPoin}</td>
                  <td className="p-4 border-b border-blue-gray-50">
              <RemoveBtn email={item.email} removeData={removeData} />
              {/* Tombol Hapus dengan ikon */}
              <button
                onClick={() => removeData(item.email)}
                className="text-red-500 hover:text-red-700"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </td>
                </tr>
              ))}
            </tbody>
          </table>
          ) : (
          <p className="text-center text-xl font-bold mt-8">
            Data Lagi Kosong Guys
          </p>
        )}
        </div>
    </div>
  );
};

export default Datalist;
