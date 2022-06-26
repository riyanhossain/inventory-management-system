import React, { useEffect, useState } from "react";
import axios from "axios";
import AddProduct from "./AddProduct";
import UpdateCategory from "./UpdateCategory";
import DeleteCategory from "./DeleteCategory";

export default function CategoryList() {
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/categories/category-list",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCategory(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, [category]);
  const { categories } = category;


  return (
    <div className="w-96">
      {isLoading && <div>Loading...</div>}
      <table className="border-black border-2 w-full">
        <thead>
          <tr>
            <th className="border-black border-2 p-2">Name</th>
            <th className="border-black border-2 p-2">Description</th>
            <th className="border-black border-2 p-2" colSpan={3}>
              Actions
            </th>
          </tr>
        </thead>
        {!isLoading &&
          categories.map((category) => (
            <tbody key={category._id}>
              <tr className="border-black border-2">
                <td className="border-black border-2 p-2">{category.name}</td>
                <td className="border-black border-2 p-2 whitespace-pre-wrap">
                  {category.description}
                </td>
                <td className="border-black border-2 p-2">
                  <DeleteCategory category={category}/>
                </td>
                <td className="border-black border-2 p-2">
                  <UpdateCategory category={category}/>
                </td>
                <td className="border-black border-2 p-2">
                  <AddProduct category={category}/>
                </td>
              </tr>
            </tbody>
          ))}
      </table>


    </div>
  );
}
