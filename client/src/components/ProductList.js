import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteProduct from "./DeleteProduct";
import UpdateProduct from "./UpdateProduct";

export default function ProductList() {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/products/products-list",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setProduct(response.data.products);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProductList();
  }, [product]);
  return (
    <div>
      <table className="border-black border-2 w-full">
        <thead>
          <tr>
            <th className="border-black border-2 p-2">Name</th>
            <th className="border-black border-2 p-2">Price</th>
            <th className="border-black border-2 p-2">Category</th>
            <th className="border-black border-2 p-2">Description</th>
            <th className="border-black border-2 p-2" colSpan={2}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
        {product &&
          product.map(pd => (
              <tr className="border-black border-2" key={pd._id}>
                <td className="border-black border-2 p-2">{pd.name}</td>
                <td className="border-black border-2 p-2">{pd.price}</td>
                <td className="border-black border-2 p-2">{pd.category}</td>
                <td className="border-black border-2 p-2 whitespace-pre-wrap">
                  {pd.description}
                </td>
                <td className="border-black border-2 p-2">
                    <DeleteProduct product={pd}/>
                </td>
                <td className="border-black border-2 p-2">
                    <UpdateProduct product={pd}/>
                </td>
              </tr>
            
          ))}
          </tbody>
      </table>
    </div>
  );
}
