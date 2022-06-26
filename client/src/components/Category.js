import { Button, Modal } from "antd";
import React, { useState } from "react";
import axios from "axios";
import CategoryList from "./CategoryList";

export default function Category() {
    const [inputs, setInputs] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
    };


    const handleInputs = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }
    const fetchCategory = async () => {
        try {
            const token = localStorage.getItem("token");
            console.log(typeof token);
            const response = await axios.post(
                "http://localhost:5000/api/v1/categories/create-category",
                inputs,{
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                }
            );
        } catch (error) {
            console.log(error);
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        fetchCategory();
        setIsModalVisible(false);
    }
  return (
    <div className="flex flex-col justify-center items-center">
      <Button type="primary" size={"large"} onClick={showModal}>
        New Category
      </Button>
      <Modal title="Basic Modal" visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
      <div className="flex flex-col justify-center items-center bg-white shadow-lg">
          <div className="w-10/12 flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold">Create</h1>
            <br />
            <form className="flex flex-col justify-center items-center w-full gap-y-8" 
            onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="name"
                className="w-full bg-[#F0F2F3] p-2"
                autoComplete="name"
                required
                name="name"
                onChange={handleInputs}
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
              />
              <input
                type="submit"
                value="Create"
                className="w-full bg-[#029FAE] p-2 font-semibold text-white"
              />
            </form>
          </div>
        </div>
      </Modal>
      <CategoryList/>
    </div>
  );
}
