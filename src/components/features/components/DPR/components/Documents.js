import React from 'react'
import DoumentLogo from '../../../../../images/dpr/documentLogo.svg'

const files = [
    { name: 'Fidelity Collections.pdf', size: '200 KB' },
    { name: 'Fidelity Collections.pdf', size: '200 KB' },
    { name: 'Fidelity Collections.pdf', size: '200 KB' },
];
const Documents = () => {
    return (
        <div className='w-97% xl:w-1200px m-auto my-5 flex flex-col gap-3'>
            <h1 className='text-primeryColor text-2xl font-medium'>Documents</h1>
            <div className='flex flex-col gap-3'>
                {files.map((file, index) => (
                    <div key={index} className='flex gap-3 border border-BorderColor rounded-xl p-4'>
                        <img src={DoumentLogo} alt='Document logo' className='w-16 h-12' />
                        <div className='text-base font-medium'>
                            <h1>{file.name}</h1>
                            <p className='text-lightGray'>{file.size}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Documents