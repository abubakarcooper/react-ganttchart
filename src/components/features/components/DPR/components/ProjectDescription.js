import React from 'react'
import Heading from './Heading'

const ProjectDescription = ({ openTask }) => {
    return (
        <>
            <div className='w-full xl:w-[1200px] m-auto my-4'>
                <Heading heading='Description' />
                <div className='mt-4'>
                    <p className='text-black-2 text-sm px-2 sm:px-1 break-words'>
                        {openTask.Description || 'N/A'}
                    </p>
                </div>
            </div>
        </>
    )
}

export default ProjectDescription
