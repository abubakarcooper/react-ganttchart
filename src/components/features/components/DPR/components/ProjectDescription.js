import React from 'react'
import Heading from './Heading'
import ImgNoData from '../../../../../images/noData.png'

const ProjectDescription = ({ openTask }) => {
    return (
        <>
            <div className='w-full xl:w-[1200px] m-auto my-4'>
                <Heading heading='Description' />
                <div className='mt-4'>
                    {
                        openTask.Description ?
                            <p className='text-black-2 text-sm px-2 sm:px-1 break-words'>
                                {openTask.Description || 'N/A'}
                            </p> :

                            <div className='flex justify-center w-full'>
                                <img src={ImgNoData} alt="No data available" className="mx-auto" style={{ width: '200px' }} />
                            </div>
                    }

                </div>
            </div>
        </>
    )
}

export default ProjectDescription
