import React from 'react'
import Heading from './Heading'
import BoyImg from '../../../../../images/dpr/BoyAvatar.svg'
import GirlImg from '../../../../../images/dpr/GirlAvatar.svg'

const data = [
    { id: 1, img: BoyImg, name: 'John Alex', profession: 'Carpenter' },
    { id: 2, img: GirlImg, name: 'Alexa DD', profession: 'Electrician' },
    { id: 3, img: BoyImg, name: 'John Alex', profession: 'Carpenter' },
    { id: 4, img: BoyImg, name: 'John Alex', profession: 'Carpenter' },
    { id: 5, img: BoyImg, name: 'John Alex', profession: 'Carpenter' },
];

const WorkerDetail = () => {
    return (
        <div className='w-full m-auto'>
            <Heading heading='Worker Details' />
            <div className='flex flex-wrap gap-3 my-4'>
                {data.map(({ id, img, name, profession }) => (
                    <div key={id} className='shadow rounded-xl flex items-center gap-2 w-[350px] md:w-[32.3%] p-4'>
                        <img src={img} alt='img' className='w-28 h-28' />
                        <div>
                            <h1 className='text-primary-0 text-4xl font-medium mb-2'>{id}.</h1>
                            <h1 className='text-black-2 text-2xl font-semibold'>{name}</h1>
                            <p className='text-gray-2 text-base font-semibold'>{profession}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default WorkerDetail