import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDropzone } from 'react-dropzone'
import Logo from '../../../../images/worksheet/logo.svg'
import Upload from '../../../../images/Featured.svg'
import tick from '../../../../images/tick.png'
import del from '../../../../images/delete.png'
import ProgressBar from "@ramonak/react-progress-bar";
import Select from "react-select";
import { BsArrowReturnRight } from "react-icons/bs";
import { FaPlus, FaTrash, FaMinus } from "react-icons/fa6";
import { useForm, Controller, useFieldArray } from "react-hook-form"
import validationMessages from "../../../../constant/formError";
import { FaRegFilePdf } from "react-icons/fa";
import { MdOndemandVideo } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { getApi, addRecord } from "../../../../apis/estimatesheet";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { firebaseStorage } from "../../../../apis/firebase";
import { toast } from "react-toastify";
import ganttMessage from "../../../../constant/ganttMessage";
import moment from "moment/moment";
import BeatLoader from "react-spinners/BeatLoader";
import { generateUniqueReference } from "../../../../utils/func";
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

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};


// supervisorList={supervisorList}
const TaskDetails = ({ projectList, supervisorList, errors, register, control, supervisorSearchLoading }) => {
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
                                isLoading={supervisorSearchLoading}
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
                                options={supervisorList}
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
                            value: 20,
                            message: "Subject must be at least 20 characters long"
                        },
                        maxLength: {
                            value: 250,
                            message: "Subject cannot exceed 250 characters"
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
                            // required: "Temperature and Weather is required",
                            maxLength: {
                                value: 3,
                                message: "Temperature maximum limit 3 digit long"
                            },
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


const Workerdetails = ({ control, errors, subcontractorList, subcontractorsSearchLoading, getSearchAllContacts }) => {
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
                                    isLoading={subcontractorsSearchLoading}
                                    isClearable={false}
                                    isSearchable={true}
                                    isMulti={false}
                                    placeholder="--------------------"
                                    components={{ IndicatorSeparator: () => null }}
                                    styles={{
                                        input: (base) => ({ ...base, "input:focus": { boxShadow: "none" } }),
                                        control: (base) => ({ ...base, background: "#ffff", transition: "none", fontSize: "12px" })
                                    }}
                                    options={subcontractorList}
                                    onInputChange={(value) => {
                                        getSearchAllContacts(value)
                                    }}

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
                            // rules={{ required: "Designation is required" }}
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

const Completedtaskdetails = ({ control, errors, setValue, watch, tasksList, taskSearchLoading }) => {
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
                                        isLoading={taskSearchLoading}
                                        isClearable={false}
                                        isSearchable={true}
                                        isMulti={false}
                                        placeholder="--------------------"
                                        components={{ IndicatorSeparator: () => null }}
                                        styles={{
                                            input: (base) => ({ ...base, "input:focus": { boxShadow: "none" } }),
                                            control: (base) => ({ ...base, background: "#ffff", transition: "none", fontSize: "12px" })
                                        }}
                                        options={tasksList}
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
                                // rules={{ required: "Equipment Used is required" }}
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
                            // rules={{ required: "ReportIncident is required" }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="text"
                                    placeholder="--------------------"
                                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                />
                            )}
                        />
                        {/* {errors.tasks?.[index]?.reportIncident && (
                            <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                                {errors.tasks[index].reportIncident.message}
                            </p>
                        )} */}
                    </div>
                    <div className="grid grid-cols-1  lg:grid-cols-2 gap-4 mt-2">
                        <div>
                            <label className="text-black-2 text-sm font-semibold">Completion Percentage</label>
                            <Controller
                                name={`tasks[${index}].completionPercentage`}
                                control={control}
                                // rules={{
                                //     min: { value: 1, message: "Value must be at least 1" },
                                //     max: { value: 100, message: "Value must be at most 100" }
                                // }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="number"
                                        placeholder="--------------------"
                                        className="text-black-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        min="1"     // Minimum value is 1
                                        max="100"   // Maximum value is 100
                                        step="1"    // Optional: Increment by whole numbers
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
                            <label className="text-black-2 text-sm font-semibold mt-2">Task Status</label>
                            <div className="border mt-1 border rounded py-1.5 px-2">
                                <div className="flex flex-wrap gap-1">
                                    {statuses.map((status) => (
                                        <label
                                            key={status.label}
                                            className={`px-7 sm:px-3 py-1 text-sm font-medium rounded-full cursor-pointer 
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
                                                className="opacity-0 ml-[-17px]"
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
                            rules={{ required: "ProgressDetail is required" }}

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
        </div>
    );
};

const TaskFormDPR = ({ setIsEditOpen, isEditOpen, projectList, formLoading, getDprTableData, handleTaskModelOpen }) => {
    const progressBarColors = ['#479960', 'rgb(63, 165, 233)'];
    const dateInputRef = useRef(null);
    const [project, setProject] = useState(null)

    const [supervisorList, setSuperVisorList] = useState([]);
    const [subcontractorList, setSubcontractorsList] = useState([]);
    const [tasksList, setTasksList] = useState([]);

    const [workerSearchLoading, setWorkerSearchLoading] = useState(false);
    const [taskSearchLoading, setTaskSearchLoading] = useState(false);
    const [supervisorSearchLoading, setSupervisorLoading] = useState(false);
    const [subcontractorsSearchLoading, setSubcontractorsLoading] = useState(false);
    const [tasksSearchLoading, setTasksLoading] = useState(false);
    const [filesToUpload, setFilesToUpload] = useState([]);
    const [progressMap, setProgressMap] = useState({});
    const [fileInfo, setFileInfo] = useState([]);
    const [loading, setLoading] = useState(false);



    const { control, handleSubmit, register, formState: { errors, tasks }, setValue, watch, reset } = useForm({
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

    const prevProjectName = useRef();
    const watchedValues = watch();
    const projectName = watch(`Project_Name`);

    console.log(projectName, 'projectName')

    // useEffect(() => {
    //     console.log('Current form errors:', errors);
    // }, [errors]);

    // useEffect(() => {
    //     console.log('Form values changed:', watchedValues);
    // }, [watchedValues]);

    useEffect(() => {
        if (dateInputRef.current) {
            const today = new Date().toISOString().split('T')[0];
            dateInputRef.current.value = today;
        }
    }, []);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setValue('Reference', generateUniqueReference());
        setValue('Issue_Date', today);
        getAllContacts()
    }, [])

    useEffect(() => {
        if (prevProjectName.current !== projectName.value && projectName.value) {
            prevProjectName.current = projectName.value;
            getAllSupervisors()
            getAllProjectTasks()
        }
    }, [projectName]);

    useEffect(() => {
        console.log('Current progress map:', progressMap);
    }, [progressMap]);


    const getSearchedWorkers = async (value) => {
        setWorkerSearchLoading(true)
        try {
            const contacts = await getApi("All_Contacts", `Company_Name1.contains("${value}")`)
            setSubcontractorsList(
                subcontractorList?.length > 0 ? subcontractorList : []
            );
            setWorkerSearchLoading(false);
        }
        catch (err) {
            console.log(err)
            setWorkerSearchLoading(false);
            setValue('Project_Supervisor', null);
        }
    };

    const getAllSupervisors = async () => {
        try {
            setValue('Project_Supervisor', null);
            setSupervisorLoading(true)

            if (!project) {
                const dprReport = await getApi("Daily_Log_Report", `Project==${projectName.value}`);
                const list = dprReport?.map((d) => ({
                    label: d?.Employee_Name?.display_value,
                    value: d?.ID,
                }));

                setSuperVisorList(list)
                setSupervisorLoading(false)

                return
            }
            setSuperVisorList([])
            setSupervisorLoading(false)

        }
        catch (error) {
            console.log(error)
            setSupervisorLoading(false)
            setSuperVisorList([])
            setValue('Project_Supervisor', null);

        }
    }

    const getAllContacts = async () => {
        setSubcontractorsLoading(true);
        let data = [];

        try {
            const data = await getApi("All_Contacts");
            const list = data?.map((d) => ({
                label: d?.Contact_Name?.display_value,
                value: d?.ID,
            }));

            setSubcontractorsList(list);
            setSubcontractorsLoading(false);
        } catch (error) {
            console.error("Error fetching contacts:", error);
            setSubcontractorsList([]);
            setSubcontractorsLoading(false);
        }
    };

    const getSearchAllContacts = async (search) => {
        setSubcontractorsLoading(true);
        try {
            if (search) {
                const timeoutId = setTimeout(async () => {
                    const data = await getApi("All_Contacts", `Contact_Name.contains("${search}")`);
                    const list = data?.map((d) => ({
                        label: d?.Contact_Name?.display_value,
                        value: d?.ID,
                    }));

                    setSubcontractorsList(list?.length ? list : []);
                }, 1500);

                return () => {
                    setSubcontractorsLoading(false);
                    clearTimeout(timeoutId)
                };
            } else {
                setSubcontractorsLoading(false);

            }
        } catch (error) {
            console.error("Error fetching contacts:", error);
            setSubcontractorsList([]);
            setSubcontractorsLoading(false);
        }
    }

    // const getAllContacts = async (search = '') => {
    //     try {
    //         // setValue('Project_Supervisor', null);
    //         setSubcontractorsLoading(true)
    //         let data = []

    //         if (search) {
    //             const timeoutId = setTimeout(async () => {
    //                 const data = await getApi("All_Contacts", `Contact_Name.contains("${search}")`)
    //                 const list = data?.map((d) => ({
    //                     label: d?.Contact_Name?.display_value,
    //                     value: d?.ID,
    //                 }));

    //                 setSubcontractorsList(list?.length ? list : [])
    //                 setSubcontractorsLoading(false)
    //             }, 100);

    //             return () => {
    //                 clearTimeout(timeoutId);
    //                 setSubcontractorsLoading(false);
    //             };
    //         } else {
    //             const data = await getApi("All_Contacts");
    //             const list = data?.map((d) => ({
    //                 label: d?.Contact_Name?.display_value,
    //                 value: d?.ID,
    //             }));

    //             setSubcontractorsList(list)
    //             setSubcontractorsLoading(false)
    //         }



    //         // setSuperVisorList(list)
    //         // setSupervisorLoading(false)

    //         // setSuperVisorList([])
    //         // setSupervisorLoading(false)

    //     }
    //     catch (error) {
    //         console.log(error)
    //         setSubcontractorsLoading(false)
    //         // setSupervisorLoading(false)
    //         // setSuperVisorList([])
    //         // setValue('Project_Supervisor', null);

    //     }
    // }

    const getAllProjectTasks = async () => {
        setValue('Project_Supervisor', null);
        setTaskSearchLoading(true)
        try {
            if (!project) {
                var criteria = 'Project.ID==' + projectName.value
                const allTasks = await getApi("Project_Deliverable_Task_Report", criteria);

                console.log(allTasks, 'allTasks')
                const list = allTasks?.map((d) => ({
                    label: d?.Task_Name1,
                    value: d?.ID,
                    ...d
                }));
                setTasksList(list)
                setTaskSearchLoading(false)
                return
            }
            setTaskSearchLoading(false)

            // setSupervisorLoading(false)
        }
        catch (error) {
            console.log(error)
            setTaskSearchLoading(false)
        }
    }

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            console.log(acceptedFiles, 'acceptedFiles')

            const newFiles = acceptedFiles.map(file => ({
                name: file.name,
                size: file.size,
                src: URL.createObjectURL(file),
                progress: 0
            }));
            setFileInfo(prevFiles => [...prevFiles, ...newFiles]);
            setFilesToUpload(prev => {
                return [
                    ...prev,
                    ...acceptedFiles
                ]
            })
            // newFiles.forEach(file => simulateUploadProgress(file));
        },
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
            'application/pdf': ['.pdf'],
            'video/*': ['.mp4', '.mov', '.avi', '.mkv'],
            'application/msword': ['.doc', '.docx'],
        },
        multiple: true
    });

    const uploadFilesToFirebase = async (files) => {
        if (!files || files.length === 0) {
            console.error('No files provided for upload');
            return toast.error(ganttMessage.NO_FILES);
        }


        const uploadPromises = files.map(file => {
            const storageRef = ref(firebaseStorage, `DPR/${file.name}`);


            const uploadTask = uploadBytesResumable(storageRef, file);

            return new Promise((resolve, reject) => {
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        console.log(snapshot.bytesTransferred, 'snapshot.bytesTransferred ');
                        console.log(snapshot.totalBytes, 'snapshot.totalBytes ');
                        const progress = ((snapshot.bytesTransferred || 0) / (snapshot.totalBytes || 0)) * 100;
                        // console.log(progress, 'progress')
                        // setProgressMap(prevMap => ({
                        //     ...prevMap,
                        //     [file.name]: progress
                        // }));
                        simulateUploadProgress(file)
                    },
                    (err) => {
                        console.error("Error uploading file:", err);
                        reject(err);
                    },
                    async () => {
                        try {
                            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                            console.log("File available at", downloadURL);
                            resolve(downloadURL);
                        } catch (error) {
                            console.error("Error retrieving download URL:", error);
                            reject(error);
                        }
                    }
                );
            });
        });

        return Promise.all(uploadPromises)
            .then(downloadURLs => {
                console.log("All files uploaded successfully:", downloadURLs);
                return downloadURLs;
            })
            .catch(error => {
                console.error("Error uploading files:", error);
                throw error;
            });
    };

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
        setFilesToUpload(prevFiles => prevFiles.filter(file => file.path !== fileName));

        setProgressMap(prevMap => {
            const { [fileName]: _, ...rest } = prevMap;
            return rest;
        });
    };

    const getFileIcon = (file) => {
        const ext = file.name.split('.').pop().toLowerCase();
        if (ext === 'pdf') {
            return <FaRegFilePdf className='w-24 h-14 text-[#F40F02]' />;
        }
        else if (ext === 'mp4' || ext === 'mov' || ext === 'avi' || ext === 'mkv') {
            return <MdOndemandVideo className='w-24 h-14 text-[#F40F02]' />
        }
        else if (ext === 'doc' || ext === 'docx') {
            return <IoDocumentTextOutline className='w-24 h-14 text-[#0484F6]' />;
        } else if (['png', 'jpg', 'jpeg'].includes(ext)) {
            return <img src={file.src} alt='Uploaded Img' className='w-24 h-14 object-contain' />;
        } else {
            return null;
        }
    };


    const addWorkerDataReq = async (object) => {
        const id = object?.id || null;
        const payload = object
        try {
            const data = await addRecord(payload,
                "All_Worker_Details",
                "Worker_Details");
            return data;
        } catch (error) {
            console.log("error", error);
            toast.error(ganttMessage.WENT_WRONG);
        }
    };

    const addFilesDataReq = async (payload) => {
        try {
            const data = await addRecord(payload,
                "Progress_Attachements_Report",
                "Progress_Attachements");
            return data;
        } catch (error) {
            console.log("error", error);
            toast.error(ganttMessage.WENT_WRONG);
        }
    };

    const addTaskDataReq = async (payload) => {
        try {
            const data = await addRecord(payload,
                "All_Task_Details",
                "Completed_Task_Details");
            return data;
        } catch (error) {
            console.log("error", error);
            toast.error(ganttMessage.WENT_WRONG);
        }
    };

    const onSubmit = async (formData) => {

        try {

            console.log(filesToUpload, 'filesToUpload Report/Incident')
            setLoading(true)
            const projectDetail = {
                Project_Name: formData?.Project_Name?.value,
                Project_Supervisor: "1556703000046292323" || formData?.Project_Supervisor?.value,
                Description: formData?.description
            }

            const {
                Subject_field,
                Issue_Date,
                Reference,
                Temperature_and_Weather,
                description,
            } = formData


            const obj1 = {
                Subject_field,
                Issue_Date: moment(Issue_Date).format('MM-DD-YYYY'),
                Reference,
                Temperature_and_Weather,
                description,
                ...projectDetail,
            }

            const dprFormData = await addRecord(obj1,
                "All_Daily_Progress",
                "Daily_Progress_Form");


            let urls = ''
            if (fileInfo?.length) {
                urls = await uploadFilesToFirebase(filesToUpload);
                const urlsPromises = urls.map(async (url) => {
                    await addFilesDataReq({ Upload_Photo_URL: url, Daily_Progress_Form: dprFormData.ID })
                });

                await Promise.all(urlsPromises);
            }

            const workerPromises = formData?.workers.map(async (object) => {
                await addWorkerDataReq({ Worker_Name: object.workerName.value, Designation: '', Daily_Progress_Form: dprFormData.ID })
            });

            await Promise.all(workerPromises);

            const taskPromises = formData?.tasks.map(async (object) => {
                await addTaskDataReq({
                    Task_Name: object.taskName.value,
                    Equipment_Used: object.equipmentUsed,
                    Any_Report_incident: object.reportIncident,
                    Completion_Percentage: object.completionPercentage,
                    Task_Status: object.status,
                    Daily_Progress_Form: dprFormData.ID
                })
            });

            await Promise.all(taskPromises);

            setLoading(false)
            toast.success(ganttMessage.DATA_SUBMITTED)
            getDprTableData()
            handleTaskModelOpen()
            reset()
            setFileInfo([]);
            setFilesToUpload([]);
        }
        catch (error) {
            setLoading(false)
            toast.error(ganttMessage.WENT_WRONG)
        }

    }

    console.log(filesToUpload, 'filesToUpload.filesToUpload')

    return (
        <>
            <div className="mx-0 sm:mx-5 mb-2 bg-gray-5 rounded border">
                <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0 items-center py-2 px-0 sm:px-2">
                    <div className=" sm:w-[27%]">
                        <img src={Logo} className="w-full"/>
                    </div>
                    <h2 className="text-xl md:text-2xl lg:text-3xl text-primary-0  px-0 sm:px-3 py-2">
                        Daily Progress Form
                    </h2>
                    {/* <div className="w-[70%] sm:w-56 lg:w-80  border border-red-300"> */}
                    <div className="w-[180px] sm:w-[30%]">
                        <label className="block text-sm font-semibold text-black-2">Date</label>
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
                                    <TaskDetails
                                        supervisorSearchLoading={supervisorSearchLoading}
                                        projectList={projectList}
                                        supervisorList={supervisorList}
                                        errors={errors}
                                        register={register}
                                        control={control}
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
                                        {...register("description", {
                                            required: "Description is required",
                                            minLength: {
                                                value: 10,
                                                message: "Description must be at least 20 characters long"
                                            },
                                            maxLength: {
                                                value: 1000,
                                                message: "Description cannot exceed 1000 characters"
                                            }

                                        })}
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
                                    <Workerdetails register={register} control={control} errors={errors} subcontractorList={subcontractorList} subcontractorsSearchLoading={subcontractorsSearchLoading} getSearchAllContacts={getSearchAllContacts} />
                                </div>

                                <div className="project_description mt-8">
                                    <div className="flex justify-between mb-4 pt-2.5 px-2.5 pl-0 rounded-md">
                                        <p className="font-bold text-lg text-black-0">Completed Task Details</p>
                                    </div>
                                    <hr className="bg-slate-200	h-px " />
                                    <Completedtaskdetails register={register} control={control} errors={errors} setValue={setValue} watch={watch} tasksList={tasksList} taskSearchLoading={taskSearchLoading} />
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
                                                        {/* <img src={file}></img> */}
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
                                onClick={handleTaskModelOpen}
                                className="px-8 sm:px-14 py-2 text-sm font-semibold text-primary-0 bg-gray-100 rounded-lg border border-primary-0 w-[152px]">
                                Cancel
                            </button>
                            <button
                                disabled={loading}
                                className="flex items-center gap-2 px-8 sm:px-14 py-2 text-sm font-semibold text-white-2 bg-primary-0 rounded-lg w-[152px]">
                                <span> Save</span>
                                {
                                    loading && <BeatLoader
                                        color={'#fff'}
                                        size={10}
                                    />
                                }

                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default TaskFormDPR;