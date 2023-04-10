// import React from "react";
// import Form from "../UI/Form";
// import GeneralDescForm from "./GeneralDescForm";

// const EditCollectionForm = () => {
//   return (
//     <Form Title={"Edit collection"}>
//       <GeneralDescForm />
//     </Form>
//   );
// };

// export default EditCollectionForm;
import React, { useState } from "react";
import Form from "../UI/Form";
import EditForm from './EditForm'
import { useDispatch, useSelector } from "react-redux";
import CancelIcon from "../../Assets/Icons/CancelIcon";
import { UIActions } from "../../store/redux-store/UI-slice";


const EditCollectionForm = ({ id, setIsOpen }) => {
  const collection = useSelector((collection) => collection.collection.collections.filter((item) => item._id === id)[0]);
  const dispatch = useDispatch();
  const hideFormHandler = (evt) => {
    evt.preventDefault();
    setIsOpen((prev) => !prev)
  };
  return (
    // <Form Title={"Edit collection"} setIsOpen={setIsOpen}>
    //   <EditForm setIsOpen={setIsOpen} id={id} Policy={Policy} suplyTime={suplyTime} artboardTitle={artboardTitle} artName={artistName} location={location} />
    // </Form>
    <div className="w-11/12 max-w-[680px] bg-[#1A1D27] max-h-form pb-5 px-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  mx-auto text-white rounded-[10px] overflow-y-auto grid gap-y-5 font-[Inter]">
    <header className="text-white flex items-center justify-between sticky top-0 bg-[#1A1D27] py-5">
      <p className=" text-xl capitalize ">Edit collection</p>
      <button onClick={hideFormHandler}>
        <CancelIcon />
      </button>
    </header>
    <main>
      <EditForm id={id} setIsOpen={setIsOpen} collection={collection}/>
    </main>
  </div>
  );
};

export default EditCollectionForm;
