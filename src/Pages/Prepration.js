import React, { useState } from "react";
import Upload from '../images/Featured.svg'
import tick from '../images/tick.png'
import del from '../images/delete.png'
import img1 from '../images/img1.png'
import img2 from '../images/img2.png'
import img3 from '../images/img3.png'
import img4 from '../images/img4.png'
import ProgressBar from "@ramonak/react-progress-bar";

const TaskDetails = () => {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-1 text-xs md:text-sm font-semibold">
                        Task Name
                    </label>
                    <input
                        type="text"
                        className="mt-1 block w-full  border-gray-300 shadow-sm rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 "
                        placeholder="general requirements"
                    />
                </div>
                <div class="">
                    <label class="block text-gray-1 text-xs md:text-sm font-semibold" >
                        Task Type
                    </label>
                    <select id="countries"
                        class="mt-1 block w-full text-gray-1  border-gray-300 shadow-sm rounded-md  focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 "
                    >
                        <option selected>Choose a Task Type</option>
                        <option value="US">2 days</option>
                        <option value="CA">3 days</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                    <label className="text-gray-1 text-sm font-semibold">
                        Schedule Start
                    </label>
                    <input
                        type="date"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                </div>
                <div>
                    <label className="text-gray-1 text-sm font-semibold">
                        Schedule End
                    </label>
                    <input
                        type="date"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                </div>
                <div>
                    <label className="text-gray-1 text-sm font-semibold">
                        Actual Start
                    </label>
                    <input
                        type="date"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                </div>
                <div>
                    <label className="text-gray-1 text-sm font-semibold">
                        Actual End
                    </label>
                    <input
                        type="date"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                </div>
            </div>
        </div>
    );
};

const TaskDescription = () => {
    return (
        <div>
            <label className="block text-sm font-semibold mt-6">Description</label>
            <textarea
                className="mt-1 text-gray-1 block w-full border border-[#2F3C461A] focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                rows="4"
            ></textarea>
        </div>
    );
};


const TaskDuration = () => {
    return (
        <div className="grid grid-cols-2 gap-4 my-4">
            <div className="shadow-md rounded-md p-4">
                <h4 className="text-base font-bold ">Estimated Duration</h4>
                <div className="flex items-center">
                    <span className="text-xl sm:text-4xl text-primary-0 font-bold ">
                        12
                    </span>
                    <span className="text-lg sm:text-2xl text-gray-1">Days</span>
                </div>
            </div>
            <div className="shadow-md rounded-md p-4">
                <h4 className="text-base font-bold">Actual Duration</h4>

                <div className="flex items-center">
                    <span className="text-xl sm:text-4xl text-primary-0 font-bold ">
                        18
                    </span>
                    <span className="text-lg sm:text-2xl text-gray-1">Days</span>
                </div>
            </div>
        </div>
    );
};

const StatusRadioButtons = ({ selectedStatus, onChange }) => {
    console.log(selectedStatus);
    const statuses = [
        {
            label: "Completed",
            color: "bg-[#821DBD1A]",
            textColor: "text-[#821DBD]",
        },
        {
            label: "InProgress",
            color: "bg-[#FFD36333]",
            textColor: "text-[#E38127]",
        },
        { label: "Paused", color: "bg-[#EA4E4E1A]", textColor: "text-[#EA4E4E]" },
        { label: "Pending", color: "bg-[#821DBD1A]", textColor: "text-[#821DBD]" },
    ];

    return (
        <div className="flex space-x-1 sm:space-x-2">
            {statuses.map((status) => (
                <label
                    key={status.label}
                    className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-full cursor-pointer ${selectedStatus === status.label
                        ? "bg-primary-0 text-white-1"
                        : `${status.color} ${status.textColor}`
                        }`}
                >
                    <input
                        type="radio"
                        name="status"
                        value={status.label}
                        checked={selectedStatus === status.label}
                        onChange={(e) => onChange(e.target.value)}
                        className="sr-only"
                    />
                    {status.label}
                </label>
            ))}
        </div>
    );
};


const Preparation = () => {
    const [selectedStatus, setSelectedStatus] = useState("Completed");

    return (
        <>

            <div className="">
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 ">
                    <h2 className="text-md md:text-lg xl:text-xl 2xl:text-2xl font-extrabold mb-3 md:mb-0 ">
                        Deliverable Name: Site Preparation
                    </h2>
                    <StatusRadioButtons
                        selectedStatus={selectedStatus}
                        onChange={setSelectedStatus}
                    />
                </div>
                <div className="border border-gray-0 rounded-lg p-2 sm:p-4">
                    <p className=" font-bold text-lg pb-2">Task Details</p>
                    <TaskDetails />
                    <TaskDescription />
                    <p className='block text-sm font-semibold mb-2 mt-6'>Upload Photo</p>
                    <div className="relative rounded-lg shadow">
                        <div className="flex items-center justify-between boeder border-gray-0 p-4 md:p-5 rounded-t">
                            <span>
                                <h3 className="block text-sm font-bold">
                                    Lets get this letter knocked out, fast!!!
                                </h3>
                                <p className='font-medium text-sm  text-gray-1'>Upload the letter you recieved  in the mail (take a photo with your mobile or save to your desktop)!</p>
                            </span>
                        </div>

                        <div className="flex items-center justify-center w-full p-4 md:p-5">
                            <label
                                for="dropzone-file"
                                class="flex flex-col items-center justify-center w-full py-10 border-2 border-gray-0 rounded-lg cursor-pointer "
                            >
                                <div class="flex flex-col items-center justify-center py-2">
                                    <img src={Upload} alt="Upload" />
                                    <p class="mb-2 text-gray-500 dark:text-gray-400 text-lg">
                                        <span class=" text-sm sm:text-lg font-semibold text-primary-0">
                                            Click to upload
                                        </span>{" "}
                                        or drag and drop
                                    </p>
                                    <p class="text-md text-gray-500 dark:text-gray-400">
                                        PDF, PNG, JPG
                                    </p>
                                </div>
                                <input id="dropzone-file" type="file" class="hidden" />
                            </label>
                        </div>
                        <div className=''>
                            <div className='mx-5 p-4  sm:flex border border-gray-0 rounded-xl mb-3'>
                                <div className='w-1/2 flex gap-4'>
                                    <img src={img1} alt='Img' className='' />
                                    <span>
                                        <p className='sm:text-lg text-sm text-gray-2 font-bold'>Fidelity Collections.pdf</p>
                                        <p className='sm:text-md  text-xs text-gray-1 font-semibold'>200 KB</p>
                                    </span>
                                </div>
                                <div className='sm:w-1/2 mt-3'>

                                    <span className='flex gap-2'>
                                        <p className='sm:text-md text-sm font-semibold sm:font-bold'>100%</p>
                                        <ProgressBar
                                            completed={80}
                                            className="rounded-xl h-fit w-9/12 mt-2 "
                                            barContainerClassName="bg-gray-200 rounded-xl"
                                            completedClassName="barCompleted1"
                                            labelClassName="label"
                                        />
                                        <img src={tick} alt='done' className='h-4 mt-1' />
                                        <img src={del} alt='delete' className='ml-4 h-4 mt-1' />
                                    </span>

                                </div>
                            </div>
                            <div className='mx-5 p-4  sm:flex border border-gray-0 rounded-xl mb-3'>
                                <div className='w-1/2 flex gap-4'>
                                    <img src={img2} alt='Img' className='' />
                                    <span>
                                        <p className='sm:text-lg text-sm text-gray-2 font-bold'>Fidelity Collections.pdf</p>
                                        <p className='sm:text-md  text-xs text-gray-1 font-semibold'>200 KB</p>
                                    </span>
                                </div>
                                <div className='sm:w-1/2 mt-3'>

                                    <span className='flex gap-2'>
                                        <p className='sm:text-md text-sm font-semibold sm:font-bold'>70%</p>
                                        <ProgressBar
                                            completed={70}
                                            className="rounded-xl h-fit w-9/12 mt-2 "
                                            barContainerClassName="bg-gray-200 rounded-xl"
                                            completedClassName="barCompleted2"
                                            labelClassName="label"
                                        />
                                        <img src={tick} alt='done' className='h-4 mt-1 hidden' />
                                        <img src={del} alt='delete' className='ml-12 h-4 mt-1' />
                                    </span>

                                </div>
                            </div>
                            <div className='mx-5 p-4  sm:flex border border-gray-0 rounded-xl mb-3'>
                                <div className='w-1/2 flex gap-4'>
                                    <img src={img3} alt='Img' className='' />
                                    <span>
                                        <p className='sm:text-lg text-sm text-gray-2 font-bold'>Fidelity Collections.pdf</p>
                                        <p className='sm:text-md  text-xs text-gray-1 font-semibold'>200 KB</p>
                                    </span>
                                </div>
                                <div className='sm:w-1/2 mt-3'>

                                    <span className='flex gap-2'>
                                        <p className='sm:text-md text-sm font-semibold sm:font-bold'>100%</p>
                                        <ProgressBar
                                            completed={80}
                                            className="rounded-xl h-fit w-9/12 mt-2 "
                                            barContainerClassName="bg-gray-200 rounded-xl"
                                            completedClassName="barCompleted1"
                                            labelClassName="label"
                                        />
                                        <img src={tick} alt='done' className='h-4 mt-1' />
                                        <img src={del} alt='delete' className='ml-4 h-4 mt-1' />
                                    </span>

                                </div>
                            </div>
                            <div className='mx-5 p-4  sm:flex border border-gray-0 rounded-xl mb-3'>
                                <div className='w-1/2 flex gap-4'>
                                    <img src={img4} alt='Img' className='' />
                                    <span>
                                        <p className='sm:text-lg text-sm text-gray-2 font-bold'>Fidelity Collections.pdf</p>
                                        <p className='sm:text-md  text-xs text-gray-1 font-semibold'>200 KB</p>
                                    </span>
                                </div>
                                <div className='sm:w-1/2 mt-3'>

                                    <span className='flex gap-2'>
                                        <p className='sm:text-md text-sm font-semibold sm:font-bold'>50%</p>
                                        <ProgressBar
                                            completed={50}
                                            className="rounded-xl h-fit w-9/12 mt-2 "
                                            barContainerClassName="bg-gray-200 rounded-xl"
                                            completedClassName="barCompleted2"
                                            labelClassName="label"
                                        />
                                        <img src={tick} alt='done' className='h-4 mt-1 hidden' />
                                        <img src={del} alt='delete' className='ml-12 h-4 mt-1' />
                                    </span>

                                </div>
                            </div>
                            <div className='flex justify-end mr-5'>
                                <button className='bg-primary-0 py-2 px-14 rounded-lg text-white-0 my-4 text-base'>Done</button>
                            </div>
                        </div>

                    </div>
                    <TaskDuration />
                </div>

            </div>

        </>
    );
};

export default Preparation;