import React, { useEffect, useState } from 'react'
import Heading from './Heading'
const TaskDetail = ({ openTask }) => {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        gatherTasks(openTask)
    }, [openTask])

    const gatherTasks = (openTask) => {
        console.log(openTask?.Completed_Task_Details, 'openTask?.Completed_Task_Details')
        const completedTasks = openTask?.Completed_Task_Details?.map((item) => {
            const [task, report, percentage, dprId, equipmentUsed, taskStatus, recordStatus, id] = item.display_value.split('##$$')
            return {
                task, report, percentage, dprId, equipmentUsed, taskStatus, recordStatus, id
            }
        });
        setTasks(completedTasks)
    }

    return (
        <div className='w-97% xl:w-1200px m-auto flex flex-col gap-3'>
            <Heading heading='Task Details' />

            {
                tasks.map((task, index) => (
                    <div key={index} className='task'>
                        <div className='rounded-xl px-3 py-7 bg-gray-5'>
                            <h1 className='text-primary-0 text-4xl font-medium'>
                                {index + 1}.<span className='text-black-2 text-2xl font-semibold'>

                                    Task Name
                                </span>
                            </h1>
                            <div className='text-primary-0 font-medium mt-2 sm:flex justify-between'>
                            <h1 className='text-2xl'>{task?.task || 'N/A'}</h1>
                            <div className='flex justify-end'>
                            <p className='bg-orange-0 text-white-0 px-3 rounded-xl text-xl inline-block'>{task.taskStatus}</p>
                            </div>
                            </div>
                         </div>
                            {/* <div className='shadow py-4 px-3 rounded-xl bg-white-2 mt-4 w-[50%]'>
                                <h1 className='text-lightBlack text-base font-semibold mb-3'>Work Completed</h1>
                                <ul className='list-disc pl-5 flex flex-col gap-2'>
                                    {
                                        [1, 2, 3, 4].map(item => (
                                            <li key={item} className='flex justify-between'>
                                                <span className='text-lg font-medium'>Wall Installation</span>
                                                <p className='bg-orange-0 text-white-0 text-[9px] flex items-center justify-center px-3 rounded-xl font-medium'>InProgress</p>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div> */}
                        <div className='flex flex-col sm:flex-row items-center sm:items-stretch gap-4 pt-4'>

                            <div className='shadow rounded-lg px-3 py-6 flex flex-col gap-4 w-9/12 sm:w-1/2'>
                                <h1 className='text-base font-semibold text-lightBlack'>Work Completed </h1>
                                <p className='font-semibold text-xs text-primeryColor'>
                                    Progress Update: We’ve completed [percentage]% of the work. Thank you for your patience!
                                </p>
                            </div>

                            <div className='shadow rounded-lg px-3 py-6 flex flex-col gap-4 w-9/12 sm:w-1/2'>
                                <h1 className='text-base font-semibold text-lightBlack'>Remarks / Comments</h1>
                                <p className='font-semibold text-xs text-primeryColor'>
                                    {
                                        task?.report || 'N/A'
                                    }
                                </p>
                            </div>
                        </div>

                        <div className='border-2 border-BorderColor2 my-2'></div>
                    </div>
                ))
            }


        </div>
    )
}

export default TaskDetail