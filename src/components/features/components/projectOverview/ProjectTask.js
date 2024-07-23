// import bin from '../images/bin.png';
// import edit from '../images/edit.png';

import { RiDeleteBinLine } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";
import { BsFilter } from "react-icons/bs";



// import search from '../images/search.png';

const tasks = [
    {
        name: 'Requirements',
        startDate: '11/03/2023',
        endDate: '11/03/2023',
        actualStart: '11/03/2023',
        actualEnd: '11/03/2023',
        amount: '$5,000',
        completion: '60.01%',
    },
    {
        name: 'Requirements',
        startDate: '11/03/2023',
        endDate: '11/03/2023',
        actualStart: '11/03/2023',
        actualEnd: '11/03/2023',
        amount: '$5,000',
        completion: '60.01%',
    },
    {
        name: 'Requirements',
        startDate: '11/03/2023',
        endDate: '11/03/2023',
        actualStart: '11/03/2023',
        actualEnd: '11/03/2023',
        amount: '$5,000',
        completion: '60.01%',
    },
];

const ProjectTaskTable = () => {
    return (
        <div className='mx-4'>
            <div className="flex flex-col sm:flex-row justify-between items-center py-5 rounded-md bg-white">
                <div className="text-2xl font-extrabold mb-2 sm:mb-0">Tasks Info.</div>
                <form className="flex items-center w-full sm:w-auto gap-4">
                    <div className='flex border border-gray-300 rounded-md bg-white-3  w-[300px]'>
                        {/* <img className='h-5 w-5 mt-3 mx-1' src={search} alt="search" /> */}
                        <FiSearch className='h-5 w-5 mt-3 mx-1 text text-slate-400 ' />
                        <input
                            type="text"
                            className="flex-grow p-2 bg-white focus:outline-none focus:ring-0 focus:border-none border-none"
                            placeholder="Search ..."
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 border border-primary-0 gap-1 flex text-primary-0 rounded-md focus:outline-none font-semibold	"
                    >
                        <BsFilter className='text-xl text-primary-900 mt-2' />
                        Filters
                    </button>
                </form>
            </div>
            <div className='bg-white-3 border-2 border-gray-0 px-5 rounded-xl pb-6'>
                {/* *********TABS START************ */}
                <div className="text-sm font-medium text-center text-gray-400 border-b border-gray-200">
                    <ul className="flex sm:flex-wrap overflow-x-auto -mb-px">
                        <li className="me-2">
                            <a href="#" className="inline-block p-4 text-primary-0 font-semibold border-b-2 border-primary-0 rounded-t-lg active">Pending</a>
                        </li>
                        <li className="me-2">
                            <a href="#" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-primary-0 hover:border-b-primary-0 font-semibold">Activated</a>
                        </li>
                        <li className="me-2">
                            <a href="#" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-primary-0 hover:border-b-primary-0 font-semibold">Inprogress</a>
                        </li>
                        <li className="me-2">
                            <a href="#" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-primary-0 hover:border-b-primary-0 font-semibold">Completed</a>
                        </li>
                        <li className="me-2">
                            <a href="#" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-primary-0 hover:border-b-primary-0 font-semibold">Approved</a>
                        </li>
                        <li className="me-2">
                            <a href="#" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-primary-0 hover:border-b-primary-0 font-semibold">Cancelled</a>
                        </li>
                    </ul>
                </div>

                <div>
                    <p className="font-extrabold text-xl pt-7 pb-4">Pending Tasks</p>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-0">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-sm text-gray-700 uppercase bg-gray-50 capitalize">
                                <tr className="">
                                    <th scope="col" className="px-6 font-semibold	 text-[13px] py-3 border rounded-l-lg border-gray-0">
                                        Task name
                                    </th>
                                    <th scope="col" className="px-6 font-semibold	 text-[13px] py-3 border border-gray-0">
                                        Start Date
                                    </th>
                                    <th scope="col" className="px-6 font-semibold	 text-[13px] py-3 border border-gray-0">
                                        End Date
                                    </th>
                                    <th scope="col" className="px-6 font-semibold	 text-[13px] py-3 border border-gray-0">
                                        Actual Start
                                    </th>
                                    <th scope="col" className="px-6 font-semibold	 text-[13px] py-3 border border-gray-0">
                                        Actual End
                                    </th>
                                    <th scope="col" className="px-6 font-semibold	 text-[13px] py-3 border border-gray-0">
                                        Amount
                                    </th>
                                    <th scope="col" className="px-6 font-semibold	 text-[13px] py-3 border border-gray-0">
                                        %age Completion
                                    </th>
                                    <th scope="col" className="px-6 font-semibold	 text-[13px] py-3 border border-gray-0">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map((task, index) => (
                                    <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {task.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {task.startDate}
                                        </td>
                                        <td className="px-6 py-4">
                                            {task.endDate}
                                        </td>
                                        <td className="px-6 py-4">
                                            {task.actualStart}
                                        </td>
                                        <td className="px-6 py-4">
                                            {task.actualEnd}
                                        </td>
                                        <td className="px-6 py-4">
                                            {task.amount}
                                        </td>
                                        <td className="px-6 py-4">
                                            {task.completion}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className='flex gap-4'>
                                                <CiEdit className="text-xl" />
                                                <RiDeleteBinLine className="text-xl" />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ProjectTaskTable;
