import bin from '../images/bin.png';
import edit from '../images/edit.png';
import search from '../images/search.png'
import filter from '../images/filter.png'
const GanttChartPage = () => {

    return (
        <div className='mx-4 px-4'>


            <div className="flex flex-col sm:flex-row justify-between items-center py-5 rounded-md bg-white">
                <div className="text-2xl font-extrabold mb-2 sm:mb-0">Tasks Info.</div>
                <form className="flex items-center w-full sm:w-auto gap-4">
                    <div className='flex border border-gray-300 rounded-md bg-white '>
                        <img className='h-5 w-5 mt-3 mx-1' src={search} alt="search" />
                        <input
                            type="text"
                            className="flex-grow p-2 bg-[#eef2f8] rounded-md focus:outline-none outline-none border-none"
                            placeholder="Search"
                        />
                    </div>
                    <button

                        type="submit"
                        className="px-4 py-2 border border-primary-0 gap-1 flex text-primary-0 rounded-md focus:outline-none"
                    >
                        <img className='h-4 w-3 mt-1' src={filter} alt="filter" />
                        Search
                    </button>
                </form>
            </div>
            <div className='bg-white-0  border-2 border-gray-0 px-5 rounded-xl pb-6'>
                {/* *********TABS START************ */}
                <div class="text-sm font-medium text-center text-gray-400 border-b border-gray-200">
                    <ul class="flex sm:flex-wrap overflow-x-auto -mb-px">
                        <li class="me-2">
                            <a href="#" class="inline-block p-4 text-primary-0 font-semibold border-b-2 border-primary-0 rounded-t-lg active">Pending</a>
                        </li>
                        <li class="me-2">
                            <a href="#" class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-primary-0 hover:border-b-primary-0  font-semibold" aria-current="page">Activated</a>
                        </li>

                        <li class="me-2">
                            <a href="#" class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-primary-0 hover:border-b-primary-0 font-semibold">Inprogress</a>
                        </li>
                        <li class="me-2">
                            <a href="#" class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-primary-0 hover:border-b-primary-0  font-semibold">Completed</a>
                        </li>
                        <li class="me-2">
                            <a href="#" class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-primary-0 hover:border-b-primary-0  font-semibold">Approved</a>
                        </li>
                        <li class="me-2">
                            <a href="#" class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-primary-0 hover:border-b-primary-0 font-semibold">Cancelled</a>
                        </li>
                    </ul>
                </div>
                {/* *********TABS END************ */}

                {/* *********Table START************ */}
                <div>
                    <p className="font-extrabold text-xl pt-7 pb-4">Pending Tasks</p>
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-0">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr className="">
                                    <th scope="col" class="px-6 py-3 border rounded-l-lg border-gray-0">
                                        Task name
                                    </th>
                                    <th scope="col" class="px-6 py-3 border border-gray-0">
                                        Start Date
                                    </th>
                                    <th scope="col" class="px-6 py-3 border border-gray-0">
                                        End Date
                                    </th>
                                    <th scope="col" class="px-6 py-3 border border-gray-0">
                                        Actual Start
                                    </th>
                                    <th scope="col" class="px-6 py-3 border border-gray-0">
                                        Actual End
                                    </th>
                                    <th scope="col" class="px-6 py-3 border border-gray-0">
                                        Amount
                                    </th>
                                    <th scope="col" class="px-6 py-3 border border-gray-0">
                                        %age Completion
                                    </th>
                                    <th scope="col" class="px-6 py-3 border border-gray-0">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Requirements
                                    </th>
                                    <td class="px-6 py-4">
                                        11/03/2023
                                    </td>
                                    <td class="px-6 py-4">
                                        11/03/2023
                                    </td>
                                    <td class="px-6 py-4">
                                        11/03/2023
                                    </td>
                                    <td class="px-6 py-4">
                                        11/03/2023
                                    </td>
                                    <td class="px-6 py-4">
                                        $5,000
                                    </td>
                                    <td class="px-6 py-4">
                                        60.01%
                                    </td>
                                    <td class="px-6 py-4">
                                        <div className='flex gap-2'>
                                            <img src={edit} alt="edit" />
                                            <img src={bin} alt="delete" />
                                        </div>
                                    </td>
                                </tr>
                                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Requirements
                                    </th>
                                    <td class="px-6 py-4">
                                        11/03/2023
                                    </td>
                                    <td class="px-6 py-4">
                                        11/03/2023
                                    </td>
                                    <td class="px-6 py-4">
                                        11/03/2023
                                    </td>
                                    <td class="px-6 py-4">
                                        11/03/2023
                                    </td>
                                    <td class="px-6 py-4">
                                        $5,000
                                    </td>
                                    <td class="px-6 py-4">
                                        60.01%
                                    </td>
                                    <td class="px-6 py-4">
                                        <div className='flex gap-2'>
                                            <img src={edit} alt="edit" />
                                            <img src={bin} alt="delete" />
                                        </div>
                                    </td>
                                </tr>
                                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Requirements
                                    </th>
                                    <td class="px-6 py-4">
                                        11/03/2023
                                    </td>
                                    <td class="px-6 py-4">
                                        11/03/2023
                                    </td>
                                    <td class="px-6 py-4">
                                        11/03/2023
                                    </td>
                                    <td class="px-6 py-4">
                                        11/03/2023
                                    </td>
                                    <td class="px-6 py-4">
                                        $5,000
                                    </td>
                                    <td class="px-6 py-4">
                                        60.01%
                                    </td>
                                    <td class="px-6 py-4">
                                        <div className='flex gap-2'>
                                            <img src={edit} alt="edit" />
                                            <img src={bin} alt="delete" />
                                        </div>
                                    </td>
                                </tr>
                                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Requirements
                                    </th>
                                    <td class="px-6 py-4">
                                        11/03/2023
                                    </td>
                                    <td class="px-6 py-4">
                                        11/03/2023
                                    </td>
                                    <td class="px-6 py-4">
                                        11/03/2023
                                    </td>
                                    <td class="px-6 py-4">
                                        11/03/2023
                                    </td>
                                    <td class="px-6 py-4">
                                        $5,000
                                    </td>
                                    <td class="px-6 py-4">
                                        60.01%
                                    </td>
                                    <td class="px-6 py-4">
                                        <div className='flex gap-2'>
                                            <img src={edit} alt="edit" />
                                            <img src={bin} alt="delete" />
                                        </div>
                                    </td>
                                </tr>
                                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Requirements
                                    </th>
                                    <td class="px-6 py-4">
                                        11/03/2023
                                    </td>
                                    <td class="px-6 py-4">
                                        11/03/2023
                                    </td>
                                    <td class="px-6 py-4">
                                        11/03/2023
                                    </td>
                                    <td class="px-6 py-4">
                                        11/03/2023
                                    </td>
                                    <td class="px-6 py-4">
                                        $5,000
                                    </td>
                                    <td class="px-6 py-4">
                                        60.01%
                                    </td>
                                    <td class="px-6 py-4">
                                        <div className='flex gap-2'>
                                            <img src={edit} alt="edit" />
                                            <img src={bin} alt="delete" />
                                        </div>
                                    </td>
                                </tr>
                                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Requirements
                                    </th>
                                    <td class="px-6 py-4">
                                        11/03/2023
                                    </td>
                                    <td class="px-6 py-4">
                                        11/03/2023
                                    </td>
                                    <td class="px-6 py-4">
                                        11/03/2023
                                    </td>
                                    <td class="px-6 py-4">
                                        11/03/2023
                                    </td>
                                    <td class="px-6 py-4">
                                        $5,000
                                    </td>
                                    <td class="px-6 py-4">
                                        60.01%
                                    </td>
                                    <td class="px-6 py-4">
                                        <div className='flex gap-2'>
                                            <img src={edit} alt="edit" />
                                            <img src={bin} alt="delete" />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* *********Table END************ */}
            </div>
        </div>

    )
}

export default GanttChartPage