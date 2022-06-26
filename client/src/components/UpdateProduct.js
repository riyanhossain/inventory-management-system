import { Modal } from "antd";
import axios from "axios";
import React, { useState } from "react";

export default function UpdateProduct({product}) {
  const [inputs, setInputs] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleInputs = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    try{
        const response = await axios.patch(
            `http://localhost:5000/api/v1/products/update-product/${product._id}`,
            inputs,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
    }
    catch(err){
        console.log(err);
    }
    setIsModalVisible(false);
  };
  return (
    <div>
      <button
        className="w-28 py-2 bg-yellow-600 text-white font-semibold"
        onClick={() => {
          showModal();
          setInputs({
            id: product._id,
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
          });
        }}
      >
        update
      </button>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <div className="flex flex-col justify-center items-center bg-white shadow-lg">
          <div className="w-10/12 flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold">Update Product</h1>
            <br />
            <form
              className="flex flex-col justify-center items-center w-full gap-y-8"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                placeholder="name"
                className="w-full bg-[#F0F2F3] p-2"
                autoComplete="name"
                required
                name="name"
                onChange={handleInputs}
                value={inputs.name}
              />
              <input
                type="number"
                placeholder="price"
                className="w-full bg-[#F0F2F3] p-2"
                autoComplete="name"
                required
                name="price"
                onChange={handleInputs}
                value={inputs.price}
              />
                <input
                type="text"
                placeholder="category"
                className="w-full bg-[#F0F2F3] p-2"
                required
                name="category"
                value={inputs.category}
                disabled
              />
              <textarea
                type="text"
                placeholder="description"
                className="w-full bg-[#F0F2F3] p-2"
                autoComplete="name"
                rows={6}
                required
                name="description"
                onChange={handleInputs}
                value={inputs.description}
              />
              <input
                type="submit"
                value="Update"
                className="w-full bg-[#029FAE] p-2 font-semibold text-white"
              />
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}