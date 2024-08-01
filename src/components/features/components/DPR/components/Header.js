import React from 'react'
import Logo from '../../../../../images/dpr/logo.svg'
import Message from '../../../../../images/dpr/message.svg'
import Mobile from '../../../../../images/dpr/mobile.svg'
import Earth from '../../../../../images/dpr/earth.svg'

const Header = () => {
    return (
        <>
            <div className='bg-slate-100 py-3'>
                <div className='w-3/4 md:w-520px m-auto text-center'>
                    <img src={Logo} alt='company-logo' className='w-2/3 md:w-450px m-auto' />
                    <h1 className='text-sm sm:text-lg md:text-2xl font-semibold mt-4'>276 Fifth Ave Ste 704 PMB 170, New York NY 10001</h1>
                </div>
            </div>

            <div className='bg-primary-0'>
                <div className='xl:w-1200px m-auto flex flex-col sm:flex-row items-center gap-4 sm:gap-0 justify-between py-2 px-4 text-white-0 font-semibold'>
                    <div className='flex'>
                        <img src={Message} alt='img' />
                        <p className='ml-3'>info@cooperbuild.com</p>
                    </div>
                    <div className='flex'>
                        <img src={Earth} alt='img' />
                        <p className='ml-3'>www.cooperbuild.com</p>
                    </div>
                    <div className='flex'>
                        <img src={Mobile} alt='img' />
                        <p className='ml-3'>+1 (631) 213 1170</p>
                    </div>
                </div>
            </div>

            <div className='text-center text-3xl sm:text-5xl font-bold my-12'>
                <h1>Daily Progress Report</h1>
            </div>
        </>
    )
}

export default Header