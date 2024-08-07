import React from 'react'
import Heading from './Heading';

const ProjectDetail = ({ openTask }) => {
    const data = [
        { label: 'Project Supervisor', value: openTask.Supervisor || 'N/A' },
        { label: 'Reference', value: openTask.Reference || 'N/A' },
        { label: 'Temperature', value: openTask.Temperature_and_Weather + 'F' || 'N/A' },
    ];

    return (
        <>
            <div className='w-97% m-auto flex flex-col gap-5'>
                <Heading heading='Project Details' />
                <div className='shadow rounded flex flex-col gap-5 px-4 py-7 border bg-white-2'>
                    <h1 className='text-black-2 text-base font-semibold'>Project Name</h1>
                    <h1 className='text-3xl sm:text-[44px] text-primary-0'>{openTask?.Project || '-'}</h1>
                </div>


                <div className='flex flex-col sm:flex-row gap-4 text-center lg:text-start justify-between items-center'>
                    {data.map((item, index) => (
                        <div key={index} className='w-4/6 sm:w-2/6 shadow rounded flex flex-col gap-2 px-3 py-6  bg-white-2'>
                            <h1 className='text-black-2 text-base font-semibold'>{item.label}</h1>
                            <h1 className='text-primary-0 text-2xl font-medium'>{item.value}</h1>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ProjectDetail