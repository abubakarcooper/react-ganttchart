import { Popover, Button } from 'flowbite-react'
import React from 'react'

const PopOverModel = () => {
    return (
        <>
            <div className="">
                <Popover
                    aria-labelledby="default-popover"
                    content={
                        <div className="w-72  text-sm text-gray-500 dark:text-gray-400">
                            <div className=" pl-4 pt-4 pb-2">
                                <h3 id="default-popover" className="font-bold text-base text-primary-0">Select Column</h3>
                            </div>
                            <div className="py-2 bg-white-2 text-primary-0">
                                <div className="flex items-center border-b py-3.5 pl-4"><input type="checkbox" /><p className="ml-2">Project Name</p></div>
                                <div className="flex items-center border-b py-3.5 pl-4"><input type="checkbox" /><p className="ml-2">Task Name</p></div>
                                <div className="flex items-center border-b py-3.5 pl-4"><input type="checkbox" /><p className="ml-2">Reference</p></div>
                                <div className="flex items-center border-b py-3.5 pl-4"><input type="checkbox" /><p className="ml-2">Supervisor</p></div>
                                <div className="mt-6 mb-3">
                                    <button
                                        className="py-2 text-sm font-semibold text-white-2 bg-primary-0 rounded-lg flex items-center justify-center w-[160px] m-auto">
                                        Done
                                    </button></div>
                            </div>
                        </div>
                    }
                >
                    <Button>Default popover</Button>
                </Popover>
            </div>
            {/* ///// model 2 ///// */}
            <div className="">
                <Popover
                    aria-labelledby="default-popover"
                    content={
                        <div className="w-72  text-sm text-gray-500 dark:text-gray-400">
                            <div className=" pl-4 pt-4 pb-2">
                                <h3 id="default-popover" className="font-bold text-base text-primary-0">Sort By</h3>
                            </div>
                            <div className="py-2 bg-white-2 text-primary-0">
                                <div className="flex items-center border-b py-3.5 pl-4"><p className="ml-2">Project Name</p></div>
                                <div className="flex items-center border-b py-3.5 pl-4"><p className="ml-2">Date</p></div>
                                <div className="flex items-center border-b py-3.5 pl-4"><p className="ml-2">Task Name</p></div>
                                <div className="flex items-center border-b py-3.5 pl-4"><p className="ml-2">Reference</p></div>
                                <div className="mt-6 mb-3">
                                    <button
                                        className="py-2 text-sm font-semibold text-white-2 bg-primary-0 rounded-lg flex items-center justify-center w-[160px] m-auto">
                                        Done
                                    </button></div>
                            </div>
                        </div>
                    }
                >
                    <Button>Default popover</Button>
                </Popover>
            </div>


        </>
    )
}

export default PopOverModel