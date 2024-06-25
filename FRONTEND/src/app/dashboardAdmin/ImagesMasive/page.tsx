"use client";
import endPoints from "@/services/api";
import axios from "axios";
import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

import Image from "next/image";
import { ThreeDCard } from "../../../components/ThreeDCard";
import { useExcel } from "@/hooks/useExcel";
import { HiOutlineShoppingCart } from "react-icons/hi";

const ImagesMasive = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [dataResponse, setDataResponse] = useState();
  const { generateExcel } = useExcel();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedImages(Array.from(files));
    }
  };

  /////HANDLE
  const handleUpload = async () => {
    setLoading(true);
    const formData = new FormData();
    selectedImages.forEach((image) => {
      formData.append("images", image); // Adjust key name as needed for your API
    });

    try {
      const response = await axios.post(endPoints.files.addImages, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Required for file uploads
        },
      });

      console.log("Upload successful:", response.data);
      setDataResponse(response.data);
      // Handle success response from your server
      setLoading(false);
      if (response) {
        await generateExcel(response.data);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      // Handle upload errors gracefully
    }
  };

  return (
    <div className="image-uploader">
      {loading && (
        <>
          <span className="loading loading-spinner loading-lg"></span>
          <p>cargando... espere a que finalice la carga </p>
        </>
      )}

      <div className="image-uploader">
        <input type="file" multiple onChange={handleImageChange} />

        <button
          className="btn btn-circle btn-outline"
          onClick={handleUpload}
          disabled={selectedImages.length === 0}
        >
          <FaCloudUploadAlt style={{ fontSize: 25 }} />
        </button>

        {/* <ThreeDCard /> */}

        <div className="container mx-auto p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {selectedImages.length > 0 &&
              selectedImages.map((image, index) => (
                <div
                  className="card w-96 bg-base-100 shadow-xl m-4"
                  key={index}
                >
                  <figure>
                    <Image
                      src={URL.createObjectURL(image)}
                      alt="Shoes"
                      //layout="responsive"
                      width={600}
                      height={600}
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      demo
                      <div className="badge badge-secondary">demo</div>
                    </h2>
                    <p>demo</p>
                    <div className="card-actions justify-end">
                      <div className="badge badge-outline">demo</div>
                      <div className="badge badge-outline">category: demo</div>
                      <button className="btn btn-outline btn-accent" disabled>
                        <HiOutlineShoppingCart
                          style={{ height: "2rem", width: "2rem" }}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagesMasive;
