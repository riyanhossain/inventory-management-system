import {  Modal } from "antd";
import axios from "axios";
import React, { useState } from "react";

export default function AddProduct({category}) {
  const [inputs, setInputs] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleInputs = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value, category: category.name });
  };
  const createProduct = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/v1/products/create-product",
        inputs,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct();
    setIsModalVisible(false);
  };
  return (
    <div>
      <button
        className="w-28 py-2 bg-green-700 text-white font-semibold"
        onClick={showModal}
      >
        Add Product
      </button>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <div className="flex flex-col justify-center items-center bg-white shadow-lg">
          <div className="w-10/12 flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold">Add Product</h1>
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
                autoComplete="name"
                required
                name="category"
                value={category.name}
                readOnly
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
                value="Add"
                className="w-full bg-[#029FAE] p-2 font-semibold text-white"
              />
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}
