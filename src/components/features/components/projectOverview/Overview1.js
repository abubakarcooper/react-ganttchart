import React from 'react';
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const items = [
    { name: 'Start Date', value: 'October 12, 2024' },
    { name: 'End Date', value: 'October 12, 2024' },
    { name: 'Days left', value: '120 Days' },
    { name: 'Total Days', value: '100 Days' },
    { name: 'Address/Location', value: '4th Street Southwest (Washington, D.C.)' },
];

const OverviewCard = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="bg-white rounded-3xl p-5 border-2 w-full" style={{ background: "white" }}>
                <div className="flex justify-between items-center pr-4">
                    <div className="rounded-xl px-3 text-sm font-bold py-1" style={{ background: "rgba(236, 253, 243, 1)", letterSpacing: "1px", color: "rgba(18, 183, 106, 1)" }}>
                        Ongoing Project
                    </div>
                    <div className="items-center"><HiOutlineDotsHorizontal className='text-2xl' /></div>
                </div>

                <h2 className="text-base font-bold mt-4">Project Name</h2>
                <p className="text-gray-500 mt-1 mb-4 text-xs">Company Name</p>
                <div style={{ height: "1px", width: "100%", background: "lightgray" }}></div>

                <div className="mt-4">
                    <div className="flex justify-between mb-6">
                        <p className="font-bold text-sm">Client: Alex John</p>
                    </div>

                    <div className="flex flex-wrap -mx-2">
                        {items.map((item, index) => (
                            <div
                                key={index}
                                className={`flex flex-col w-1/2 px-2 mb-5 ${index % 2 === 1 ? 'items-end' : ''}`}
                            >
                                <p className="font-medium text-xs text-gray-400 leading-4 mb-2">{item.name}</p>
                                <p className="font-semibold text-sm leading-4">{item.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverviewCard;