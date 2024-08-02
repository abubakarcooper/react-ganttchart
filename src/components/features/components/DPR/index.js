import { useState } from "react";
import TaskFormDPR from "./TaskForrm";
import TaskViewDPR from "./TaskView";
import TaskModalDPR from "./modal/TaskModel";
import { FaPlus } from "react-icons/fa6";
import TableDPR from "./components/TableDPR";

const tasks = [
    {
        date: '01/03/2023',
        projectName: 'Jill Toscano Residence',
        taskName: 'Job Filling',
        supervisor: 'WF Plumbing & Heating	',
        reference: 'REF5439871',
        completion: '100%',
    },
    {
        date: '02/03/2023',
        projectName: 'Jill Toscano Residence',
        taskName: 'Installation of Shower Glass',
        supervisor: 'WF Plumbing & Heating	',
        reference: 'REF5439871',
        completion: '20%',
    },
    {
        date: '03/03/2023',
        projectName: 'Jill Toscano Residence',
        taskName: 'Installation of Shower Glass',
        supervisor: 'WF Plumbing & Heating	',
        reference: 'REF5439871',
        completion: '30%',
    },
    {
        date: '04/03/2023',
        projectName: 'Jill Toscano Residence',
        taskName: 'Installation of Shower Glass',
        supervisor: 'WF Plumbing & Heating	',
        reference: 'REF5439871',
        completion: '70%',
    },
    {
        date: '05/03/2023',
        projectName: 'Jill Toscano Residence',
        taskName: 'Installation of Shower Glass',
        supervisor: 'WF Plumbing & Heating	',
        reference: 'REF5439871',
        completion: '10%',
    },
    {
        date: '06/03/2023',
        projectName: 'Bashir',
        taskName: 'Fishing',
        supervisor: 'WF Plumbing & Heating	',
        reference: 'REF5439871',
        completion: '20%',
    },
    {
        date: '05/03/2023',
        projectName: 'Jill Toscano Residence',
        taskName: 'Installation of Shower Glass',
        supervisor: 'WF Plumbing & Heating	',
        reference: 'REF5439871',
        completion: '10%',
    },
    {
        date: '06/03/2023',
        projectName: 'Bashir',
        taskName: 'Fishing',
        supervisor: 'WF Plumbing & Heating	',
        reference: 'REF5439871',
        completion: '20%',
    },
    {
        date: '05/03/2023',
        projectName: 'Jill Toscano Residence',
        taskName: 'Installation of Shower Glass',
        supervisor: 'WF Plumbing & Heating	',
        reference: 'REF5439871',
        completion: '10%',
    },
    {
        date: '06/03/2023',
        projectName: 'Bashir',
        taskName: 'Fishing',
        supervisor: 'WF Plumbing & Heating	',
        reference: 'REF5439871',
        completion: '20%',
    },
];


const TaskDPReport = () => {
    const [showForm, setUseForm] = useState(false)
    const [showTaskView, setTaskView] = useState(false)
    const [isTaskModalOpen, setTaskModalOpen] = useState(false);

    const handleTaskModelAddOpen = () => {
        setTaskModalOpen(!isTaskModalOpen)
    }

    const handleTaskViewModelOpen = () => {
        setTaskView(!showTaskView)
    }

    return (
        <>
            <div className="myForm p-4 bg-white-2">
                {
                    <TaskModalDPR isTaskModalOpen={showTaskView} handleTaskModelOpen={handleTaskViewModelOpen} >
                        <TaskViewDPR isTaskModalOpen={showTaskView} handleTaskModelOpen={handleTaskViewModelOpen} />
                    </TaskModalDPR>
                }

                {
                    <TaskModalDPR isTaskModalOpen={isTaskModalOpen} handleTaskModelOpen={handleTaskModelAddOpen} >
                        <TaskFormDPR />
                    </TaskModalDPR>
                }

                <div className="dpr-tasks">
                    <div className="flex justify-between">
                        <h1 className="text-2xl font-bold text-primary-0">Daily Progress Reports</h1>
                        <button onClick={handleTaskModelAddOpen}
                            className="py-2 text-sm font-semibold text-white-2 bg-primary-0 rounded-lg flex items-center justify-center w-[165px]">
                            <FaPlus className="mr-2" /> Add Report
                        </button>
                    </div>

                    <TableDPR tasks={tasks} isTaskModalOpen={showTaskView} handleTaskModelOpen={handleTaskViewModelOpen} />
                </div>

            </div>

        </>
    );
};

export default TaskDPReport