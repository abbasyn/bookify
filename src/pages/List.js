import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, number, mixed, InferType } from "yup";
import { storage, useFirebase } from "../context/firebase";

const Listing = () => {
  const schema = object({
    bookname: string().required("Book is Required"),
    bookcode: number().min(4).required("Book Code is Required"),
    bookprice: number().required("Book price is Required"),
    bookimage: mixed().test(
      "fileRequired",
      "Must contain a file",
      (value) => value && value[0] instanceof File
    ),
  });

  const firebase = useFirebase();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log("Add Books to the Store...", data);

    const result = await firebase
      .createNewListing(
        data.bookname,
        data.bookprice,
        data.bookcode,
        data.bookimage[0]
      )
      .then((book) => console.log("Book added to Store Successfully"))
      .catch((error) => console.error(error.message));
    console.log("Successfully", result);
  };

  return (
    <div className="bg-yellow-100 h-screen overflow-hidden flex items-center justify-center">
      <div className="bg-white lg:w-6/12 md:7/12 w-8/12 shadow-3xl">
        <div className="bg-blue-400 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-4 md:p-8">
          <p>Listing Books</p>
        </div>
        <form className="p-12 md:p-24" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center text-lg mb-6 md:mb-2">
            <input
              type="text"
              id="bookname"
              {...register("bookname")}
              className="bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full"
              placeholder="Enter Book Name..."
            />
          </div>
          <p className="mb-6 text-red-600">{errors.bookname?.message}</p>

          <div className="flex items-center text-lg mb-6 md:mb-2">
            <input
              type="number"
              id="bookcode"
              className="bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full"
              placeholder="Enter Book Code ..."
              {...register("bookcode")}
            />
          </div>
          <p className="mb-6 text-red-600">{errors.bookcode?.message}</p>

          <div className="flex items-center text-lg mb-6 md:mb-2">
            <input
              type="number"
              id="price"
              className="bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full"
              placeholder="Enter Book Price ..."
              {...register("bookprice")}
            />
          </div>
          <p className="mb-6 text-red-600">{errors.bookprice?.message}</p>

          <div className="flex items-center text-lg mb-6 md:mb-2">
            <input
              type="file"
              name="bookname"
              id="bookimage"
              className="bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full"
              placeholder="Book Cover Image"
              {...register("bookimage")}
            />
          </div>
          <p className="mb-6 text-red-600">{errors.bookimage?.message}</p>

          {errors.exampleRequired && <span>This field is required</span>}

          <button
            type="submit"
            disabled={errors.length > 0}
            className="bg-gradient-to-b from-gray-700 to-blue-400 font-medium p-2 md:p-4 text-white uppercase w-full"
          >
            ADD BOOK
          </button>
        </form>
      </div>
    </div>
  );
};

export default Listing;
