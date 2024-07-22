import { useState } from "react";
import logo from "../../images/worksheet/logo.svg"

export default function EstimateGanttQuickInfo() {
    const [singleDateModalOpen, setSingleDateModalOpen] = useState(false);

    return (
        <div className="p-[8px] quickinfo bg-green-0 border-solid border border-primary-3 flex justify-between">
            <div className="topbar flex flex-row gap-1 w-[70%] justtify">
                <div>
                    <a href="https://creatorapp.zoho.com/cooperdevelopment/cooper-build/#Report:All_Estimate_Worksheets" target="_blank" className="cursor-pointer">
                        <img src={logo} alt="logo here..." className="w-[120px]" />
                    </a>
                </div>
                <div className="flex text-primary-0">
                    {/* <h2 className="text-xl font-semibold">0654</h2> */}
                    <h2 className="text-xl font-semibold leading-tight mt-[8px] ml-2">112 South 2nd Street Brooklyn</h2>
                    {/* <h2 className="text-xl font-semibold ml-2">$10,000.00</h2>
                    <h2 className="text-xl font-semibold ml-2">30 Days</h2> */}
                </div>
            </div>

            <div className="projectDetail w-[100%] relative top-[2px]">
                <div className="flex gap-[25px] flex-row-reverse relative">
                    <div className="flex flex-col justify-center items-start">
                        <div>
                            <label className="text-sm font-medium text-gray-1">
                                Total Days
                            </label>
                        </div>
                        <div>
                            <p className="text-sm">20 Days</p>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center items-start">
                        <div>
                            <label className="text-sm font-medium text-gray-1">Remaining Days</label>
                        </div>
                        <div>
                            <p className="text-sm">15 Days</p>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center items-start">
                        <div>
                            <label className="text-sm font-medium text-gray-1">Project Creator</label>
                        </div>
                        <div>
                            <p className="text-sm">Adim Hicks</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}