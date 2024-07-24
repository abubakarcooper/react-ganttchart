import React, { useState } from "react";
import Upload from "../images/Featured.svg";
import Img1 from "../images/img1.png";
import Add from "../images/Add.png";
import Cross from "../images/cross.png";

const TaskViewDetails = ({ handleTaskModelOpen, isTaskModal, setIsEditOpen }) => {
    return (
        <>
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 ">
                <h2 className="text-md md:text-lg xl:text-xl 2xl:text-2xl font-extrabold mb-3 md:mb-0 ">
                    Deliverable Name: Site Preparation
                </h2>
                <label className="px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-full cursor-pointer bg-primary-0 text-white-0" >
                    Completed
                </label>

            </div>
            <div className="border border-gray-0 rounded-lg">

                <div className="bg-white p-4 rounded-lg ">

                    <h3 className="text-lg font-semibold mb-2">Task Details</h3>
                    <div className="shadow rounded-lg p-4">
                        <label className="block text-sm font-semibold mb-3">
                            Images{" "}
                        </label>
                        <div className="flex flex-wrap gap-3 ">
                            {
                                [1, 2, 3].map(item => <div className=" h-24 w-36 rounded-lg relative ">
                                    <img
                                        src={Img1}
                                        alt="Sample"
                                        className=" w-full h-full object-cover rounded-lg  "
                                    />
                                    <img className="absolute -top-2 -right-3 object-cover w-1/5" src={Cross} alt="icon" />
                                </div>)
                            }


                            <div className="h-24 w-36 flex flex-col  items-center justify-center bg-gray-200 rounded-lg cursor-pointer">
                                <img className="object-cover w-1/4" src={Add} alt="Add" />
                                <span className="text-gray-600">Add Img</span>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="flex justify-between shadow items-center border rounded-md p-4">
                            <span className="text-base font-semibold">Task Name</span>
                            <span className="text-base font-semibold text-gray-1 cursor-pointer">
                                General Requirements
                            </span>
                        </div>
                        <div className="flex justify-between shadow items-center border rounded-md p-4">
                            <span className="text-base font-semibold">
                                Task Type
                            </span>
                            <span className="text-base font-semibold text-gray-1 cursor-pointer">
                                Selected Type here
                            </span>
                        </div>
                        <div className="flex justify-between shadow items-center border rounded-md p-4">
                            <span className="text-base font-semibold">
                                Schedule Start Date
                            </span>
                            <span className="text-base font-semibold text-gray-1">
                                11/03/2023
                            </span>
                        </div>
                        <div className="flex justify-between shadow items-center border rounded-md p-4">
                            <span className="text-base font-semibold">
                                Schedule End Date
                            </span>
                            <span className="text-base font-semibold text-gray-1">
                                11/03/2023
                            </span>
                        </div>
                        <div className="flex justify-between shadow items-center border rounded-md p-4">
                            <span className="text-base font-semibold">
                                Actual Start Date
                            </span>
                            <span className="text-base font-semibold text-gray-1">
                                11/03/2023
                            </span>
                        </div>
                        <div className="flex justify-between shadow items-center border rounded-md p-4">
                            <span className="text-base font-semibold">
                                Actual End Date
                            </span>
                            <span className="text-base font-semibold text-gray-1">
                                11/03/2023
                            </span>
                        </div>
                    </div>
                    <div className="shadow rounded-lg p-4 my-4">
                        <label className="block text-base font-semibold mb-1">
                            Description
                        </label>
                        <p className="text-gray-1 text-sm font-normal min-h-22">
                            paragraphs are the building blocks of papers. Many
                            students define paragraphs in terms of length: a paragraph
                            is a group of at least five sentences, a paragraph is half
                            a page long, etc. In reality, though, the unity and
                            coherence of ideas among sentences is what constitutes a
                            paragraph.Paragraphs are the building blocks of papers.
                            Many students define paragraphs in terms of length: a
                            paragraph is a group of at least five sentences, a
                            paragraph is half a page long, etc. In reality, though,
                            the unity and coherence of ideas among sentences is what
                            constitutes a paragraph.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 my-4">
                        <div className="shadow-md rounded-md p-4">
                            <h4 className="text-base font-bold ">
                                Estimated Duration
                            </h4>
                            <p className="text-primary-0 font-medium flex items-center gap-2 mt-1">
                                <span className="text-5xl">12</span>
                                <span className="text-2xl text-gray-1 font-bold">Days</span>
                            </p>
                        </div>
                        <div className="shadow-md rounded-md p-4">
                            <h4 className="text-base font-bold">Actual Duration</h4>
                            <p className="text-primary-0 font-medium flex items-center gap-2 mt-1">
                                <span className="text-5xl">18</span>
                                <span className="text-2xl text-gray-1 font-bold">Days</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
                <button
                    onClick={() => setIsEditOpen(true)}
                    className="px-8 sm:px-14 py-2 text-sm font-semibold text-primary-0 bg-gray-100 rounded border border-primary-0 w-[152px]">
                    Edit
                </button>
                <button
                    onClick={handleTaskModelOpen}
                    className="px-8 sm:px-14 py-2 text-sm font-semibold text-white-2 bg-primary-0 rounded w-[152px]">
                    Close
                </button>
            </div>
        </>
    );
}
export default TaskViewDetails;