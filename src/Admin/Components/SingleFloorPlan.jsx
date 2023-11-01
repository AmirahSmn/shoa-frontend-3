import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

function SingleFloorPlan({ setFloorplans, plan, index }) {
  const { id } = useParams();
  console.log("PropertyID", id);

  const convertBase64Floorplan = (file) => {
    return new Promise((resolve, reject) => {
      const filesReader = new FileReader();
      filesReader.readAsDataURL(file);

      filesReader.onload = () => {
        resolve(filesReader.result);
      };

      filesReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadSingleFloorplan = async (event) => {
    // setLoading(true);
    const files = event.target.files;
    const maxSizeInBytes = 500 * 1024; // 500KB

    if (files && files[0].size > maxSizeInBytes) {
      alert(
        "File size exceeds the maximum allowed limit (500KB). Please choose a smaller file."
      );
      event.target.value = null; // Reset the input field
    } else {
      const base64 = await convertBase64Floorplan(files[0]);
      base64 && console.log("converted");

      try {
        const res = await axios.patch(
          `${import.meta.env.VITE_API}/api/property/floorplan/${id}`,
          { id: plan.id, image: base64 },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("respomse edot", res);

        setFloorplans((prev) =>
          prev.map((item, idx) => (idx === index ? res.data.floorPlan : item))
        );
      } catch (err) {
        console.log("There is an error", err);
      }

      // setLoading(false);
      // setFinished(true);
    }
  };

  function handlePlanUpdate() {
    // for (let i = 0; i < floorplans.length; i++) {
    //   const plan = floorPlans[i];
    //   console.log("plan", plan);
    // console.log("id", id);
  }

  return (
    <div>
      <div className="flex items-center gap-x-3">
        <p className="text-lg">Update Floor Plan</p>
        <input type="file" onChange={uploadSingleFloorplan} name="" id="" />
      </div>
    </div>
  );
}

export default SingleFloorPlan;
