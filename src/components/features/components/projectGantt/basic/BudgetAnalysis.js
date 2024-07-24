import React, { useState } from "react";
import Dollar from '../../../../../images/Dollar-icon.svg';

const BudgetAnalysis = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const budgetDetails = [
    { label: "Estimated Budget", value: "8,100" },
    { label: "Labor Budget", value: "8,100" },
    { label: "Material Budget", value: "8,100" },
    { label: "Subconst Budget", value: "8,100" },
    { label: "Material Budget", value: "8,100" },
    { label: "Labor Charges", value: "8,100" },
    { label: "Material Charges", value: "8,100" },
  ];

  return (
    <>
      <div>
        <div className="relative bg-white rounded-xl ">

          <h3 className="text-[23px] font-bold text-black-900 my-4">
            Budget Analysis
          </h3>

          <div className="p-4 border rounded-xl">
            <h3 className="text-lg w-full font-bold text-black-900 my-2 mb-4">
              Budget Details
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {budgetDetails.map((item, index) => (
                <div key={index} className="px-4 py-4 rounded-lg" style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
                  <div className="text-[9px] lg:text-[15px] md:text-[13px] sm:text-[11px] font-semibold text-black">
                    {item.label}
                  </div>
                  <div className="flex text-lg md:text-2xl lg:text-3xl sm:text-xl my-2 font-semibold" style={{ color: "rgba(20, 57, 101, 1)" }}>
                    {item.value} <img src={Dollar} className="ml-2" alt="$" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BudgetAnalysis;