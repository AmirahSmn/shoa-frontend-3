import React, { useEffect } from "react";
import { useState } from "react";
import assets from "../../assets/assets.gif";
import axios from "axios";

export default function UploadImage({ image, setImage }) {
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    finished
      ? setTimeout(() => {
          setFinished(false);
        }, 4000)
      : null;
  }, [finished]);

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadImage = async (event) => {
    setLoading(true);
    const file = event.target.files;

    const maxSizeInBytes = 500 * 1024; // 500KB
    if (file && file[0].size > maxSizeInBytes) {
      alert(
        "File size exceeds the maximum allowed limit (500KB). Please choose a smaller file."
      );
      event.target.value = null; // Reset the input field
    } else {
      const base64 = await convertBase64(file[0]);
      setImage(base64);
      setFinished(true);
    }
    setLoading(false);
  };

  function UploadInput() {
    return (
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              aria-hidden="true"
              className="w-10 h-10 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              WebP, PNG, or JPG (MAX. 500KB)
            </p>
          </div>
          <input
            onChange={uploadImage}
            id="dropzone-file"
            type="file"
            className="hidden"
          />
        </label>
      </div>
    );
  }

  return (
    <div className="flex justify-center flex-col m-8 relative">
      <div>
        {loading ? (
          <div className="flex items-center justify-center">
            <p>Uploading image...</p>
          </div>
        ) : (
          <UploadInput />
        )}
        <div className="flex gap-x-2 items-center justify-center mt-3 ">
          {finished && (
            <p className="absolute -bottom-8 bg-green-500 py-2 px-5 rounded-lg">
              Image uploaded
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
