import React, { useEffect, useState } from 'react'
import Heading from './Heading'
import BoyImg from '../../../../../images/dpr/BoyAvatar.svg'
import GirlImg from '../../../../../images/dpr/GirlAvatar.svg'
import ImgNoData from '../../../../../images/noData.png'

const data = [
    { id: 1, img: BoyImg, name: 'John Alex', profession: 'Carpenter' },
    { id: 2, img: GirlImg, name: 'Alexa DD', profession: 'Electrician' },
    { id: 3, img: BoyImg, name: 'John Alex', profession: 'Carpenter' },
    { id: 4, img: BoyImg, name: 'John Alex', profession: 'Carpenter' },
    { id: 5, img: BoyImg, name: 'John Alex', profession: 'Carpenter' },
];

const WorkerDetail = ({ openTask }) => {
    console.log(openTask, 'openTaskopenTaskopenTaskopenTaskopenTaskopenTaskopenTask')
    return (
        <div className='w-full m-auto'>
            <Heading heading='Worker Details' />
            <div className='flex flex-wrap justify-center lg:justify-start gap-2 my-4'>

                {openTask?.workers?.length ? openTask?.workers.map(({ id, name }, i) => (
                    <div key={id} className='shadow rounded-xl flex items-center justify-center lg:justify-start gap-3 w-[32.5%] p-4'>
                        <img src={BoyImg} alt='img' className='w-28 h-28' />
                        <div>
                            <h1 className='text-primary-0 text-4xl font-medium mb-2'>{i + 1}</h1>
                            <h1 className='text-black-2 text-2xl font-semibold'>{name}</h1>
                            <p className='text-gray-2 text-base font-semibold'>{'Supervisor'}</p>
                        </div>
                    </div>
                )) : <div className='flex justify-center w-full'>
                    <img src={ImgNoData} alt="No data available" className="mx-auto" style={{ width: '200px' }} />
                </div>
                }
            </div>

        </div>
    )
}

export default WorkerDetail