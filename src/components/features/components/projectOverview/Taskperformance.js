import { useState } from "react";
import { taskStatuses } from "../../../../constant/data";
import Spinner from "../../../Spinner";


import ReactApexChart from 'react-apexcharts';

const ApexChart = () => {
    const [series] = useState([
        {
            name: 'Completed',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        },
        {
            name: 'Pending',
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94,]
        },
        {
            name: 'Processing',
            data: [35, 41, 36, 26, 85, 48, 52, 53, 81]
        },
        {
            name: 'Pause',
            data: [35, 41, 76, 86, 45, 48, 52, 53, 41]
        }
    ]);

    const [options] = useState({
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        },
        yaxis: {
            title: {
                text: 'Cooper Build'
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val
                }
            }
        },
        colors: ['#81d7a3', '#209df8', '#f13d5a', '#434656'], // Specify your colors here
    });


    return (
        <div>
            <div id="chart">
                <ReactApexChart options={options} series={series} type="bar" height={310} />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};

const TaskPerformance = () => {
    const [isGanttLoading, setLoading] = useState(false)

    if (isGanttLoading) {
        return (
            <div className="flex justify-center items-center">
                <Spinner />
            </div>
        );
    }

    return (
        <div class="w-full p-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className='flex gap-8'>
                <div className='w-[70%] flex items-start gap-4'>
                    <h1 className='text-base font-bold tracking-tight text-gray-900 dark:text-white'>Tasks Performance Report</h1>
                    <div className='task-status flex gap-4 flex-start flex-nowrap'>
                        {
                            taskStatuses.map(item => <div className='flex items-center  gap-2 text-xs mt-1'>
                                <div class={`relative inline-flex items-center  w-2.5 h-2.5 overflow-hidden ${item.class} rounded-full dark:bg-gray-600`}>
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

            <div className="">
                <ApexChart />
            </div>

        </div>


    );
};

export default TaskPerformance;
