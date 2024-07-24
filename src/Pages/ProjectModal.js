import React, { useState } from "react";
import Preparation from "./Prepration";
import TaskDetails from "./TaskDetails";
import Budget from "./Budget";


const ProjectModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleToggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const [currentpage, setCurrentPage] = useState(1)
    const backpage = () => {
        if (currentpage > 1) {
            setCurrentPage(currentpage - 1);
        }
    }



    return (
        <>
            <button
                onClick={handleToggleModal}
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
            >
                Toggle modal
            </button>
            {isModalOpen && (
                <div>
                    <div class=" bg-opacity-0 fixed py-20 w-full h-full overflow-y-auto overflow-x-auto z-99 left-0 top-0">
                        <div className="max-w-4xl w-11/12 sm:w-[70%] mx-auto p-3 sm:p-6 bg-white-2 rounded-lg shadow-md space-y-6">
                            <div>
                                {currentpage === 1 && <Preparation />}
                                {currentpage === 2 && <TaskDetails />}
                                {currentpage === 3 && <Budget />}
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => backpage()}
                                    className="px-8 sm:px-14 py-2 text-sm font-semibold text-primary-0 bg-gray-100 rounded-md">
                                    Cancel
                                </button>
                                <button
                                    onClick={() => { setCurrentPage(currentpage + 1) }}
                                    className="px-8 sm:px-14 py-2 text-sm font-semibold text-white-2 bg-primary-0 rounded-md">
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProjectModal;