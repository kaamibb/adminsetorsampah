/* eslint-disable @next/next/no-async-client-component */
"use client";

export default function RemoveData({ email, removeData }) {
  const handleRemove = () => {
    removeData(email);
  };

  return (
    <button onClick={handleRemove}>
    </button>
  );
}
