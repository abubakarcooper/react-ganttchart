import React, { useState } from "react";
import Logo from '../../../../images/worksheet/logo.svg'
import Upload from '../../../../images/Featured.svg'
import tick from '../../../../images/tick.png'
import del from '../../../../images/delete.png'
import img1 from '../../../../images/img1.png'
import img2 from '../../../../images/img2.png'
import img3 from '../../../../images/img3.png'
import img4 from '../../../../images/img4.png'
import ProgressBar from "@ramonak/react-progress-bar";
import Select from "react-select";
import { BsArrowReturnRight } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";

const TaskDetails = () => {
    return (
        <div className="space-y-4 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs md:text-sm font-semibold mb-1 text-black-2" >
                        Project Name
                    </label>
                    <div>
                        <Select
                            className="basic-single rounded-md"
                            isClearable={false}
                            isSearchable={true}
                            isMulti={false}
                            name="Submittal Name"
                            placeholder="--------------------"
                            components={{
                                IndicatorSeparator: () => null,
                            }}
                            // value={{}}
                            styles={{
                                input: (base) => ({
                                    ...base,
                                    "input:focus": {
                                        boxShadow: "none",
                                    },
                                }),
                                control: (base) => ({
                                    ...base,
                                    background: "#ffff",
                                    transition: "none",
                                    fontSize: "12px",
                                }),
                            }}
                            options={[{ label: 'Cooper Build', value: '' }]}
                        // onChange={(value) => handleChangeDeliverables(value)}
                        />
                    </div>

                </div>
                <div class="">
                    <label class="block  text-xs md:text-sm font-semibold mb-1 text-black-2" >
                        Project Supervisor
                    </label>
                    <div>
                        <Select
                            className="basic-single rounded-md"
                            isClearable={false}
                            isSearchable={true}
                            name="projectSuperVisor"
                            placeholder="--------------------"
                            components={{
                                IndicatorSeparator: () => null,
                            }}
                            // value={{}}
                            styles={{
                                input: (base) => ({
                                    ...base,
                                    "input:focus": {
                                        boxShadow: "none",
                                    },
                                }),
                                control: (base) => ({
                                    ...base,
                                    background: "#ffff",
                                    transition: "none",
                                    fontSize: "12px",
                                }),
                            }}
                            options={[{ label: 'Cooper Build', value: '' }]}
                        // onChange={(value) => handleChangeDeliverables(value)}
                        />
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold mt-6 text-black-2 text-black-2">Subject</label>
                <input
                    type="text"
                    placeholder="--------------------"
                    className="mt-1 block w-full  border-gray-300 shadow-sm rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 "
                />
            </div>



            <div className="grid grid-cols-1 sm:grid-cols-2 mt-2 md:grid-cols-3 gap-4">
                <div>
                    <label className="text-sm font-semibold text-black-2">
                        Date
                    </label>
                    <input
                        type="date"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                </div>
                <div>
                    <label className="text-sm font-semibold text-black-2">
                        Reference
                    </label>
                    <input
                        type="text"
                        placeholder="--------------------"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                </div>
                <div>
                    <label className="text-sm font-semibold text-black-2">
                        Temperature and Weather
                    </label>
                    <input
                        type="text"
                        placeholder="--------------------"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                </div>
            </div>


        </div>
    );
};

const Workerdetails = () => {
    return (
        <div className="space-y-4 mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs md:text-sm font-semibold mb-1  text-black-2" >
                        Worker Name
                    </label>
                    <div>
                        <Select
                            className="basic-single rounded-md"
                            isClearable={false}
                            isSearchable={true}
                            isMulti={false}
                            name="projectSuperVisor"
                            placeholder="--------------------"
                            components={{
                                IndicatorSeparator: () => null,
                            }}
                            // value={{}}
                            styles={{
                                input: (base) => ({
                                    ...base,
                                    "input:focus": {
                                        boxShadow: "none",
                                    },
                                }),
                                control: (base) => ({
                                    ...base,
                                    background: "#ffff",
                                    transition: "none",
                                    fontSize: "12px",
                                }),
                            }}
                            options={[{ label: 'Cooper Build', value: '' }]}
                        // onChange={(value) => handleChangeDeliverables(value)}
                        />
                    </div>

                </div>
                <div class="">
                    <label class="block  text-xs md:text-sm font-semibold mb-1  text-black-2" >
                        Designation
                    </label>
                    <div>
                        <Select
                            className="basic-single rounded-md"
                            isClearable={false}
                            isSearchable={true}
                            isMulti={false}
                            name="projectSuperVisor"
                            placeholder="--------------------"
                            components={{
                                IndicatorSeparator: () => null,
                            }}
                            // value={{}}
                            styles={{
                                input: (base) => ({
                                    ...base,
                                    "input:focus": {
                                        boxShadow: "none",
                                    },
                                }),
                                control: (base) => ({
                                    ...base,
                                    background: "#ffff",
                                    transition: "none",
                                    fontSize: "12px",
                                }),
                            }}
                            options={[{ label: 'Cooper Build', value: '' }]}
                        // onChange={(value) => handleChangeDeliverables(value)}
                        />
                    </div>
                </div>
            </div>

            <div>

                <button
                    className="rounded-[5px] text-[16px] border mt-2 border-[#143965] bg-black py-[20px] px-[16px] h-[32px] w-full text-[#143965] font-bold flex items-center justify-center"
                >
                    <FaPlus className="mr-2" /> Add Worker
                </button>


            </div>


        </div>
    )
}

const Completedtaskdetails = () => {
    const [selectedStatus, setSelectedStatus] = useState("Completed");

    return (
        <div className="space-y-4 mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                <div>
                    <label className="text-black-2 text-sm font-semibold">
                        Task Name
                    </label>
                    <input
                        type="text"
                        placeholder="--------------------"
                        className="text-black-2  mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                </div>
                <div>
                    <label className="text-black-2  text-sm font-semibold">
                        Equipment Used
                    </label>
                    <input
                        type="text"
                        placeholder="--------------------"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                </div>

            </div>
            <div>
                <label className="text-sm font-semibold text-black-2 ">
                    Any Report/incident
                </label>
                <input
                    type="text"
                    placeholder="--------------------"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                <div>
                    <label className="text-black-2 text-sm font-semibold">
                        Completion Percentage
                    </label>
                    <input
                        type="text"
                        placeholder="--------------------"
                        className="text-black-2  mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                </div>
                <div className="">
                    <label className="text-black-2  text-sm font-semibold">
                        Task Status
                    </label>
                    <div className="border mt-1 border rounded py-1.5 px-2">
                        <StatusRadioButtons
                            selectedStatus={selectedStatus}
                            onChange={setSelectedStatus}
                        />
                    </div>
                </div>

            </div>

            <div>
                <label className="block text-sm font-semibold mt-6 text-black-2">Progress Detail</label>
                <textarea
                    className="mt-2 text-gray-1 block w-full border border-[#2F3C461A] focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    rows="4"
                ></textarea>
            </div>

            <div>

                <button
                    className="rounded-[5px] text-[16px] border mt-2 border-[#143965] bg-black py-[20px] px-[16px] h-[32px] w-full text-[#143965] font-bold flex items-center justify-center"
                >
                    <FaPlus className="mr-2" /> Add More Tasks
                </button>

            </div>

        </div>
    )
}

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

const TaskForm = () => {
    const [selectedStatus, setSelectedStatus] = useState("Completed");

    return (
        <>
            <div className="">
                {/* <div className="border border-gray-0 rounded-lg p-2 border sm:p-4"> */}
                <div className="">

                    <div className="projectGroup">
                        <div className="flex justify-between mb-4 pt-2.5 px-2.5 pl-0 rounded-md">
                            <p className="font-bold text-lg text-black-0">Project Details</p>
                        </div>
                        <hr className="bg-slate-200	h-px " />
                        <TaskDetails />
                    </div>

                    <div className="project_description mt-8">
                        <div className="flex justify-between mb-4 pt-2.5 px-2.5 pl-0 rounded-md">
                            <p className="font-bold text-lg text-black-0">Description</p>
                        </div>
                        <hr className="bg-slate-200	h-px " />

                        <label className="block text-sm font-semibold mt-6 text-black-2">Describe Today`s Progress</label>
                        <textarea
                            className="mt-2 text-gray-1 block w-full border border-[#2F3C461A] focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            rows="4"
                        ></textarea>
                    </div>

                    <div className="work_detail mt-8">
                        <div className="flex justify-between mb-4 pt-2.5 px-2.5 pl-0 rounded-md">
                            <p className="font-bold text-lg text-black-0">Worker  Details</p>
                        </div>
                        <hr className="bg-slate-200	h-px " />
                        <Workerdetails />
                    </div>

                    <div className="project_description mt-8">
                        <div className="flex justify-between mb-4 pt-2.5 px-2.5 pl-0 rounded-md">
                            <p className="font-bold text-lg text-black-0">Completed Task Details</p>
                        </div>
                        <hr className="bg-slate-200	h-px " />
                        <Completedtaskdetails />
                    </div>

                    <div className="project_attachment">
                        <div className="flex justify-between mb-4 pt-2.5 px-2.5 pl-0 rounded-md">
                            <p className=" font-bold text-lg pb-2 mt-6 mb-2">Progress Attachements</p>
                        </div>
                        <hr className="bg-slate-200	h-px " />

                        <p className='block text-sm font-semibold mb-2 mt-6'>Upload Photo</p>
                        <div className="relative rounded-lg border shadow">
                            <div className="flex items-center justify-between border-gray-0 p-4 md:p-5 rounded-t">
                                <span>
                                    <h3 className="font-jakarta text-[16px] font-bold leading-[24px] text-[#2F3C46] tracking-[-0.01em] text-left">
                                        Lets get this letter knocked out, fast!!!
                                    </h3>

                                    {/* <p className='font-medium text-sm  text-gray-1'>Upload the letter you recieved  in the mail (take a photo with your mobile or save to your desktop)!</p> */}
                                </span>
                            </div>

                            <div className="flex items-center justify-center w-full p-4 pt-2 md:p-5">
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
                                {/* <div className='flex justify-end mr-5'>
                                <button className='bg-primary-0 py-2 px-14  text-white-0 my-4 text-base w-[152px] rounded-md'>Done</button>
                            </div> */}
                            </div>

                        </div>
                    </div>




                </div>
            </div>

        </>
    );
};

const TaskFormDPR = ({ setIsEditOpen, isEditOpen }) => {
    return (
        <>
            <div className="flex justify-between mx-5 mb-2 items-center">
                <div>
                    <img src={Logo} />
                </div>
                <h2 className="text-2xl text-primary-0 font-extrabold px-3 py-2">
                    Daily Progress Form
                </h2>
                <div>
                    <label className="block text-sm font-semibold mt-6 text-black-2 text-black-2">Date</label>
                    <input
                        type="date"
                        placeholder=""
                        className="mt-1 block w-full  border-gray-300 shadow-sm rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 h-[44px] w-[350px]"
                    />
                </div>
            </div>
            <div className="gantt-chart bg-white-2 mx-5 p-3  border-transparent rounded-lg">
                <div>
                    <TaskForm />
                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            onClick={() => setIsEditOpen(!isEditOpen)}
                            className="px-8 sm:px-14 py-2 text-sm font-semibold text-primary-0 bg-gray-100 rounded-lg border border-primary-0 w-[152px]">
                            Cancel
                        </button>
                        <button
                            className="px-8 sm:px-14 py-2 text-sm font-semibold text-white-2 bg-primary-0 rounded-lg w-[152px]">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TaskFormDPR;