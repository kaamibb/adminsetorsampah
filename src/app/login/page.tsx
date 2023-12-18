"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from 'next/image';

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  // const session = useSession();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/dashboard");
    }
  }, [sessionStatus, router]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!password || password.length < 8) {
      setError("Password is invalid");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      if (res?.url) router.replace("/");
    } else {
      setError("");
    }
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className="bg-white min-h-screen flex items-center mx-auto">
        <div className="absolute top-0 left-0 p-4 flex items-center">
          <a href="/">
            <Image
              src="/img/navbarlogo-02.png"
              alt="tailus logo"
              width={120}
              height={200}
            />
          </a>
        </div>

        <div className="relative w-full lg:w-5/12">
          <div className="m-auto py-12 px-6 sm:p-20 xl:w-10/12 rounded-lg bg-white bg-opacity-80">
            <div className="space-y-4 text-left">
              <h2 className="text-4xl font-semibold text-green-500">Log In Admin</h2>
              <h3 className="text-1xl font-semibold text-gray-500">
                Selamat datang! Masukkan Email dan Password anda.
              </h3>
            </div>
            <form className="space-y-6 py-6" onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  placeholder="Email"
                  className="w-full py-3 px-6 ring-1 text-black ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 focus:invalid:outline-none"
                  required
                />
              </div>

              <div className="flex flex-col items-end">
                <input
                  type="password"
                  className="w-full py-3 px-6 ring-1 text-black ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 focus:invalid:outline-none"
                  placeholder="Password"
                  required
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded-xl bg-green-500 transition duration-300 transform hover:bg-green-600 focus:bg-green-600 active:bg-green-800"
                >
                  <span className="font-semibold text-white text-lg">
                    Login
                  </span>
                </button>
              </div>
              <p className="text-red-400 text-[16px] mb-4">{error && error}</p>
            </form>
          </div>
        </div>
        <div className="fixed inset-0 w-6/12 lg:w-7/12 m-3 ml-auto hidden lg:block">
          <Image
            src="/img/walrus-02.png"
            alt="Pattern"
            layout="fill"
            objectFit="cover"
            className="rounded-3xl"
          />
        </div>
      </div>
    )
  );
};

export default Login;
