import React, { useEffect, useState } from "react";
import { Modal, ModalBody } from "flowbite-react";
import { Tabs } from "flowbite-react";
import TaskBasicTab from "./basic/TaskBasicTab";
import TaskDocumentTab2 from './documents/TaskDocumentTab2'
import NoDataImg from '../../../../images/noData.png'

const TaskModal = ({ isTaskModalOpen, handleTaskModelOpen, isType = 'view' }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        setIsModalOpen(isTaskModalOpen)
    }, [isTaskModalOpen])

    return (
        <>
            <Modal
                show={isModalOpen}
                size={"6xl"}
                onClose={() => {
                    handleTaskModelOpen()
                }}
            >
                <div className="rounded-lg" style={{ backgroundColor: "white", overflowY: 'scroll' }}>
                    <Modal.Header className="border-none pb-0" />
                    <ModalBody>
                        <div>
                            <Tabs variant="underline" className="tasktabs gap-2">
                                <Tabs.Item active title="Basic" className="min-w-20	">
                                    <TaskBasicTab handleTaskModelOpen={handleTaskModelOpen} />
                                </Tabs.Item>
                                <Tabs.Item title="Available Resources" >
                                    <div className="flex justify-center">
                                        <img src={NoDataImg} alt="image" />
                                    </div>
                                    {/* <NoDataImg /> */}
                                </Tabs.Item>

                                <Tabs.Item title="Task Assignment" >
                                    <div className="flex justify-center">
                                        <img src={NoDataImg} alt="image" />
                                    </div>
                                </Tabs.Item>

                                <Tabs.Item title="Material Allocation" >
                                    <div className="flex justify-center">
                                        <img src={NoDataImg} alt="image" />
                                    </div>
                                </Tabs.Item>

                                <Tabs.Item title="Documents" >
                                    <TaskDocumentTab2 />
                                </Tabs.Item>
                            </Tabs>
                        </div>
                    </ModalBody>
                </div>
            </Modal>

        </>
    );
};

export default TaskModal;