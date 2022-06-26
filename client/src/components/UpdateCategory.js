import { Modal } from "antd";
import axios from "axios";
import React, { useState } from "react";

export default function UpdateCategory({category}) {
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
    const response = await axios.patch(
      "http://localhost:5000/api/v1/categories/update-category",
      inputs,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setIsModalVisible(false);
  };
  return (
    <div>
      <button
        className="w-28 py-2 bg-yellow-600 text-white font-semibold"
        onClick={() => {
          showModal();
          setInputs({
            id: category._id,
            name: category.name,
            description: category.description,
          });
        }}
      >
        update
      </button>{" "}
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <div className="flex flex-col justify-center items-center bg-white shadow-lg">
          <div className="w-10/12 flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold">Update Category</h1>
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
