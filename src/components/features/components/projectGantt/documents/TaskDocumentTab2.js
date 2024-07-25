import { useState } from "react";
import Table from "./Table";
import SubmittalModal from "./SubmittalModel";

const TaskDocumentTab = () => {
    const [selectedStatus, setSelectedStatus] = useState("Completed");
    const [submittalModalOpen, setSubmittalModalOpen] = useState(false);

    const handleSubmittalModal = () => {
        setSubmittalModalOpen(!submittalModalOpen);
    };

    console.log(submittalModalOpen)
    return (
        <div className="">
            <div className="flex flex-col sm:flex-row py-5 justify-between ">
                <div className="text-2xl font-extrabold mb-2 sm:mb-0">
                    Asbestos Testing <span className='text-sm font-black'>- Asbestos testing by certified asbestos consultant</span>
                </div>
                <button
                    className="px-4  py-2 text-sm font-semibold text-white-2 bg-primary-0 rounded-lg" onClick={handleSubmittalModal}>
                    Add Document
                </button>

            </div>
            <Table />

            {submittalModalOpen && (
                <SubmittalModal
                    // deliverable={{ label: title, value: id }}
                    // task={taskLabel}
                    submittalModalOpen={submittalModalOpen}
                    onSubmitalModalClose={handleSubmittalModal}
                />
            )}
        </div>
    );
};
export default TaskDocumentTab