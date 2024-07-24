import React, { useEffect, useState } from "react";
import Preparation from "./Prepration";
import TaskDetails from "./TaskDetails";
import Budget from "./Budget";


const TaskEditDetails = ({ setIsEditOpen, isEditOpen }) => {
    return (
        <div class=" ">
            <div className="">
                <div>
                    <Preparation />
                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            onClick={() => setIsEditOpen(!isEditOpen)}
                            className="px-8 sm:px-14 py-2 text-sm font-semibold text-primary-0 bg-gray-100 rounded-md border border-primary-0 w-[152px]">
                            Cancel
                        </button>
                        <button
                            className="px-8 sm:px-14 py-2 text-sm font-semibold text-white-2 bg-primary-0 rounded-md w-[152px]">
                            Save
                        </button>
                    </div>
                    <Budget />
                </div>
            </div>
        </div>
    );
};

export default TaskEditDetails;