import { useState } from "react";
import Table from "./Table";

const TaskDocumentTab = () => {
    const [selectedStatus, setSelectedStatus] = useState("Completed");
    return (
        <div className="">
            <div className="flex flex-col sm:flex-row py-5">
                <div className="text-2xl font-extrabold mb-2 sm:mb-0">
                    Asbestos Testing <span className='text-sm font-black'>- Asbestos testing by certified asbestos consultant</span>
                </div>
                <div className="">
                </div>
            </div>
            <Table />
        </div>
    );
};
export default TaskDocumentTab