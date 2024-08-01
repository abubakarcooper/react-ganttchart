import React from 'react'

const Heading = ({ heading }) => {
    return (
        <div className='bg-primary-0 text-white-0 text-lg font-bold px-5 py-2 rounded-lg'>
            <h1>{heading}</h1>
        </div>
    )
}

export default Heading