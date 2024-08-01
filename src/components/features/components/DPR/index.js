import { useState } from "react";
import { Button } from "flowbite-react";
import TaskFormDPR from "./TaskForrm";
import TaskViewDPR from "./TaskView";
import TaskModalDPR from "./modal/TaskModel";

const TaskDPReport = () => {
    const [showForm, setUseForm] = useState(false)
    const [showTaskView, setTaskView] = useState(false)
    const [isTaskModalOpen, setTaskModalOpen] = useState(false);


    const handleTaskModelOpen = () => {
        setTaskModalOpen(!isTaskModalOpen)
    }

    const handleTaskViewModelOpen = () => {
        setTaskView(!isTaskModalOpen)
    }

    return (
        <div className="myForm p-4 bg-white-2">
            <Button onClick={() => setTaskView(!showForm)}>Task Form Design</Button>
            <Button onClick={() => setTaskModalOpen(!isTaskModalOpen)}>Task View Design</Button>

            {
                <TaskModalDPR isTaskModalOpen={isTaskModalOpen} handleTaskModelOpen={handleTaskModelOpen} >
                    <TaskViewDPR handleTaskModelOpen={handleTaskModelOpen} isTaskModalOpen={isTaskModalOpen} />
                </TaskModalDPR>
            }

            {
                <TaskModalDPR isTaskModalOpen={showTaskView} handleTaskModelOpen={handleTaskViewModelOpen} >
                    <TaskFormDPR />
                </TaskModalDPR>
            }

        </div>
    );
};

export default TaskDPReport