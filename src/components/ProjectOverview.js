import React, { useState } from 'react';
import Spinner from './Spinner';


const taskStatuses = [
    {
        name: 'Completed',
        colorCode: `#209DF8`
    },
    {
        name: 'Paused',
        colorCode: '#81D7A3'
        // colorCode: '#81D7A3'
    },
    {
        name: 'Pending',
        // colorCode: `#F13D5A`
        colorCode: `#209DF8`

    },
    {
        name: 'Processing',
        // colorCode: `#434656`
        colorCode: `#209DF8`

    },
]
const ProjectOverview = () => {
    const [isGanttLoading, setLoading] = useState(false)

    if (isGanttLoading) {
        return (
            <div className="flex justify-center items-center">
                <Spinner />
            </div>
        );
    }

    return (
        <div className='control-pane mt-2 bg-white-3 h-[100vh]'>
            <div className='flex'>
                <div className='w-[60%]'>
                    <div class="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <div className='flex gap-8'>
                            <div className='w-[70%] flex items-start gap-4'>
                                <h1 className='text-base font-bold tracking-tight text-gray-900 dark:text-white'>Tasks Performance Report</h1>
                                <div className='task-status flex gap-4 flex-start flex-nowrap'>
                                    {
                                        taskStatuses.map(item => <div className='flex items-center  gap-2 text-xs mt-1'>
                                            <div class={`relative inline-flex items-center  w-2.5 h-2.5 overflow-hidden bg-[${item.colorCode}] rounded-full dark:bg-gray-600`}>
                                            </div>
                                            <p>{item.name}</p>
                                        </div>)
                                    }

                                </div>
                            </div>
                            <div className='w-[30%]'>
                                <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500  dark:border-gray-700 dark:text-gray-400 rounded bg-[#f3f4f6]">
                                    <li class="grow">
                                        <button class="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active text-slate-500 ">Weekly</button>
                                    </li>
                                    <li class="grow">
                                        <button class="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active text-slate-500">Monthly</button>
                                    </li>
                                    <li class="grow">
                                        <button class="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active text-slate-500">Yearly</button>
                                    </li>

                                </ul>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    );
};

export default ProjectOverview;
