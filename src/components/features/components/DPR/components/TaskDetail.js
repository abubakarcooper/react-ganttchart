import React from 'react'
import Heading from './Heading'
const TaskDetail = () => {
    return (
        <div className='w-97% xl:w-1200px m-auto flex flex-col gap-3'>
            <Heading heading='Task Details' />

            {
                [1, 2].map(item => <div className='task'>
                    <div className='rounded-xl px-3 py-7 bg-gray-5'>
                        <h1 className='text-primary-0 text-4xl font-medium'>1. <span className='text-black-2 text-2xl font-semibold'>Task Name</span></h1>
                        <h1 className='text-primary-0 text-2xl font-medium mt-2'>Wall</h1>
                    </div>

                    <div className='shadow py-4 px-3 rounded-xl bg-white-2 mt-4'>
                        <h1 className='text-lightBlack text-base font-semibold mb-3'>Work Completed Work Completed</h1>
                        <div>
                            <ul class="list-disc pl-5 flex flex-col gap-2">
                                {
                                    [1, 2, 3, 4].map(item =>
                                        <div className='flex justify-between'>
                                            <li className='text-lg font-medium'>Wall Installation</li>
                                            <p className='bg-orange-0 text-white-0 text-[9px] flex items-center justify-center px-3 rounded-xl font-medium'>InProgress</p>
                                        </div>
                                    )
                                }

                            </ul>
                        </div>
                    </div>
                    <div className=' shadow rounded-lg px-3 py-6 flex flex-col gap-4  mt-4'>
                        <h1 className='text-base font-semibold text-lightBlack'>Remarks / Comments</h1>
                        <p className='font-semibold text-xs text-primeryColor'>Paragraphs are the building blocks of papers. Many students have define paragraphs in terms of length: a paragraph is a group of students at least five sentences, a paragraph is half a pages long, etc. In reality, </p>
                    </div>

                    <div className='border-2 border-BorderColor2 my-2'></div>
                </div>)
            }

        </div>
    )
}

export default TaskDetail