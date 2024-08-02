import React from "react";
import { Modal, ModalBody } from "flowbite-react";
const TaskModalDPR = ({ isTaskModalOpen, handleTaskModelOpen, children }) => {
    // const [isModalOpen, setIsModalOpen] = useState(false);
    // useEffect(() => {
    //     setIsModalOpen(isTaskModalOpen)
    // }, [isTaskModalOpen])

    return (
        <>
            <Modal
                show={isTaskModalOpen}
                size={"7xl"}
                className="min-h-[600px]"
                onClose={handleTaskModelOpen}
            >
                <div className="rounded-lg hello" style={{ backgroundColor: "white", overflowY: 'scroll' }}>
                    <Modal.Header className="border-none pb-0" />
                    <ModalBody className="p-5 pt-2">
                        <div>
                            {children}
                        </div>
                    </ModalBody>
                </div>
            </Modal>

        </>
    );
};

export default TaskModalDPR;