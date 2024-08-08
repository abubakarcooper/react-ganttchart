import React from 'react'
import Heading from './Heading'
import Img1 from '../../../../../images/dpr/progressImg (1).svg'
import Img2 from '../../../../../images/dpr/progressImg (2).svg'
import Img3 from '../../../../../images/dpr/progressImg (3).svg'
import Img4 from '../../../../../images/dpr/progressImg (4).svg'
const ProgressAttachment = ({ openTask }) => {

    return (
        <div className='w-97% xl:w-1200px m-auto my-7 flex flex-col gap-7'>
            <Heading heading='Progress Attachments' />
            {openTask.images.length >= 1 &&
                <div>
                    <h1 className='text-2xl font-medium text-primeryColor mb-2'>Images:</h1>
                    <div className='flex  flex-wrap justify-between gap-2'>
                        {
                            openTask.images.map(item => <div className='w-[49.5%] border rounded-xl flex items-center'>
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