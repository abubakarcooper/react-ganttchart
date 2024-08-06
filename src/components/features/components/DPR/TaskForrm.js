import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDropzone } from 'react-dropzone'
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
import { FaPlus, FaTrash, FaMinus } from "react-icons/fa6";
import { useForm, Controller, useFieldArray } from "react-hook-form"
import validationMessages from "../../../../constant/formError";
import { FaRegFilePdf } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { getApi } from "../../../../apis/estimatesheet";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { firebaseStorage } from "../../../../apis/firebase";

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


const TaskDetails = ({ projectList, subcontractorsList, errors, register, control }) => {
    return (
        <div className="space-y-4 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs md:text-sm font-semibold mb-1 text-black-2">Project Name</label>
                    <Controller
                        name="Project_Name"
                        control={control}
                        rules={{ required: "Project Name is required" }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                className="basic-single rounded-md"
                                isClearable={false}
                                isSearchable={true}
                                isMulti={false}
                                placeholder="--------------------"
                                components={{ IndicatorSeparator: () => null }}
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
                                options={projectList}
                            />
                        )}
                    />
                    {errors.Project_Name && (
                        <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                            {errors.Project_Name.message}
                        </p>
                    )}
                </div>
                <div>
                    <label className="block text-xs md:text-sm font-semibold mb-1 text-black-2">Project Supervisor</label>
                    <Controller
                        name="Project_Supervisor"
                        control={control}
                        rules={{ required: "Project Supervisor is required" }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                className="basic-single rounded-md"
                                isClearable={false}
                                isSearchable={true}
                                isMulti={false}
                                placeholder="--------------------"
                                components={{ IndicatorSeparator: () => null }}
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
                                options={subcontractorsList}
                            />
                        )}
                    />
                    {errors.Project_Supervisor && (
                        <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                            {errors.Project_Supervisor.message}
                        </p>
                    )}
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold mb-1 text-black-2">Subject</label>
                <input
                    type="text"
                    {...register("Subject_field", {
                        required: "Subject is required",
                        minLength: {
                            value: 5,
                            message: "Subject must be at least 5 characters long"
                        },
                        maxLength: {
                            value: 20,
                            message: "Subject cannot exceed 20 characters"
                        }
                    })}
                    placeholder="--------------------"
                    className="mt-1 block w-full border-gray-300 shadow-sm rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                {errors.Subject_field && (
                    <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                        {errors.Subject_field.message}
                    </p>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 mt-2 md:grid-cols-3 gap-4">
                <div>
                    <label className="text-sm font-semibold text-black-2">Issue Date</label>
                    <input
                        type="date"
                        {...register("Issue_Date", { required: "Issue Date is required" })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    {errors.Issue_Date && (
                        <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                            {errors.Issue_Date.message}
                        </p>
                    )}
                </div>
                <div>
                    <label className="text-sm font-semibold text-black-2">Reference</label>
                    <input
                        type="text"

                        {...register("Reference", {
                            required: "Reference is required",
                            minLength: {
                                value: 5,
                                message: "Reference must be at least 5 characters long"
                            },
                        })}
                        placeholder="--------------------"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    {errors.Reference && (
                        <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                            {errors.Reference.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="text-sm font-semibold text-black-2">Temperature and Weather</label>
                    <input
                        type="number"
                        step="any"
                        {...register("Temperature_and_Weather", {
                            required: "Temperature and Weather is required",
                            validate: value =>
                                !isNaN(value) && Number(value) >= 0 ? true : "Please enter a valid decimal number"
                        })}
                        placeholder="--------------------"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    {errors.Temperature_and_Weather && (
                        <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                            {errors.Temperature_and_Weather.message}
                        </p>
                    )}
                </div>
                {/* <div>
                    <label className="text-sm font-semibold text-black-2">Temperature and Weather</label>
                    <input
                        type="number"
                        {...register("Temperature_and_Weather", { required: "Temperature and Weather is required" })}
                        placeholder="--------------------"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    {errors.Temperature_and_Weather && (
                        <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                            {errors.Temperature_and_Weather.message}
                        </p>
                    )}
                </div> */}
            </div>
        </div>
    );
};


const Workerdetails = ({ control, errors }) => {
    const { fields: workers, append, remove } = useFieldArray({
        control,
        name: 'workers'
    });


    return (
        <div className="space-y-4 mt-6">
            {workers.map((field, index) => (
                <div key={field.id} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs md:text-sm font-semibold mb-1 text-black-2">Worker Name</label>
                        <Controller
                            name={`workers[${index}].workerName`}
                            control={control}
                            rules={{ required: "Worker Name is required" }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    className="basic-single rounded-md"
                                    isClearable={false}
                                    isSearchable={true}
                                    isMulti={false}
                                    placeholder="--------------------"
                                    components={{ IndicatorSeparator: () => null }}
                                    styles={{
                                        input: (base) => ({ ...base, "input:focus": { boxShadow: "none" } }),
                                        control: (base) => ({ ...base, background: "#ffff", transition: "none", fontSize: "12px" })
                                    }}
                                    options={[{ label: 'Cooper Build', value: '' }]}
                                />
                            )}
                        />
                        {errors.workers?.[index]?.workerName && (
                            <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                                {errors.workers[index].workerName.message}
                            </p>
                        )}
                        {
                            index > 0 &&
                            <div className="flex justify-end mt-2">
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="text-red-600 hover:text-red-800 flex items-center"
                                >
                                    <FaTrash className="mr-1" /> Remove
                                </button>
                            </div>
                        }
                    </div>
                    <div>
                        <label className="block text-xs md:text-sm font-semibold mb-1 text-black-2">Designation</label>
                        <Controller
                            name={`workers[${index}].designation`}
                            control={control}
                            rules={{ required: "Designation is required" }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    className="basic-single rounded-md"
                                    isClearable={false}
                                    isSearchable={true}
                                    isMulti={false}
                                    placeholder="--------------------"
                                    components={{ IndicatorSeparator: () => null }}
                                    styles={{
                                        input: (base) => ({ ...base, "input:focus": { boxShadow: "none" } }),
                                        control: (base) => ({ ...base, background: "#ffff", transition: "none", fontSize: "12px" })
                                    }}
                                    options={[{ label: 'Cooper Build', value: '' }]}
                                />
                            )}
                        />
                        {errors.workers?.[index]?.designation && (
                            <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                                {errors.workers[index].designation.message}
                            </p>
                        )}
                    </div>


                </div>
            ))}

            <div>
                <button
                    type="button"
                    onClick={() => append({ workerName: '', designation: '' })}
                    className="rounded-[5px] text-[16px] border mt-2 border-[#143965] bg-black py-[20px] px-[16px] h-[32px] w-full text-[#143965] font-bold flex items-center justify-center"
                >
                    <FaPlus className="mr-2" /> Add Worker
                </button>
            </div>
        </div>
    );
};


const Completedtaskdetails = ({ control, errors, setValue, watch }) => {
    const { append, remove } = useFieldArray({
        control,
        name: 'tasks'
    });

    const tasks = watch('tasks')
    const handleStatusChange = (index, status) => {
        console.log(status, 'status')
        setValue(`tasks.${index}.status`, status, { shouldValidate: true }); // Add shouldValidate if needed
    };

    console.log(tasks, 'tasks')

    return (
        <div className="space-y-4 mt-6">
            {tasks.map((field, index) => (
                <div key={field.id} className="border p-4 rounded-md mb-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs md:text-sm font-semibold mb-1 text-black-2">Task Name</label>
                            <Controller
                                name={`tasks[${index}].taskName`}
                                control={control}
                                rules={{ required: "Task Name is required" }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        className="basic-single rounded-md"
                                        isClearable={false}
                                        isSearchable={true}
                                        isMulti={false}
                                        placeholder="--------------------"
                                        components={{ IndicatorSeparator: () => null }}
                                        styles={{
                                            input: (base) => ({ ...base, "input:focus": { boxShadow: "none" } }),
                                            control: (base) => ({ ...base, background: "#ffff", transition: "none", fontSize: "12px" })
                                        }}
                                        options={[{ label: 'Cooper Build', value: '' }]}
                                    />
                                )}
                            />
                            {errors.tasks?.[index]?.taskName && (
                                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                                    {errors.tasks[index].taskName.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="text-black-2 text-sm font-semibold">Equipment Used</label>
                            <Controller
                                name={`tasks[${index}].equipmentUsed`}
                                rules={{ required: "Equipment Used is required" }}
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        placeholder="--------------------"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                )}
                            />
                            {errors.tasks?.[index]?.equipmentUsed && (
                                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                                    {errors.tasks[index].equipmentUsed.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-black-2">Any Report/Incident</label>
                        <Controller
                            name={`tasks[${index}].reportIncident`}
                            control={control}
                            rules={{ required: "ReportIncident is required" }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="text"
                                    placeholder="--------------------"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                />
                            )}
                        />
                        {errors.tasks?.[index]?.reportIncident && (
                            <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                                {errors.tasks[index].reportIncident.message}
                            </p>
                        )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-black-2 text-sm font-semibold">Completion Percentage</label>
                            <Controller
                                name={`tasks[${index}].completionPercentage`}
                                control={control}
                                rules={{ required: "Completion Percentage is required" }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        placeholder="--------------------"
                                        className="text-black-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                )}
                            />
                            {errors.tasks?.[index]?.completionPercentage && (
                                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                                    {errors.tasks[index].completionPercentage.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="text-black-2 text-sm font-semibold">Task Status</label>
                            <div className="border mt-1 border rounded py-1.5 px-2">
                                <div className="flex space-x-1 sm:space-x-2">
                                    {statuses.map((status) => (
                                        <label
                                            key={status.label}
                                            className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-full cursor-pointer 
                                                ${field.status === status.label
                                                    ? "bg-primary-0 text-white-1"
                                                    : `${status.color} ${status.textColor}`
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name={`tasks[${index}].status`}
                                                value={status.label}
                                                checked={field.status === status.label}
                                                onChange={() => handleStatusChange(index, status.label)}
                                                className="opacity-0"
                                            />
                                            {status.label}
                                        </label>
                                    ))}

                                </div>
                            </div>
                            {errors.tasks?.[index]?.status && (
                                <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                                    {errors.tasks[index].status.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mt-6 text-black-2">Progress Detail</label>
                        <Controller
                            name={`tasks[${index}].progressDetail`}
                            control={control}
                            // rules={{ required: "ProgressDetail is required" }}

                            render={({ field }) => (
                                <textarea
                                    {...field}
                                    className="mt-2 text-gray-1 block w-full border border-[#2F3C461A] focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    rows="4"
                                ></textarea>
                            )}
                        />
                        {errors.tasks?.[index]?.progressDetail && (
                            <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                                {errors.tasks[index].progressDetail.message}
                            </p>
                        )}
                    </div>
                    {
                        index > 0 &&
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className="mt-2 text-sm text-red-500 flex items-center"
                        >
                            <FaMinus className="mr-2" /> Remove Task
                        </button>
                    }

                </div>
            ))
            }

            <button
                type="button"
                onClick={() => append({})}
                className="rounded-[5px] text-[16px] border mt-2 border-[#143965] bg-black py-[20px] px-[16px] h-[32px] w-full text-[#143965] font-bold flex items-center justify-center"
            >
                <FaPlus className="mr-2" /> Add More Tasks
            </button>
        </div >
    );
};


const TaskFormDPR = ({ setIsEditOpen, isEditOpen, subcontractorsList, projectList, formLoading }) => {
    const [fileInfo, setFileInfo] = useState([]);
    const [progressMap, setProgressMap] = useState({});
    const progressBarColors = ['#479960', 'rgb(63, 165, 233)'];
    const dateInputRef = useRef(null);
    const [project, setProject] = useState(null)

    const { control, handleSubmit, register, formState: { errors, tasks }, setValue, watch } = useForm({
        defaultValues: {
            workers: [{ workerName: '', designation: '' }], // Initial values
            tasks: [{
                Description: '',
                completionPercentage: '',
                equipmentUsed: '',
                progressDetail: '',
                reportIncident: '',
                taskName: ''

            }], // Initial values

            Project_Name: '',
            Project_Supervisor: '',
            Subject_field: '',
            Issue_Date: '',
            Reference: '',
            Temperature_and_Weather: ''
        }
    });

    const watchedValues = watch();
    const projectName = watch(`Project_Name`);

    console.log(projectName, 'projectName')

    useEffect(() => {
        console.log('Form values changed:', watchedValues);
    }, [watchedValues]);

    useEffect(() => {
        if (dateInputRef.current) {
            const today = new Date().toISOString().split('T')[0];
            dateInputRef.current.value = today;
        }
    }, []);

    const prevProjectName = useRef();

    useEffect(() => {
        if (prevProjectName.current !== projectName.value) {
            prevProjectName.current = projectName.value;
            onChangeProjectData()

        }
    }, [projectName]);


    const onChangeProjectData = async () => {
        try {
            if (!project) {
                const dprReport = await getApi("Daily_Log_Report", `Project==${projectName.value}`);

                console.log(dprReport, 'dprReport')
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const onSubmit = (data) => {
        console.log(data, 'data')

    }


    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            const newFiles = acceptedFiles.map(file => ({
                name: file.name,
                size: file.size,
                src: URL.createObjectURL(file),
                progress: 0
            }));
            setFileInfo(prevFiles => [...prevFiles, ...newFiles]);
            newFiles.forEach(file => simulateUploadProgress(file));
        },
        accept: 'image/*,application/pdf',
        multiple: true
    });
    const simulateUploadProgress = (file) => {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            setProgressMap(prevMap => ({
                ...prevMap,
                [file.name]: progress
            }));
            if (progress >= 100) {
                clearInterval(interval);
            }
        }, 500);
    };
    const handleDelete = (fileName) => {
        setFileInfo(prevFiles => prevFiles.filter(file => file.name !== fileName));
        setProgressMap(prevMap => {
            const { [fileName]: _, ...rest } = prevMap;
            return rest;
        });
    };
    const getFileIcon = (file) => {
        const ext = file.name.split('.').pop().toLowerCase();
        if (ext === 'pdf') {
            return <FaRegFilePdf className='w-24 h-14 text-[#F40F02]' />;
        } else if (ext === 'doc' || ext === 'docx') {
            return <IoDocumentTextOutline className='w-24 h-14 text-[#0484F6]' />;
        } else if (['png', 'jpg', 'jpeg'].includes(ext)) {
            return <img src={file.src} alt='Uploaded Img' className='w-24 h-14 object-contain' />;
        } else {
            return null;
        }
    };


    return (
        <>
            <div className="mx-5 mb-2 bg-gray-5 rounded border">
                <div className="flex justify-between  p-2 items-center ">
                    <div>
                        <img src={Logo} />
                    </div>
                    <h2 className="text-3xl text-primary-0  px-3 py-2">
                        Daily Progress Form
                    </h2>
                    <div className="w-80">
                        <label className="block text-sm font-semibold mt-6 text-black-2 text-black-2">Date</label>
                        <input
                            type="date"
                            ref={dateInputRef}
                            disabled
                            placeholder=""
                            className="mt-1 block w-full  border-gray-300 shadow-sm rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 h-[44px] w-[350px]"
                        />
                    </div>
                </div>
            </div>
            <div className="gantt-chart bg-white-2 mx-5 p-3  border-transparent rounded-lg">
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="">
                            {/* <div className="border border-gray-0 rounded-lg p-2 border sm:p-4"> */}
                            <div className="">

                                <div className="projectGroup">
                                    <div className="flex justify-between mb-4 pt-2.5 px-2.5 pl-0 rounded-md">
                                        <p className="font-bold text-lg text-black-0">Project Details</p>
                                    </div>
                                    <hr className="bg-slate-200	h-px " />
                                    <TaskDetails projectList={projectList} subcontractorsList={subcontractorsList} errors={errors} register={register} control={control}
                                    />
                                </div>

                                <div className="project_description mt-8">
                                    <div className="flex justify-between mb-4 pt-2.5 px-2.5 pl-0 rounded-md">
                                        <p className="font-bold text-lg text-black-0">Description</p>
                                    </div>
                                    <hr className="bg-slate-200	h-px " />

                                    <label className="block text-sm font-semibold mt-6 text-black-2">Describe Today`s Progress</label>
                                    <textarea
                                        type="text"
                                        className="mt-2 text-gray-1 block w-full border border-[#2F3C461A] focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        rows="4"
                                        {...register("description", { required: "Description is required" })}
                                    ></textarea>
                                    {errors.description && (
                                        <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                                            {errors.description.message}
                                        </p>
                                    )}
                                </div>

                                <div className="work_detail mt-8">
                                    <div className="flex justify-between mb-4 pt-2.5 px-2.5 pl-0 rounded-md">
                                        <p className="font-bold text-lg text-black-0">Worker  Details</p>
                                    </div>
                                    <hr className="bg-slate-200	h-px " />
                                    <Workerdetails register={register} control={control} errors={errors} />
                                </div>

                                <div className="project_description mt-8">
                                    <div className="flex justify-between mb-4 pt-2.5 px-2.5 pl-0 rounded-md">
                                        <p className="font-bold text-lg text-black-0">Completed Task Details</p>
                                    </div>
                                    <hr className="bg-slate-200	h-px " />
                                    <Completedtaskdetails register={register} control={control} errors={errors} setValue={setValue} watch={watch} />
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
                                            <div
                                                {...getRootProps({ className: 'flex flex-col items-center justify-center w-full py-10 border-2 border-gray-0 rounded-lg cursor-pointer' })}
                                            >
                                                <input {...getInputProps({ id: 'dropzone-file' })} />
                                                <div className="flex flex-col items-center justify-center py-2">
                                                    <img src={Upload} alt="Upload" />
                                                    <p className="mb-2 text-gray-500 dark:text-gray-400 text-lg">
                                                        <span className="text-sm sm:text-lg font-semibold text-primary-0">
                                                            Click to upload
                                                        </span>{" "}
                                                        or drag and drop
                                                    </p>
                                                    <p className="text-md text-gray-500 dark:text-gray-400">
                                                        PDF, PNG, JPG
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className=''>
                                            {fileInfo.map((file, index) => (
                                                <div key={index} className='mx-5 p-4 sm:flex border border-gray-0 rounded-xl mb-3'>
                                                    <div className='w-1/2 flex items-center gap-4'>
                                                        {getFileIcon(file)}
                                                        <span>
                                                            <p className='sm:text-lg text-sm text-gray-2 font-bold'>{file.name}</p>
                                                            <p className='sm:text-md text-xs text-gray-1 font-semibold'>{Math.round(file.size / 1024)} KB</p>
                                                        </span>
                                                    </div>
                                                    <div className='sm:w-1/2 mt-3'>
                                                        <span className='flex gap-2 items-center'>
                                                            <p className='sm:text-md text-sm font-semibold sm:font-bold'>{progressMap[file.name] || 0}%</p>
                                                            <ProgressBar
                                                                completed={progressMap[file.name] || 0}
                                                                className="rounded-xl h-fit w-9/12 mt-2 "
                                                                barContainerClassName="bg-gray-200 rounded-xl"
                                                                labelClassName="label"
                                                                bgColor={progressBarColors[index % progressBarColors.length]}
                                                                height='7px'
                                                            />
                                                            {progressMap[file.name] === 100 && <img src={tick} alt='done' className='h-4 mt-1' />}
                                                            <img src={del} onClick={() => handleDelete(file.name)} alt='delete' className='ml-4 h-4 mt-1 cursor-pointer' />
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}

                                            {/* <div className='flex justify-end mr-5'>
                                <button className='bg-primary-0 py-2 px-14  text-white-0 my-4 text-base w-[152px] rounded-md'>Done</button>
                            </div> */}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
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
                    </form>
                </div>
            </div>
        </>
    );
};

export default TaskFormDPR;