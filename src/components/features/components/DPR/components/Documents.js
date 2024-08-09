import React from 'react'
import DoumentLogo from '../../../../../images/dpr/documentLogo.svg'
import { getFileNameFromUrl } from '../../../../../utils/func';

const files = [
    { name: 'Fidelity Collections.pdf', size: '200 KB' },
    { name: 'Fidelity Collections.pdf', size: '200 KB' },
    { name: 'Fidelity Collections.pdf', size: '200 KB' },
];
const Documents = ({ openTask }) => {
    return (
        <>
            {openTask.pdfs.length &&
                <div className='w-97% xl:w-1200px m-auto my-5 flex flex-col gap-3'>
                    <h1 className='text-primeryColor text-2xl font-medium'>Documents</h1>
                    <div className='flex flex-col gap-3'>
                        {openTask.pdfs.map((file, index) => (
                            <a key={index} className='flex items-center gap-3 border border-BorderColor rounded-xl p-4' href={file} target='_blank'>
                                <img src={DoumentLogo} alt='Document logo' className='w-16 h-12' />
                                <div className='text-sm sm:text-base font-medium'>
                                    <h1>{getFileNameFromUrl(file)}</h1>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            }
        </>
    )
}
export default Documents