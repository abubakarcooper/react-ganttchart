import React from 'react'
import Heading from './Heading'
const ProgressAttachment = ({ openTask }) => {
console.log(openTask.images,'openTask.images openTask.images')
    return (
        <div className='w-full my-7 flex flex-col gap-7'>
            <Heading heading='Progress Attachments' />
            {openTask.images.length >= 1 &&
                <div>
                    <h1 className='text-2xl font-medium text-primeryColor mb-2'>Images:</h1>
                    <div className='flex flex-wrap gap-2 w-full justify-center'>
                        {
                            openTask.images.map(item =>
                             <div className='w-[80%] sm:w-[49%] border rounded-xl flex items-center'>
                                <img src={item} alt='img' className='w-full object-contain  rounded' />
                            </div>)
                        }
                    </div>
                </div>
            }

            {openTask.videos.length >= 1 &&
                <div>
                    <h1 className='text-2xl font-medium text-primeryColor mb-2'>Videos</h1>
                    {
                        openTask.videos.map(item => <div className='mb-4'>
                            <video src={item} controls className='w-full h-full'></video>
                            {/* <iframe className="w-full" height="500px" src={item} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
                        </div>)
                    }
                </div>
            }
        </div>
    )
}

export default ProgressAttachment