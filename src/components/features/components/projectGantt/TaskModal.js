import React, { useEffect, useState } from "react";
import { Modal, ModalBody } from "flowbite-react";
import { Tabs } from "flowbite-react";
import TaskBasicTab from "./basic/TaskBasicTab";
import GanttChartPage from "../../../../Pages/page";
import Table from "../../../../components/features/components/projectGantt/documents/Table";



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
                        <div className="">
                            <Tabs variant="underline" className="tasktabs gap-2">
                                <Tabs.Item active title="Basic" className="min-w-20	">
                                    <TaskBasicTab handleTaskModelOpen={handleTaskModelOpen} />
                                </Tabs.Item>
                                <Tabs.Item title="Available Resources" >
                                    <TaskBasicTab handleTaskModelOpen={handleTaskModelOpen} />
                                </Tabs.Item>


                                <Tabs.Item title="Task Assignment" >
                                </Tabs.Item>
                                <Tabs.Item title="Material Allocation" >
                                </Tabs.Item>
                                <Tabs.Item title="Documents" >
                                    <Table />
                                </Tabs.Item>
                            </Tabs>
                        </div>
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