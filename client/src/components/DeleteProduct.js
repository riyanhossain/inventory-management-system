import axios from "axios";
import React from "react";

export default function DeleteProduct({ product }) {
  const deleteProduct= async (id) => {
    try {
     await axios.delete(
        `http://localhost:5000/api/v1/products/delete-product/${id}`,
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
        onClick={() => deleteProduct(product._id)}
      >
        delete
      </button>
    </div>
  );
}