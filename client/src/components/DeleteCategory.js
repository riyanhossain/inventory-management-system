import axios from "axios";
import React from "react";

export default function DeleteCategory({ category }) {
  const deleteCategory = async (id) => {
    try {
     await axios.delete(
        `http://localhost:5000/api/v1/categories/delete-category/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <button
        className="w-28 py-2 bg-red-700 text-white font-semibold"
        onClick={() => deleteCategory(category._id)}
      >
        delete
      </button>
    </div>
  );
}
