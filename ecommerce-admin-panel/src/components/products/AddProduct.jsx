import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

import { useGlobalContext } from "../../../context";

const RepeatedBlock = () => {
  const {
    register,
    handleSubmit,
    formState: { error },
    reset,
  } = useForm();
  return (
    <div className="key-value-pair w-full flex gap-3">
      <div className="name-container">
        <label
          htmlFor="detail-name"
          className="block text-xs font-medium text-gray-700"
        >
          Name
        </label>

        <input
          {...register("key")}
          type="text"
          id="detail-name"
          placeholder="key name"
          className="mt-1 rounded-md w-[12rem] border-gray-200 shadow-sm sm:text-sm"
        />
      </div>
      <div className="value-container">
        <label
          htmlFor="detail-value"
          className="block text-xs font-medium text-gray-700"
        >
          Value
        </label>

        <input
          {...register("value")}
          type="text"
          id="detail-value"
          placeholder="value"
          className="mt-1 rounded-md w-[12rem] border-gray-200 shadow-sm sm:text-sm"
        />
      </div>
    </div>
  );
};

const AddProduct = () => {
  const [blocks, setBlocks] = useState([<RepeatedBlock key={0} />]);
  const { categories, brands, addProduct } = useGlobalContext();

  const {
    register,
    handleSubmit,
    formState: { error },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const { name, price, brand_name, category_name, images, stock_count } =
      data;

    const details = gatherDetails();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category_name", category_name);
    formData.append("details", JSON.stringify(details));
    formData.append("brand_name", brand_name);
    formData.append("stock_count", stock_count);

    [...images].forEach((img) => {
      formData.append("images", img);
    });

    const response = await axios.post(
      "http://localhost:8000/products",
      formData
    );

    addProduct(response.data.toBeSentDocument);
    toast.success("Product created successfully!");
    reset();
  };

  const gatherDetails = () => {
    const details = {};
    const keys = document.querySelectorAll("#detail-name");
    const values = document.querySelectorAll("#detail-value");
    for (let i = 0; i < keys.length; i++) {
      if (keys[i].value && values[i].value) {
        details[keys[i].value] = values[i].value;
      }
    }
    return details;
  };

  const handleRepeat = () => {
    setBlocks((prevBlocks) => [
      ...prevBlocks,
      <RepeatedBlock key={prevBlocks.length} />,
    ]);
  };

  return (
    <section className="w-[100%] flex justify-center items-center mt-[30px]">
      <article className="w-[80%]">
        <div className="max-w-lg">
          <h3 className="text-amber-700 text-xl font-bold sm:text-2xl">
            Add new product
          </h3>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form-container mt-[50px] flex flex-col gap-[2rem] justify-center items-center"
        >
          <article className="inputs flex flex-wrap gap-[4rem] justify-between">
            <div className="form-group">
              <label
                htmlFor="name"
                className="block text-xs font-medium text-gray-700"
              >
                Name
                {/* <span className="text-[red]"> *</span> */}
              </label>

              <input
                {...register("name")}
                type="text"
                id="name"
                placeholder="iPhone 8"
                className="mt-1 rounded-md w-[25rem] border-gray-200 shadow-sm sm:text-sm"
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="stock_count"
                className="block text-xs font-medium text-gray-700"
              >
                Stock Count
              </label>

              <input
                {...register("stock_count")}
                type="text"
                id="stock_count"
                placeholder="Number"
                className="mt-1 rounded-md w-[25rem] border-gray-200 shadow-sm sm:text-sm"
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="price"
                className="block text-xs font-medium text-gray-700"
              >
                Price
              </label>

              <input
                {...register("price")}
                type="text"
                id="price"
                placeholder="123.22 EGP"
                className="mt-1 rounded-md w-[25rem] border-gray-200 shadow-sm sm:text-sm"
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="brandName"
                className="block text-xs font-medium text-gray-700"
              >
                Brand
              </label>

              <select
                {...register("brand_name")}
                id="brandName"
                className="mt-1 w-[25rem] rounded-md border-gray-200 text-gray-700 sm:text-sm"
              >
                <option value="">Please select</option>
                {brands.map((brand) => {
                  return (
                    <option key={brand._id} value={brand.brand_name}>
                      {brand.brand_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <label
                htmlFor="category"
                className="block text-xs font-medium text-gray-700"
              >
                Category
              </label>

              <select
                {...register("category_name")}
                id="category"
                className="mt-1 w-[25rem] rounded-md border-gray-200 text-gray-700 sm:text-sm"
              >
                <option value="">Please select</option>
                {categories.map((category) => {
                  return (
                    <option key={category._id} value={category.category_name}>
                      {category.category_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <label
                htmlFor="images"
                className="block text-xs font-medium text-gray-700"
              >
                Images
              </label>

              <input
                {...register("images")}
                multiple
                type="file"
                id="images"
                className="mt-1 rounded-md w-[25rem] border-gray-200 shadow-sm sm:text-sm"
              />
            </div>
            <div className="w-full h-[1px] bg-[#eee]"></div>
            <div className="w-full text-amber-700 text-md sm:text-2xl">
              Product Details:
            </div>
            <div className="form-group flex flex-wrap gap-3 items-center">
              {blocks}
              <button
                onClick={() => handleRepeat()}
                type="button"
                className="inline-block mt-[18px] h-[38px] px-4 text-white duration-150 font-medium bg-amber-600 rounded-lg hover:bg-amber-700 active:bg-amber-700 md:text-sm"
              >
                Add Detail
              </button>
            </div>
          </article>
          <div className="my-[30px]">
            <button className="inline-block px-4 py-2 text-white duration-150 font-medium bg-amber-600 rounded-lg hover:bg-amber-700 active:bg-amber-700 md:text-sm">
              Add Product
            </button>
          </div>
        </form>
      </article>
    </section>
  );
};

export default AddProduct;
