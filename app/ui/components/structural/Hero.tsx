"use client";

import Link from "next/link";
import Image from "next/image";
import StoreHours from "@/types/models/StoreHours";
import { useState } from "react";
import React from "react";

export type HighlightStore = {
  id: number,
  name: string,
  address: string,
  modality: string,
  city: string,
  hours: StoreHours[],
  image?: string,
};

type HighlightStoresProps = {
  stores: HighlightStore[];
};

const HighlightStores: React.FC<HighlightStoresProps> = ({ stores }) => {
  const [currentStoreIndex, setCurrentStoreIndex] = useState(0); // Current active store
  const totalStores = stores.length;

  const generatePageNumbers = () => {
    const pageNumbers: (number | string)[] = [];

    // Always include the first page
    pageNumbers.push(1);

    // Add truncation if necessary before the current range
    if (currentStoreIndex > 2) {
      pageNumbers.push("...");
    }

    // Add a sliding window of numbers around the current store
    const start = Math.max(1, currentStoreIndex - 1);
    const end = Math.min(totalStores, currentStoreIndex + 3);
    for (let i = start; i < end; i++) {
      pageNumbers.push(i + 1);
    }

    // Add truncation after the current range
    if (currentStoreIndex + 3 < totalStores - 1) {
      pageNumbers.push("...");
    }

    // Always include the last page
    if (totalStores > 1) {
      pageNumbers.push(totalStores);
    }

    return pageNumbers;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="flex flex-col space-y-5">
      {/* Carousel Section */}
      <div className="carousel w-full">
        {stores.map((store, index) => (
          <div
            key={store.id}
            id={`item${index + 1}`}
            className={`carousel-item w-full ${
              index === currentStoreIndex ? "block" : "hidden"
            }`}
          >
            <div className="hero flex flex-col items-center justify-center">
              <div className="hero-content text-base-content flex-col lg:flex-row gap-8">
                <Image
                  src={store.image as string}
                  alt={store.name}
                  width={700}
                  height={500}
                  quality={100}
                  style={{
                    objectFit: "cover",
                    width: "700px",
                    height: "500px",
                  }}
                  className="rounded-lg shadow-2xl"
                />
                <div>
                  <h1 className="text-4xl font-bold">{store.name}</h1>
                  <p className="text-lg text-base-content">
                    <strong>Address: </strong>
                    {store.address}
                  </p>
                  <p className="text-lg text-base-content">
                    <strong>Modality: </strong>
                    {store.modality}
                  </p>
                  <h6 className="text-lg py-5">
                    <strong>Operating Hours:</strong>
                    {store.hours.length === 0 ? (
                      <p className="text-center">No operating hours available.</p>
                    ) : (
                      <table className="table table-sm bg-base-100 text-base-content max-w-96 rounded-md">
                        <thead>
                          <tr>
                            <th className="text-left">Weekday</th>
                            <th className="text-left">Open</th>
                            <th className="text-left">Close</th>
                          </tr>
                        </thead>
                        <tbody>
                          {store.hours.map((hour, index) => (
                            <tr key={index}>
                              <td className="font-bold">{hour.day}:</td>
                              <td>{hour.start_time}</td>
                              <td>{hour.end_time}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </h6>
                  <Link href={`/store/${store.id}`}>
                    <button className="btn btn-primary">Visit Store</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Navigation */}
      <div className="flex w-full justify-center gap-2">
        {pageNumbers.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              if (typeof item === "number") {
                setCurrentStoreIndex(item - 1);
              }
            }}
            className={`btn btn-xs ${
              typeof item === "number" && item - 1 === currentStoreIndex
                ? "btn-primary"
                : "btn-secondary"
            }`}
            disabled={typeof item !== "number"}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HighlightStores;
