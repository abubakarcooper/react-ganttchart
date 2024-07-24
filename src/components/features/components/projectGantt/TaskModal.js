import React, { useEffect, useState } from "react";
import { Modal, ModalBody } from "flowbite-react";
import TaskViewDetails from "./basic/TaskViewDetails";
import TaskEditDetails from "./basic/TaskEditDetails";
import { Tabs } from "flowbite-react";
import BudgetAnalysis from "./basic/BudgetAnalysis";
import TaskBasicTab from "./basic/TaskBasicTab";



const TaskModal = ({ isTaskModalOpen, handleTaskModelOpen, isType = 'view' }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                        <TaskBasicTab handleTaskModelOpen={handleTaskModelOpen} />
                        {/* <Tabs
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
                        </Tabs> */}
                    </ModalBody>
                </div>
            </Modal>

        </>
    );
};

export default TaskModal;