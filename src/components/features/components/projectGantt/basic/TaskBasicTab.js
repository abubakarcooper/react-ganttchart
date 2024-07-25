import React, { useEffect, useState } from "react";
import { Modal, ModalBody } from "flowbite-react";
import TaskViewDetails from "./TaskViewDetails";
import TaskEditDetails from "./TaskEditDetails";
import { Tabs } from "flowbite-react";
import BudgetAnalysis from "./BudgetAnalysis";
import GanttChartPage from "../../../../../Pages/page";

const TaskBasicTab = ({ isTaskModalOpen, handleTaskModelOpen }) => {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Tabs
            aria-label="Tabs with underline"
            variant="underline"
            onActiveTabChange={(tab) => setActiveTab(tab)}
            className='ganttTabs'
        >
            <Tabs.Item active title="Task Insights information" value="Task Insights information" className=''>
                {

                    activeTab == 0 ?
                        isEditOpen ?
                            <TaskEditDetails
                                handleTaskModelOpen={handleTaskModelOpen}
                                setIsEditOpen={setIsEditOpen}
                                isEditOpen={isEditOpen}
                            /> :
                            <TaskViewDetails
                                handleTaskModelOpen={handleTaskModelOpen}
                                setIsEditOpen={setIsEditOpen}
                            /> : null
                }
            </Tabs.Item>
            <Tabs.Item title="Budget Analysis" value="Budget Analysis">
                {activeTab === 1 && <BudgetAnalysis />}
            </Tabs.Item>
        </Tabs>
    );
};

export default TaskBasicTab;