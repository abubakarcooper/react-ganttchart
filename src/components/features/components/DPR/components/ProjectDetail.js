import React from 'react'
import Heading from './Heading';
import Logo from '../../../../../images/worksheet/logo.svg'

const ProjectDetail = ({ openTask }) => {
    const data = [
        { label: 'Project Supervisor', value: openTask.Supervisor || 'N/A' },
        { label: 'Reference', value: openTask.Reference || 'N/A' },
        { label: 'Temperature', value: openTask.Temperature_and_Weather + 'F' || 'N/A' },
    ];

    return (
        <>
            <div className='w-97% m-auto flex flex-col gap-5'>
                <div className='flex justify-between items-center flex-col sm:flex-row gap-2 bg-white-2'>
                    <img src={Logo}></img>
                    <div className='px-3 flex items-center'>
                        <p className='text-black-2 text-base font-semibold'>Date <span className='px-1'> : </span> </p>
                        <h1 className='font-medium text-2xl text-primary-0'>11 July 2020</h1>
                    </div>
                </div>
                <Heading heading='Project Details' />
                <div className='border bg-white-2 shadow rounded flex'>
                    <div className=' flex flex-col gap-5 px-4 py-7 w-full'>
                        <div className='flex justify-between'>
                            <h1 className='text-black-2 text-base font-semibold'>Project Name</h1>
                            {/* <div className='px-3 flex items-center'>
                                <p className='text-black-2 text-base font-semibold'>Date <span className='px-1'> : </span> </p>
                                <h1 className='font-medium text-2xl text-primary-0'>11 July 2020</h1>
                            </div> */}
                        </div>
                        <h1 className='text-3xl sm:text-[44px] text-primary-0'>{openTask?.Project || '-'}</h1>
                    </div>

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