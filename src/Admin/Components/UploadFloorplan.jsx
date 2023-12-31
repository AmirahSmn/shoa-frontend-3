import React, { useState, useEffect } from "react";

function UploadFloorplan({ floorplans, setFloorplans }) {
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    finished
      ? setTimeout(() => {
          setFinished(false);
        }, 4000)
      : null;
  }, [finished]);

  // const convertBase64Floorplan = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(file);

  //     fileReader.onload = () => {
  //       resolve(fileReader.result);
  //     };

  //     fileReader.onerror = (error) => {
  //       reject(error);
  //     };
  //   });
  // };

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

  function uploadSingleImage(base64) {
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_API}/api/property/floorplan`, {
        image: base64,
      })
      .then((res) => {
        setUrl(res.data);
        alert("Image uploaded Succesfully");
      })
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  }

  function uploadMultipleImages(images) {
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_API}/uploadMultipleImages`, { images })
      .then((res) => {
        setUrl(res.data);
        alert("Image uploaded Succesfully");
      })
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  }

  const uploadImage = async (event) => {
    const files = event.target.files;
    console.log(files.length);

    if (files.length === 1) {
      const base64 = await convertBase64(files[0]);
      uploadSingleImage(base64);
      return;
    }

    const base64s = [];
    for (var i = 0; i < files.length; i++) {
      var base = await convertBase64(files[i]);
      base64s.push(base);
    }
    uploadMultipleImages(base64s);
  };

  // const uploadFloorplan = async (event) => {
  //   setLoading(true);
  //   const files = event.target.files;

  //   const base64 = await convertBase64Floorplan(files[0]);
  //   setFloorplans((prev) => [...prev, base64]);
  //   setLoading(false);
  //   setFinished(true);
  // };

  function UploadInputFloorplan() {
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
            multiple
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
            <p>Image uploading...</p>
          </div>
        ) : (
          <UploadInputFloorplan />
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

export default UploadFloorplan;
