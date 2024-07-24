import React, { useState } from "react";
import Eye from '../images/Eye.svg';
import Pdf from '../images/Pdf.svg';

const AddedDocument = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div>
        <button
          onClick={handleToggleModal}
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          Toggle modal
        </button>

        {isModalOpen && (
          <div className=" bg-opacity-0 fixed py-20 w-full h-full overflow-y-auto overflow-x-auto z-50 left-0 top-0">
            <div className="max-w-4xl w-11/12 sm:w-[70%] mx-auto p-3 sm:p-6  rounded-lg shadow-md space-y-6 bg-white-2">
              <div className="relative bg-white rounded-xl">
                <div className="flex items-center justify-between rounded-t mb-2">
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                    onClick={handleToggleModal}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                  </button>
                </div>

                <h3 className="text-lg font-bold text-black-900 my-2 mb-2">
                  Added Document
                </h3>

                <div className="container mx-auto py-2">
                  <div className="grid grid-cols-1 gap-2">
                    <div className="bg-white border-2 rounded-md px-2 sm:px-4 lg:px-4 md:px-4 py-2">
                      <div className="flex justify-between items-center">
                        <span className="flex ml-2 text-gray-900 items-center lg:text-[15px] md:text-[15px] text-[10px] font-medium"> <img className="mr-2" src={Pdf} alt="" /> Fidelity Collections.pdf <span className="ml-4 items-center text-sm" style={{ color: "gray" }}>200 KB</span> </span>
                        <button className="ml-4 rounded-full p-2 text-gray-500 hover:text-gray-900">
                          <img src={Eye} alt="Eye" />
                        </button>
                      </div>
                    </div>

                    <div className="bg-white border-2 rounded-md px-2 sm:px-4 lg:px-4 md:px-4 py-2">
                      <div className="flex justify-between items-center">
                        <span className="flex ml-2 text-gray-900 items-center lg:text-[15px] md:text-[15px] text-[10px] font-medium"> <img className="mr-2" src={Pdf} alt="" /> Fidelity Collections.pdf <span className="ml-4 items-center text-sm" style={{ color: "gray" }}>200 KB</span> </span>
                        <button className="ml-4 rounded-full p-2 text-gray-500 hover:text-gray-900">
                          <img src={Eye} alt="Eye" />
                        </button>
                      </div>
                    </div>

                    <div className="bg-white border-2 rounded-md px-2 sm:px-4 lg:px-4 md:px-4 py-2">
                      <div className="flex justify-between items-center">
                        <span className="flex ml-2 text-gray-900 items-center lg:text-[15px] md:text-[15px] text-[10px] font-medium"> <img className="mr-2" src={Pdf} alt="" /> Fidelity Collections.pdf <span className="ml-4 items-center text-sm" style={{ color: "gray" }}>200 KB</span> </span>
                        <button className="ml-4 rounded-full p-2 text-gray-500 hover:text-gray-900">
                          <img src={Eye} alt="Eye" />
                        </button>
                      </div>
                    </div>

                  </div>
                  <div className="flex justify-end mt-4">
                    <button className="bg-blue-500 text-white-0 font-normal py-2 px-12 rounded-lg " style={{ background: "#183c64", color: "white" }}>
                      Done
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AddedDocument;