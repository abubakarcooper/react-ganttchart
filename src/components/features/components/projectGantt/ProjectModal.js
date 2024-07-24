import React, { useEffect, useState } from "react";
import { Modal, ModalBody } from "flowbite-react";
import TaskViewDetails from "./TaskDetails";
import TaskEditDetails from "./TaskEditModal";
import { Tabs } from "flowbite-react";
import { FaChartSimple } from "react-icons/fa6";
import { GiPieChart } from "react-icons/gi";
import { BiSolidReport } from "react-icons/bi";
import BudgetAnalysis from "./Budget";

{/* <ProjectModal isTaskModalOpen={isTaskModalOpen} handleTaskModelOpen={handleTaskModelOpen} /> */ }


const TaskModal = ({ isTaskModalOpen, handleTaskModelOpen, isType = 'view' }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [isBudgetTab, setIsBudgetTab] = useState(false);



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
                    setIsEditOpen(false)
                }}
            >
                <div className="rounded-lg" style={{ backgroundColor: "white", overflowY: 'scroll' }}>
                    <Modal.Header className="border-none pb-0" />
                    <ModalBody>

                        <Tabs
                            aria-label="Tabs with underline"
                            variant="underline"
                            onActiveTabChange={(tab) => setActiveTab(tab)}
                            className='ganttTabs taskTabs'
                        >
                            <Tabs.Item active title="Task Insights information" value="Task Insights information" className=''>
                                {
                                    activeTab == 0 &&
                                        isEditOpen ?
                                        <TaskEditDetails
                                            handleTaskModelOpen={handleTaskModelOpen}
                                            setIsEditOpen={setIsEditOpen}
                                            isEditOpen={isEditOpen}
                                        /> :
                                        <TaskViewDetails
                                            handleTaskModelOpen={handleTaskModelOpen}
                                            isTaskModal={isTaskModalOpen}
                                            setIsEditOpen={setIsEditOpen}
                                        />
                                }
                            </Tabs.Item>
                            <Tabs.Item title="Budget Analysis" value="Budget Analysis">
                                {activeTab === 1 && <BudgetAnalysis />}
                            </Tabs.Item>

                        </Tabs>
                    </ModalBody>
                </div>
            </Modal>

        </>
    );
};

export default TaskModal;