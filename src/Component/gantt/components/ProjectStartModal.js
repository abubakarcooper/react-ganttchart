import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Spinner } from "flowbite-react";
import { addRecord } from "../../../apis/estimatesheet";
import ganttMessage from "../../../constant/ganttMessage";


const ProjectStartModal = ({
    singleStartDateModalOpen,
    onSingleStartDateeModalClose,
    date,
    deliverableId,
    getEstimateDetailViewReport,
}) => {
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState(0);

    useEffect(() => {
        setStartDate(startDate);
    }, [singleStartDateModalOpen]);

    const handleSubmit = async () => {
        //     try {
        //         setLoading(true);
        //         let payloadQty = {
        //             Qty: quantity,
        //             Estimate_Deliverable: deliverableId,
        //             Field_Check: "qty",
        //         };

        //         const data = await addRecord(
        //             payloadQty,
        //             "All_Estimate_Popup_Db",
        //             "Estimate_Popup_DB"
        //         );
        //         if (!data) return toast.error(Messages.WENT_WRONG);
        //         toast.success(Messages.DATA_SUBMITTED);
        //         getEstimateDetailViewReport();
        //         onSingleStartDateeModalClose();
        //     } catch (err) {
        //         toast.error(err?.message || Messages.WENT_WRONG);
        //     } finally {
        //         setLoading(false);
        //     }
    };

    return (
        <>
            <Modal
                show={singleStartDateModalOpen}
                onClose={onSingleStartDateeModalClose}
            >
                <div className="rounded-lg" style={{ backgroundColor: "white" }}>
                    <Modal.Header>Select Date</Modal.Header>
                    <Modal.Body>
                        <div className="flex flex-col gap-4 mb-4">
                            <div>
                                <p className="text-xs text-left mb-1 text-lg">Project Start Date</p>
                                <input
                                    className="w-[100%] rounded-[5px] h-[38px] focus:outline-none border-[#6b728054] bg-[#eef2f8] text-xs  disabled:bg-slate-300 disabled:cursor-not-allowed"
                                    type="date"
                                    placeholder={new Date()}
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <button
                                disabled={loading}
                                onClick={handleSubmit}
                                type="button"
                                class="px-[8px] w-[100px] py-[4px] text-md font-semibold text-center text-white bg-primary-2 hover:bg-primary-1 focus:outline-none text-white-0 h-[35px] border rounded-[5px]"
                            >
                                {loading && <Spinner className="w-4 h-4 mr-2 mb-1" />}
                                Submit
                            </button>
                        </div>
                    </Modal.Body>
                </div>
            </Modal>
        </>
    );
};

export default ProjectStartModal;
