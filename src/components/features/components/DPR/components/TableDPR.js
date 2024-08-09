import { FaPlus } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { TbFilter } from "react-icons/tb";
import { BiSort } from "react-icons/bi";
import { TiArrowSortedDown } from "react-icons/ti";
import ImgNoData from '../../../../../images/noData.png'
import { Pagination } from "../../general/Pagination";
import { FaEye } from "react-icons/fa";
import { dprTableColumns } from "../../../../../constant/data";
import { useState, useEffect } from "react";
import IconExclude from '../../../../../images/dpr/exclude.svg'
import { ExcelExport } from "@syncfusion/ej2-react-gantt";
import { Popover, Button } from "flowbite-react";
import moment from "moment";
import Spinner from "../../../../Spinner";
const PopUpOverFilter = ({ children, className, title, setColumns, allColumns }) => {
    const showHideTableColumns = (event, index) => {
        const columnId = event.target.name;
        setColumns(prevColumns =>
            prevColumns.map(column =>
                column.id === columnId ? { ...column, isActive: !column.isActive } : column
            )
        );
    };


    return (
        <Popover 
            aria-labelledby="default-popover"
            content={
                <div className="w-52 sm:w-72 text-gray-500 dark:text-gray-400 bg-white-2 shadow-inner">
                    <div className=" pl-4 pt-4 pb-2">
                        <h3 id="default-popover" className="font-bold text-base text-primary-0">{title}</h3>
                    </div>
                    <div className="py-2 text-primary-0 font-normal">
                        {
                            dprTableColumns.map((column, index) => <div className="flex items-center border-b py-3.5 pl-4"><input type="checkbox" className="ring-offset-0	ring-0" checked={allColumns[index].isActive == true} name={column.id} onClick={(event) => showHideTableColumns(event, index)} /><p className="ml-2">{column.label}</p></div>
                            )
                        }
                        <div className="mt-6 mb-3">
                            <button
                                className="py-2 text-sm font-semibold text-white-2 bg-primary-0 rounded-lg flex items-center justify-center w-[70%] sm:w-[160px] m-auto">
                                Done
                            </button></div>
                    </div>
                </div>
            }
            className={className}
        >
            <div className="flex gap-2 ">
                {children}
            </div>
        </Popover>
    )
}

const TableDPR = ({ tasks, handleTaskModelOpen, isTaskModalOpen, tableLoader }) => {

    const totalPages = 100;
    const [projectTasks, setProjectTasks] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, sePageSize] = useState(10);
    const [tableActiveTab, setTableActiveTab] = useState('pending')
    const [dateType, setDateType] = useState('weekly')
    const [columns, setColumns] = useState(dprTableColumns)


    useEffect(() => {
        getTasks(tasks)
    }, [tasks, currentPage])

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const getTasks = (tasks) => {
        if (tasks?.length) {
            const startIndex = (currentPage - 1) * pageSize;
            const endIndex = startIndex + pageSize;

            setProjectTasks(tasks.slice(startIndex, endIndex));
        } else {
            setProjectTasks([])
        }

    }

    const getTotalPages = (totalItems, pageSize) => {
        if (pageSize <= 0) return 1
        return Math.ceil(totalItems / pageSize);
    };

    console.log(tasks, 'tasks')
    return (

        <div className="bg-white-2 px-2 py-5 border rounded mt-4">
            <div className="">
                <div className="flex gap-2 flex-col-reverse md:flex-row justify-center md:justify-between">
                    <div className="flex justify-center md:justify-start">
                        <ul class="w-[250px] flex text-sm font-medium p-1 text-center text-gray-500  dark:border-gray-700 dark:text-gray-400 rounded bg-[#f3f4f6]">
                            <li class="grow">
                                <button class={`inline-block px-3 sm:px-4 py-1.5 text-black-1 bg-gray-100 rounded-lg text-slate-500 ${dateType == 'daily' && 'active bg-white-2 border border-black-0'}`}
                                    onClick={() => setDateType('daily')}

                                >Daily</button>
                            </li>
                            <li class="grow">
                                <button class={`inline-block px-3 sm:px-4 py-1.5 text-blue-600 bg-gray-100 rounded-lg  text-slate-500 ${dateType == 'weekly' && 'active bg-white-2 border border-black-0'}`}
                                    onClick={() => setDateType('weekly')}

                                >Weekly</button>
                            </li>
                            <li class="grow">
                                <button class={`inline-block px-3 sm:px-4 py-1.5 text-blue-600 bg-gray-100 rounded-lg  text-slate-500 ${dateType == 'monthly' && 'active bg-white-2 border border-black-0'}`}
                                    onClick={() => setDateType('monthly')}
                                >Monthly</button>
                            </li>
                        </ul>
                    </div>
                    <div className="flex items-center justify-center gap-1 sm:gap-2 mt-2 md:mt-0">
                        <div className='flex items-center border border-gray-300 rounded-md bg-white-3 w-[50%] sm:w-[213px] h-10 '>
                            <FiSearch className='h-5 w-5 ml-1 sm:ml-3 mr-1 text text-slate-400' />
                            <input
                                type="text"
                                className="flex-grow py-1 px-2 bg-white focus:outline-none focus:ring-0 focus:border-none border-none w-[17%] sm:w-40"
                                placeholder="Search"
                            // onChange={(event) => searchTasks(event.target.value)}
                            />
                        </div>
                        <PopUpOverFilter title='Search' allColumns={columns} setColumns={setColumns} >
                            <div className="border border-black-0 rounded py-1.5 sm:py-2 px-1.5 cursor-pointer">
                                <TbFilter className="w-4 sm:w-6 h-4 sm:h-5 " />
                            </div>
                        </PopUpOverFilter>

                        <div className="flex items-center sm:gap-2 border border-black-0 rounded py-1.5 px-1 sm:px-2.5">
                            <BiSort className="w-3 sm:w-6 h-3 sm:h-5 "/><span className="text-xs sm:text-base"> Sort by</span> <TiArrowSortedDown className="w-3 sm:w-6 h-3 sm:h-5 "/>
                        </div>

                    </div>
                </div>
                {/* //// Table /// */}
                <div className="border rounded-xl mt-8 overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 rounded-xl">
                        <thead className="text-sm text-gray-700 capitalize bg-gray-5 rounded-xl">
                            <tr className="rounded-xl">
                                {columns.map((column, index) =>
                                    column.isActive ? (
                                        <th
                                            key={column.id}
                                            scope="col"
                                            className="px-6 font-semibold text-base py-3"
                                        >
                                            {index === 0 ? (
                                                <PopUpOverFilter className="ml-4 sm:ml-10 mt-2" title="Show/Hide Columns" allColumns={columns} setColumns={setColumns}>
                                                    <img src={IconExclude} alt="No-Image" className="cursor-pointer" />
                                                    <span> {column.label}</span>
                                                </PopUpOverFilter>
                                            ) : (
                                                column.label
                                            )}
                                        </th>
                                    ) : null
                                )}
                                <th scope="col" className="px-6 font-semibold text-base py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableLoader ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-6" style={{ verticalAlign: 'middle' }}>
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                                            <Spinner />
                                        </div>
                                    </td>
                                </tr>
                            ) : projectTasks.length > 0 ? (
                                projectTasks.map((task, index) => (
                                    <tr key={index} className={`odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 ${(projectTasks.length - 1) != index & 'border-b '} dark:border-gray-700 text-black-2 text-sm`}>
                                        {columns.map((column) =>
                                            column.isActive ? (
                                                <td key={column.id} className={`px-6 py-4 ${column.width || 'w-auto'}`}>
                                                    {column.id === 'Issue_Date'
                                                        ? task[column.id]
                                                            ? moment(task[column.id], 'MM-DD-YYYY').format('MM/DD/YYYY')
                                                            : '-'
                                                        : task[column.id] || '-'}
                                                </td>
                                            ) : null
                                        )}
                                        <td className="px-6 py-4 w-[10%]">
                                            <FaEye className="text-black-2 text-xl cursor-pointer" onClick={() => handleTaskModelOpen(task)} />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={columns.filter(col => col.isActive).length} className="text-center py-6">
                                        <img src={ImgNoData} alt="No data available" className="mx-auto" style={{ width: '300px' }} />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {
                        <div>
                            {
                                tasks?.length > pageSize &&
                                <Pagination currentPage={currentPage} totalPages={getTotalPages(tasks?.length, pageSize)} onPageChange={handlePageChange} />
                            }
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}

export default TableDPR