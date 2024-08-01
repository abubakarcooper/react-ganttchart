import React from 'react'
import Heading from './Heading'
import Img1 from '../../../../../images/dpr/progressImg (1).svg'
import Img2 from '../../../../../images/dpr/progressImg (2).svg'
import Img3 from '../../../../../images/dpr/progressImg (3).svg'
import Img4 from '../../../../../images/dpr/progressImg (4).svg'
const ProgressAttachment = () => {
    return (
        <div className='w-97% xl:w-1200px m-auto my-7 flex flex-col gap-7'>
            <Heading heading='Progress Attachments' />
            <div>
                <h1 className='text-2xl font-medium text-primeryColor mb-2'>Images:</h1>
                <div className='flex  flex-wrap justify-between gap-2'>
                    <div className='w-[49.5%] '>
                        <img src={Img1} alt='img' className='w-full h-96 object-cover  rounded' />
                    </div>
                    <div className='w-[49.5%] '>
                        <img src={Img2} alt='img' className='w-full h-96 object-cover  rounded' />
                    </div>
                    <div className='w-[49.5%] '>
                        <img src={Img3} alt='img' className='w-full h-96 object-cover  rounded' />
                    </div>
                    <div className='w-[49.5%] '>
                        <img src={Img4} alt='img' className='w-full h-96 object-cover  rounded' />
                    </div>

                </div>
            </div>

            <div>
                <h1 className='text-2xl font-medium text-primeryColor mb-2'>Videos</h1>
                <div>
                    <iframe className="w-full" height="500px" src="https://www.youtube.com/embed/IjlYXtI2-GU?si=74PJGd3pdaGW0tIK" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
            </div>
        </div>
    )
}

export default ProgressAttachment