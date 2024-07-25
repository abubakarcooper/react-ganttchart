import Select from "react-select";
import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";

import {
    addRecord,
    getApi,
    getQueryParams,
    getRecordCount,
    updateAPI,
} from "../../../../../apis/estimatesheet";
// import TrashImage from "../../images/worksheet/trash.svg";
import DocumentModal from "./DocumentModal";
import DatePicker from "react-datepicker";
import moment from "moment";
import TrashImage from '../../../../../images/delete.png'
// import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { Spinner } from "flowbite-react";
import { IoAdd } from "react-icons/io5";




const Messages = {
    WENT_WRONG: "Something Went Wrong, Please try again",
    DATA_ADDED: "Data Added Successfully",
};

const columns = [
    "Revision",
    "Add Document",
    "Notes",
    "Status",
    "Create Date",
    "Take Action",
];

const SubmittalModal = ({
    submittalModalOpen,
    onSubmitalModalClose,
    deliverable = null,
    task = null,
    refetchData = () => { },
}) => {
    const [tradesList, setTradesList] = useState([]);
    const [selectedTrade, setSelectedTrade] = useState(null);
    const [submittalName, setSubmittalName] = useState("");
    const [submittalsTypeList, setSubmittalsTypeList] = useState([]);
    const [submittalsTypeInput, setSubmittalsTypeInput] = useState("");
    const [submittalsTypeLoading, setSubmittalsTypeLoading] = useState(false);
    const [selectedSubmittalsType, setSelectedSubmittalsType] = useState(null);
    const [deliverablesList, setDeliverablesList] = useState([]);
    const [deliverablesInput, setDeliverablesInput] = useState("");
    const [deliverablesLoading, setDeliverablesLoading] = useState(false);
    const [selectedDeliverable, setSelectedDeliverable] = useState(null);
    const [tasksList, setTasksList] = useState([]);
    const [selectedTasks, setSelectedTasks] = useState(null);
    const [autoEstimateNo, setAutoEstimateNo] = useState(null);
    const [projectsList, setProjectsList] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [drawingNo, setDrawingNo] = useState(0);
    const [tableData, setTableData] = useState([{
        revision: null,
        document: null,
        notes: "",
        status: null,
        date: new Date(),
    }]);
    const [documentsList, setDocumentsList] = useState([]);
    const [documentInput, setDocumentInput] = useState("");
    const [documentLoading, setDocumentLoading] = useState(false);
    const [statusList, setStatusList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [documentModalOpen, setDocumentModalOpen] = useState(false);
    const [documentNewAdded, setNewDocumentAdded] = useState('');


    useEffect(() => {
        getTrades();
        getSubmittalsType();
        getEstimateDetailViewReport();
        getAllProjectsWithId();
        getAllDocuments();
        getAllStatuses();
    }, [submittalModalOpen]);


    const handleInputChangeDocuments = (value) => {
        setDocumentInput(value);
    };

    const getSearchedDocuments = async (value) => {
        try {
            const data = await getApi(
                "All_Documents",
                `Single_Line_Url.contains("${value}")`
            );
            const makeDocumentsList = data?.map((item) => ({
                label: item?.Single_Line_Url,
                value: item?.ID,
            }));
            setDocumentsList(makeDocumentsList?.length > 0 ? makeDocumentsList : []);
        } catch (error) {
            console.log("All_Documents: ", error);
        } finally {
            setDocumentLoading(false);
        }
    };

    useEffect(() => {
        if (documentInput.length > 0) {
            setDocumentLoading(true);
            const timeoutId = setTimeout(() => {
                getSearchedDocuments(documentInput);
            }, 1500);

            return () => {
                clearTimeout(timeoutId);
                setDocumentLoading(false);
            };
        }
    }, [documentInput]);

    const handleDeleteRow = (index) => {
        const updatedData = [...tableData];
        updatedData.splice(index, 1);
        setTableData(updatedData);
    };

    const handleAddRow = () => {
        const emptyRecord = {
            revision: null,
            document: null,
            notes: "",
            status: null,
            date: new Date(),
        };
        const updatedData = [...tableData];
        updatedData.unshift(emptyRecord);
        setTableData(updatedData);
    };

    const handleChangeDeliverables = (value) => {
        setSelectedDeliverable(value);
        setSelectedTasks(null);

        const makeEstimateTasksList = value?.estimateTasks?.map((task) => {
            if (!task?.display_value)
                return null
            const [sno, name] = task?.display_value?.split(';');
            return {
                label: name,
                value: task?.ID,
            }
        }).filter(item => item)

        setTasksList(
            makeEstimateTasksList?.length > 0 ? makeEstimateTasksList : []
        );
    };

    const handleInputChangeDeliverables = (value) => {
        setDeliverablesInput(value);
    };

    const getSearchedDeliverables = (value) => {
        if (autoEstimateNo) {
            getApi(
                "Estimate_Detail_View_Report",
                `(Name.contains("${value}")&&Add_Estimate_Worksheet.Auto_No==${autoEstimateNo})`
            )
                .then((data) => {
                    const modifiedDeliverables = data?.map((d) => ({
                        label: d.Name,
                        value: d.ID,
                        estimateTasks: d?.Estimate_Tasks,
                    }));

                    setDeliverablesList(
                        modifiedDeliverables?.length > 0 ? modifiedDeliverables : []
                    );
                    setDeliverablesLoading(false);
                })
                .catch((error) => {
                    setDeliverablesLoading(false);
                    console.error("Error fetching materials:", error);
                });
        }
    };

    useEffect(() => {
        if (deliverablesInput.length > 0) {
            setDeliverablesLoading(true);
            const timeoutId = setTimeout(() => {
                getSearchedDeliverables(deliverablesInput);
            }, 1500);

            return () => {
                clearTimeout(timeoutId);
                setDeliverablesLoading(false);
            };
        }
    }, [deliverablesInput]);

    const getEstimateDetailViewReport = async () => {
        try {
            const { estimate_no } = await getQueryParams("estimate_no");
            if (estimate_no) {
                setAutoEstimateNo(estimate_no);
                const data = await getApi(
                    "Estimate_Detail_View_Report",
                    `Add_Estimate_Worksheet.Auto_No==${estimate_no}`
                );

                const modifiedDeliverables = data?.map((d) => ({
                    label: d?.Name,
                    value: d?.ID,
                    estimateTasks: d?.Estimate_Tasks,
                }));

                setDeliverablesList(
                    modifiedDeliverables?.length > 0 ? modifiedDeliverables : []
                );
            }
        } catch (error) {
            console.log("GET_ESTIMATE_DETAIL_REPORT_ERROR", error);
        }
    };

    const handleChangeSubmittalsType = (value) => {
        setSelectedSubmittalsType(value);
    };

    const handleChangeProject = async (value) => {
        setSelectedProject(value);
        const data = await getRecordCount(
            "All_Nomenclatures",
            `(Project_Ref_Number.ID==${value.value})`
        );
        setDrawingNo(parseInt(data) + 1);
    };

    const handleInputChangeSubmittalsType = (value) => {
        setSubmittalsTypeInput(value);
    };

    const getSearchedTypeSubmittals = (value) => {
        getApi("All_Submittal_Types")
            .then((data) => {
                const modifiedSubmittalsType = data?.map((d) => ({
                    label: d?.Submittal_Code + " - " + d?.Submittal,
                    value: d?.ID,
                }));

                setSubmittalsTypeList(
                    modifiedSubmittalsType?.length > 0 ? modifiedSubmittalsType : []
                );
                setSubmittalsTypeLoading(false);
            })
            .catch((error) => {
                setSubmittalsTypeLoading(false);
                console.error("Error fetching submittals:", error);
            });
    };

    useEffect(() => {
        if (submittalsTypeInput.length > 0) {
            setSubmittalsTypeLoading(true);
            const timeoutId = setTimeout(() => {
                getSearchedTypeSubmittals(submittalsTypeInput);
            }, 1500);

            return () => {
                clearTimeout(timeoutId);
                setSubmittalsTypeLoading(false);
            };
        }
    }, [submittalsTypeInput]);

    const getSubmittalsType = async () => {
        try {
            const data = await getApi("All_Submittal_Types");

            const modifiedSubmittalsType = data?.map((d) => ({
                label: d?.Submittal_Code + " - " + d?.Submittal,
                value: d?.ID,
            }));

            setSubmittalsTypeList(
                modifiedSubmittalsType?.length > 0 ? modifiedSubmittalsType : []
            );
        } catch (error) {
            console.log("GET_SUBMITTALS_REPORT_ERROR", error);
        }
    };

    const handleChangeTrade = (value) => {
        setSelectedTrade(value);
    };

    const getTrades = async () => {
        try {
            const data = await getApi("All_Trade_Codes");
            const makeTradeList = data?.map((item) => ({
                label: item?.Trade_Name,
                value: item?.ID,
            }));
            setTradesList(makeTradeList?.length > 0 ? makeTradeList : []);
        } catch (error) {
            console.error("All_Trade_Codes: ", error);
        }
    };

    const handleChangeTasks = (value) => {
        setSelectedTasks(value);
    };

    const handleChangeNotes = (event, index) => {
        const updatedData = [...tableData];
        updatedData[index].notes = event.target.value;
        setTableData(updatedData);
    };

    const handleChangeDate = (date, index) => {
        const updatedData = [...tableData];
        updatedData[index].date = date;
        setTableData(updatedData);
    };

    const handleChangeRevision = (value, index) => {
        const updatedData = [...tableData];
        updatedData[index].revision = value;
        setTableData(updatedData);
    };

    const handleChangeStatus = (value, index) => {
        const updatedData = [...tableData];
        updatedData[index].status = value;
        setTableData(updatedData);
    };

    const handleChangeDocument = (value, index) => {
        const updatedData = [...tableData];
        updatedData[index].document = value;
        setTableData(updatedData);
    };

    const getAllProjectsWithId = async () => {
        try {
            const { estimate_no } = await getQueryParams("estimate_no");
            if (estimate_no) {
                const payload = `Add_Estimate_Worksheet.Auto_No==${estimate_no}`;
                const data = await getApi("Estimate_Deliverable_Report", payload);
                const id = data[0]["Add_Estimate_Worksheet.Project1"];
                if (id) {
                    const payload = `ID==${id}`;
                    const data = await getApi("All_Projects", payload);
                    const makeProjectsList = data?.map((item) => ({
                        label: item?.Job_Name + " - " + item?.Project_ID,
                        value: item?.ID,
                    }));
                    setProjectsList(makeProjectsList?.length > 0 ? makeProjectsList : []);
                    setSelectedProject(
                        makeProjectsList?.length > 0 ? makeProjectsList[0] : null
                    );
                    const res = await getRecordCount(
                        "All_Nomenclatures",
                        `(Project_Ref_Number.ID==${makeProjectsList[0]?.value})`
                    );
                    setDrawingNo(parseInt(res) + 1);
                }
            }
        } catch (error) {
            console.error("Get All Projects Error: ", error);
        }
    };

    const getAllDocuments = async (type = false) => {
        try {


            const data = await getApi("All_Documents", 'Single_Line_Url!=null');
            const makeDocumentsList = data?.map((item) => ({
                // label: (item?.File_Name || '') + item?.Single_Line_Url,
                label: item?.Single_Line_Url,
                value: item?.ID,
            }));
            setDocumentsList(makeDocumentsList?.length > 0 ? makeDocumentsList : []);
            // if(!type) {
            // setNewDocumentAdded(true)
            // }
        } catch (error) {
            console.log("All_Documents: ", error);
        }
    };

    const getAllStatuses = async () => {
        try {
            const data = await getApi("All_Statuses");
            const makeStatusList = data?.map((item) => ({
                label: item?.Status,
                value: item?.ID,
            }));
            setStatusList(makeStatusList?.length > 0 ? makeStatusList : []);
        } catch (error) {
            console.log("All_Statuses: ", error);
        }
    };



    const cleanUp = () => {
        setSelectedTrade(null);
        setSubmittalsTypeInput("");
        setSelectedSubmittalsType(null);
        setDeliverablesInput("");
        setSelectedDeliverable(null);
        setSubmittalName("");
        setSelectedTasks(null);
        setSelectedProject(null);
        setDrawingNo(0);
        setTableData([]);
    };

    const handleCloseSubmittalModal = () => {
        cleanUp();
        onSubmitalModalClose();
    };

    const updateDataReq = async (object, ID) => {
        let doucumentManagerPayload = {
            Revision: object?.revision?.value,
            Add_Documents: object?.document?.map((item) => item.value),
            Notes: object?.notes,
            Status: object?.status?.value,
            Create_Date: object?.data,
            Nomenclature: ID,
        };
        try {
            const data = await addRecord(
                doucumentManagerPayload,
                "All_Document_Managers",
                "Document_Manager"
            );
            return data;
        } catch (error) {
            console.error("All_Document_Managers Error : ", error);
            toast.error(Messages.WENT_WRONG);
        }
    };

    function checkRequiredFields(array) {
        const requiredFields = ["revision", "document", "status", "date"];

        for (let i = 0; i < array.length; i++) {
            for (let field of requiredFields) {
                if (array[i][field] === null || array[i][field] === undefined || array[i][field] === '') {
                    return `In row ${i + 1}, you did not fill ${field}`;
                }
            }
        }

        return false;
    }


    const handleSubmit = async () => {
        const payload = {
            Project_Ref_Number: selectedProject?.value || null,
            Submittal_Type: selectedSubmittalsType?.value || null,
            Submittal_Name: submittalName || null,
            Estimate_Deliverable: selectedDeliverable?.value || null,
            Estimate_Task: selectedTasks?.value || null,
            Trade_Code: selectedTrade?.value || null,
            Drawing_Number: drawingNo || null,
            Estimate_Worksheet_Multi_Select: [
                localStorage.getItem("Add_Estimate_Worksheet"),
            ],
            Estimate_Task1: [selectedTasks?.value]
            // Add_Docs: "1556703000053583056",
            // Documents: "1556703000046224117",
        };

        // let AdDocs = []
        if (tableData?.length) {
            payload.Latest_Date = tableData[tableData?.length - 1]?.date ? moment(tableData[tableData?.length - 1]?.date, 'YYYY-MM-DD').format("MM-DD-YYYY") : ''
            payload.Revision = tableData[tableData?.length - 1]?.revision?.value
            payload.Status = tableData[0]?.status?.value
            payload.Add_Docs = tableData[0]?.document?.map(item => item?.value)?.filter(item => item)
        }

        if (!payload.Trade_Code) return toast.error("Trade_Code not found");

        // console.log(payload, 'payload.payload')
        // console.log(tableData, 'tableData.payload')
        // console.log(  payload.Add_Docs, 'AdDocs')

        if (
            !payload.Submittal_Type ||
            !payload.Submittal_Name ||
            !payload.Estimate_Deliverable ||
            !payload.Estimate_Task ||
            !payload.Estimate_Worksheet_Multi_Select
        ) {
            return toast.error("Please fill all the fields.");
        }

        const msg = checkRequiredFields(tableData);
        if (msg) {
            return toast.error(msg);
        }

        try {
            setLoading(true);
            const data = await addRecord(
                payload,
                "Estimate_File_Log",
                "Nomenclature"
            );
            if (data?.ID) {
                const promises = tableData.map(async (object) => {
                    await updateDataReq(object, data?.ID);
                });
                await Promise.all(promises);
                await updateAPI(
                    data?.ID,
                    payload,
                    "Estimate_File_Log"
                );
                toast.success(Messages.DATA_ADDED);
                refetchData();
                handleCloseSubmittalModal();
            }
        } catch (error) {
            console.error("Estimate_File_Log Error: ", error);
            toast.error(Messages.WENT_WRONG);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (deliverable) {
            setSelectedDeliverable(deliverable);
        }
        if (task) {
            setSelectedTasks(task);
        }
    }, [submittalModalOpen]);

    const documentModalClose = () => {
        setDocumentModalOpen(false);
    };

    const ReactSelectDropdown = {
        background: "#ffff",
        transition: "none",
        fontSize: "12px",
        height: '44px',
        fontWeight: '600',
        border: '1px solid #e2e8f0'

    }

    return (
        <>
            <Modal
                size={"6xl"}
                show={submittalModalOpen}
                onClose={handleCloseSubmittalModal}
                className="submital"
            >
                <div
                    className="rounded-lg overflow-y-auto"
                    style={{ backgroundColor: "white" }}
                >
                    <Modal.Header>
                        <h2 className="mt-2 font-bold">New Submittal</h2>
                    </Modal.Header>

                    <Modal.Body >
                        <div className="w-full overflow-x-hidden">
                            <div>
                                <div>
                                    <div className="flex flex-col gap-4 mb-4 text-sm font-semibold">
                                        <div>
                                            <p className="text-left mb-1">
                                                Project Reference No.
                                            </p>

                                            {/* className="w-full rounded h-11 font-medium focus:outline-none border-slate-200	 bg-white-300 text-sm  disabled:bg-slate-300 disabled:cursor-not-allowed" */}

                                            <Select
                                                menuPosition="fixed"
                                                className="basic-single bg-white-300"
                                                isClearable={false}
                                                isDisabled={true}
                                                name="Project Reference No"
                                                placeholder="------------------"
                                                components={{
                                                    IndicatorSeparator: () => null,
                                                }}
                                                styles={{
                                                    input: (base) => ({
                                                        ...base,
                                                        "input:focus": {
                                                            boxShadow: "none",
                                                        },
                                                    }),
                                                    control: (base) => ({
                                                        ...base,
                                                        ...ReactSelectDropdown
                                                    }),
                                                }}
                                                value={selectedProject}
                                                options={projectsList}
                                                onChange={(value) => handleChangeProject(value)}
                                            />
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="flex-1">
                                                <p className="text-left mb-1">
                                                    Submittal Type.
                                                </p>
                                                <Select
                                                    isLoading={submittalsTypeLoading}
                                                    menuPosition="fixed"
                                                    className="basic-single bg-white-300"
                                                    isClearable={false}
                                                    isSearchable={true}
                                                    name="Submittal Type"
                                                    placeholder="----------------"
                                                    components={{
                                                        IndicatorSeparator: () => null,
                                                    }}
                                                    styles={{
                                                        input: (base) => ({
                                                            ...base,
                                                            "input:focus": {
                                                                boxShadow: "none",
                                                            },
                                                        }),
                                                        control: (base) => ({
                                                            ...base,
                                                            ...ReactSelectDropdown

                                                        }),
                                                    }}
                                                    value={selectedSubmittalsType}
                                                    onInputChange={handleInputChangeSubmittalsType}
                                                    options={submittalsTypeList}
                                                    onChange={(value) =>
                                                        handleChangeSubmittalsType(value)
                                                    }
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-left mb-1">
                                                    Submittal Name
                                                </p>
                                                <input
                                                    className="w-full rounded h-11 font-medium focus:outline-none border-slate-200	 bg-white-300 text-sm  disabled:bg-slate-300 disabled:cursor-not-allowed"
                                                    type="text"
                                                    placeholder="----------------"
                                                    value={submittalName}
                                                    onChange={(e) => setSubmittalName(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="flex-1">
                                                <p className="text-left mb-1">
                                                    Estimate Deliverable.
                                                </p>
                                                <Select
                                                    isLoading={deliverablesLoading}
                                                    menuPosition="fixed"
                                                    className="basic-single bg-white-300"
                                                    isClearable={false}
                                                    isSearchable={true}
                                                    name="Estimate Deliverable"
                                                    placeholder="------------------"
                                                    components={{
                                                        IndicatorSeparator: () => null,
                                                    }}
                                                    styles={{
                                                        input: (base) => ({
                                                            ...base,
                                                            "input:focus": {
                                                                boxShadow: "none",
                                                            },
                                                        }),
                                                        control: (base) => ({
                                                            ...base,
                                                            ...ReactSelectDropdown
                                                        }),
                                                    }}
                                                    value={selectedDeliverable}
                                                    options={deliverablesList}
                                                    onInputChange={handleInputChangeDeliverables}
                                                    onChange={(value) => handleChangeDeliverables(value)}
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-left mb-1">Estimate Task.</p>
                                                <Select
                                                    menuPosition="fixed"
                                                    className="basic-single bg-white-300"
                                                    isClearable={false}
                                                    isSearchable={true}
                                                    name="Estimate Task"
                                                    placeholder="------------------"
                                                    components={{
                                                        IndicatorSeparator: () => null,
                                                    }}
                                                    styles={{
                                                        input: (base) => ({
                                                            ...base,
                                                            "input:focus": {
                                                                boxShadow: "none",
                                                            },
                                                        }),
                                                        control: (base) => ({
                                                            ...base,
                                                            ...ReactSelectDropdown

                                                        }),
                                                    }}
                                                    value={selectedTasks}
                                                    options={tasksList}
                                                    onChange={(value) => handleChangeTasks(value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="flex-1">
                                                <p className="text-left mb-1">Trade Code.</p>
                                                <Select
                                                    menuPosition="fixed"
                                                    className="basic-single bg-white-300"
                                                    isClearable={false}
                                                    isSearchable={true}
                                                    name="Trade Code"
                                                    placeholder="------------------"
                                                    components={{
                                                        IndicatorSeparator: () => null,
                                                    }}
                                                    styles={{
                                                        input: (base) => ({
                                                            ...base,
                                                            "input:focus": {
                                                                boxShadow: "none",
                                                            },
                                                        }),
                                                        control: (base) => ({
                                                            ...base,
                                                            ...ReactSelectDropdown

                                                        }),
                                                    }}
                                                    value={selectedTrade}
                                                    options={tradesList}
                                                    onChange={(value) => handleChangeTrade(value)}
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-left mb-1">Drawing No.</p>
                                                <input
                                                    className="w-full rounded h-11 focus:outline-none border-slate-200 bg-white-300 text-xs  disabled:bg-slate-100 disabled:cursor-not-allowed"
                                                    type="text"
                                                    disabled
                                                    placeholder="Drawing No."
                                                    value={drawingNo}
                                                    onChange={() => { }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex  mb-4 mt-2 justify-between">
                                    <h1 className="font-black text-lg">Attachments</h1>
                                    <button
                                        onClick={handleAddRow}
                                        type="button"
                                        class="px-1	 py-2 text-sm font-semibold text-center flex justify-center	  text-white-300 bg-primary-0 hover:bg-primary-1 focus:outline-none focus:ring-primary-300 dark:focus:ring-primary-3 text-white-0  border rounded-[5px] w-36 items-center"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                        Add New
                                    </button>
                                </div>
                            </div>

                            {tableData.length > 0 && (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-green-0 dark:bg-gray-700 dark:text-gray-400">
                                            <tr className="text-left h-10 ">
                                                {columns.map((col, index) => (
                                                    <th
                                                        key={index}
                                                        scope="col"
                                                        className="text-xs text-black-0 pl-2"
                                                    >
                                                        {col}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tableData.length > 0 &&
                                                tableData?.map((row, rowIndex) => (
                                                    <tr
                                                        key={rowIndex}
                                                        className="bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-left h-10	"
                                                    >
                                                        {Object.entries(row).map(([key, value]) => (
                                                            <>
                                                                {key === "revision" && (
                                                                    <td className="py-4">
                                                                        <Select
                                                                            menuPosition="fixed"
                                                                            className="basic-single"
                                                                            isClearable={false}
                                                                            isSearchable={true}
                                                                            name="revision"
                                                                            placeholder="Revision."
                                                                            components={{
                                                                                IndicatorSeparator: () => null,
                                                                            }}
                                                                            styles={{
                                                                                input: (base) => ({
                                                                                    ...base,
                                                                                    "input:focus": {
                                                                                        boxShadow: "none",
                                                                                    },
                                                                                }),
                                                                                control: (base) => ({
                                                                                    ...base,
                                                                                    background: "#FFF",
                                                                                    transition: "none",
                                                                                    fontSize: "1rem",
                                                                                    height: "42px",
                                                                                    width: "220px",
                                                                                }),
                                                                            }}
                                                                            value={value}
                                                                            onChange={(value) =>
                                                                                handleChangeRevision(value, rowIndex)
                                                                            }
                                                                            options={[
                                                                                { label: "Rev.00", value: "Rev.00" },
                                                                                { label: "Rev.01", value: "Rev.01" },
                                                                                { label: "Rev.02", value: "Rev.02" },
                                                                                { label: "Rev.03", value: "Rev.03" },
                                                                                { label: "Rev.04", value: "Rev.04" },
                                                                                { label: "Rev.05", value: "Rev.05" },
                                                                                { label: "Rev.06", value: "Rev.06" },
                                                                                { label: "Others", value: "Others" },
                                                                            ]}
                                                                        />
                                                                    </td>
                                                                )}
                                                                {key === "document" && (
                                                                    <td className="py-6  pl-2">
                                                                        <div className="relative">
                                                                            <div>
                                                                                <Select
                                                                                    menuPosition="fixed"
                                                                                    isLoading={documentLoading}
                                                                                    isMulti
                                                                                    className="basic-single"
                                                                                    isClearable={false}
                                                                                    isSearchable={true}
                                                                                    name="addDocuments"
                                                                                    placeholder="Add Documents."
                                                                                    components={{
                                                                                        IndicatorSeparator: () => null,
                                                                                    }}
                                                                                    styles={{
                                                                                        input: (base) => ({
                                                                                            ...base,
                                                                                            "input:focus": {
                                                                                                boxShadow: "none",
                                                                                            },
                                                                                        }),
                                                                                        control: (base) => ({
                                                                                            ...base,
                                                                                            background: "#FFF",
                                                                                            transition: "none",
                                                                                            fontSize: "1rem",
                                                                                            minHeight: "42px",
                                                                                            width: "220px",
                                                                                        }),
                                                                                    }}
                                                                                    onInputChange={
                                                                                        handleInputChangeDocuments
                                                                                    }
                                                                                    onChange={(value) =>
                                                                                        handleChangeDocument(
                                                                                            value,
                                                                                            rowIndex
                                                                                        )
                                                                                    }
                                                                                    options={documentsList}
                                                                                    value={value}
                                                                                // value={documentNewAdded == rowIndex ? documentsList[0] : value}
                                                                                />
                                                                            </div>
                                                                            <div
                                                                                onClick={() => {
                                                                                    setDocumentModalOpen(true)
                                                                                    setNewDocumentAdded(rowIndex)
                                                                                }}
                                                                                className="absolute hover:underline text-xs font-bold text-primary-0 cursor-pointer"
                                                                            >
                                                                                Attach File
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                )}
                                                                {key === "notes" && (
                                                                    <td className="py-4  pl-2">
                                                                        <input
                                                                            style={{
                                                                                width: "220px",
                                                                            }}
                                                                            className="rounded-[5px] border-[#B7B9BC] disabled:bg-slate-100 disabled:cursor-not-allowed"
                                                                            type="text"
                                                                            value={value}
                                                                            onChange={(event) =>
                                                                                handleChangeNotes(event, rowIndex)
                                                                            }
                                                                            placeholder="Notes"
                                                                        />
                                                                    </td>
                                                                )}
                                                                {key === "status" && (
                                                                    <td className="py-4  pl-2">
                                                                        <Select
                                                                            menuPosition="fixed"
                                                                            className="basic-single"
                                                                            isClearable={false}
                                                                            isSearchable={true}
                                                                            name="status"
                                                                            placeholder="Status."
                                                                            components={{
                                                                                IndicatorSeparator: () => null,
                                                                            }}
                                                                            styles={{
                                                                                input: (base) => ({
                                                                                    ...base,
                                                                                    "input:focus": {
                                                                                        boxShadow: "none",
                                                                                    },
                                                                                }),
                                                                                control: (base) => ({
                                                                                    ...base,
                                                                                    background: "#FFF",
                                                                                    transition: "none",
                                                                                    fontSize: "1rem",
                                                                                    height: "42px",
                                                                                    width: "220px",
                                                                                }),
                                                                            }}
                                                                            value={value}
                                                                            options={statusList}
                                                                            onChange={(value) =>
                                                                                handleChangeStatus(value, rowIndex)
                                                                            }
                                                                        />
                                                                    </td>
                                                                )}
                                                                {key === "date" && (
                                                                    <td className="py-4  pl-2">
                                                                        <DatePicker
                                                                            style={{
                                                                                width: "220px",
                                                                            }}
                                                                            className="rounded-[5px] border-[#B7B9BC] disabled:bg-slate-100 disabled:cursor-not-allowed"
                                                                            selected={value}
                                                                            onChange={(date) =>
                                                                                handleChangeDate(date, rowIndex)
                                                                            }
                                                                            placeholderText="Created Date."
                                                                        />
                                                                    </td>
                                                                )}
                                                            </>
                                                        ))}
                                                        {
                                                            <td>
                                                                <div className="flex items-center justify-center cursor-pointer gap-5">
                                                                    <div onClick={() => handleDeleteRow(rowIndex)}>
                                                                        <img src={TrashImage} alt="Delete" />
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        }

                                                    </tr>
                                                ))}
                                            <tr>
                                                <td colSpan={Object.keys(tableData[0] || {}).length} className="text-center py-4">
                                                    <button
                                                        onClick={handleAddRow}
                                                        className="px-4 py-2 bg-white-300  rounded  text-primary-0 border-[1px] w-full flex justify-center items-center gap-1 text-base text font-semibold border-primary-0"
                                                    >
                                                        <IoAdd className="" />
                                                        <span>Add New Row</span>
                                                    </button>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            )}
                            <div className="flex justify-end items-center mt-8">
                                {/* <button
                                    disabled={loading}
                                    onClick={handleSubmit}
                                    type="button"
                                    class="px-[8px] w-[100px] py-[4px] text-md font-semibold text-center text-white bg-primary-2 hover:bg-primary-1 focus:outline-none text-white-0 h-[35px] border rounded-[5px]"
                                >
                                    {loading && <Spinner className="w-4 h-4 mr-2 mb-1" />}
                                    Submit
                                </button> */}
                                <button
                                    onClick={handleAddRow}
                                    type="button"
                                    class="px-1	py-2 text-base font-semibold text-center flex justify-center	  text-white-300 bg-primary-0 hover:bg-primary-1 focus:outline-none focus:ring-primary-300 dark:focus:ring-primary-3 text-white-0  border rounded-[5px] w-36 items-center"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </Modal.Body>
                </div>
            </Modal>
            {documentModalOpen && (
                <DocumentModal
                    documentModalOpen={documentModalOpen}
                    documentModalClose={documentModalClose}
                    getAllDocuments={getAllDocuments}
                    setNewDocumentAdded={setNewDocumentAdded}
                />
            )}
        </>
    );
};

export default SubmittalModal;
