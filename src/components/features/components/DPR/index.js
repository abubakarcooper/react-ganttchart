import { useEffect, useState } from "react";
import TaskFormDPR from "./TaskForrm";
import TaskViewDPR from "./TaskView";
import TaskModalDPR from "./modal/TaskModel";
import { FaPlus } from "react-icons/fa6";
import TableDPR from "./components/TableDPR";
import { getApi } from "../../../../apis/estimatesheet";

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
    const [projects, setProjects] = useState([])
    const [subcontractorsList, setSubcontractorsList] = useState([]);
    const [projectList, setProjectList] = useState([]);
    const [formLoading, setFormLoading] = useState(true);
    const [dprReports, setDprReports] = useState([])
    const [tableLoader, setTableLoader] = useState(true);
    const [openTask, setOpenTask] = useState(null)

    useEffect(() => {
        getDPRDetail()
        getDprTableData()
    }, [])

    const handleTaskModelAddOpen = () => {
        setTaskModalOpen(!isTaskModalOpen)
    }

    const handleTaskViewModelOpen = (task) => {
        console.log(task, 'task')
        setOpenTask(task)
        setTaskView(!showTaskView)
    }

    const getDPRDetail = async (active = true) => {
        try {
            const projects = await getApi("All_Projects", `Active==${active}`)
            const projectList = projects?.map((item) => ({
                label: item?.Job_Name + " - " + item?.Project_ID,
                value: item?.ID,
            }));
            setProjectList(projectList?.length ? projectList : [])
        }
        catch (error) {
            console.log(error, 'error')
        }
    }

    const getFileExtension = (url) => {
        const parts = url.split('.');
        return parts.length > 1 ? parts.pop().split('?')[0].toLowerCase() : '';
    };


    const getDprTableData = async () => {
        try {
            const dprReports = await getApi("All_Daily_Progress");

            setDprReports(dprReports?.length ? dprReports.map(project => {
                const pdfs = [];
                const videos = [];
                const images = [];

                if (project.Progress_Attachements) {
                    project.Progress_Attachements.forEach(file1 => {
                        const fileUrl = file1.display_value.split('##$$')[0];
                        const ext = getFileExtension(fileUrl);
                        console.log(fileUrl, 'file.filefile');
                        console.log(ext, 'file.extension');

                        if (ext === 'pdf') {
                            pdfs.push(fileUrl);
                        } else if (['mp4', 'mov', 'avi', 'mkv'].includes(ext)) {
                            videos.push(fileUrl);
                        } else if (['png', 'jpg', 'jpeg'].includes(ext)) {
                            images.push(fileUrl);
                        }
                    });
                }

                return {
                    ...project,
                    Project: project?.Project_Name?.display_value,
                    Supervisor: project?.Project_Supervisor?.display_value,
                    pdfs,
                    images,
                    videos
                };
            }) : []);

            setTableLoader(false);
        } catch (error) {
            console.log(error, 'error');
            setTableLoader(false);
        }
    };


    console.log(dprReports, 'dprReports')

    return (
        <>
            <div className="myForm p-4 bg-white-2">
                {

                    showTaskView &&
                    <TaskModalDPR isTaskModalOpen={showTaskView} handleTaskModelOpen={handleTaskViewModelOpen} >
                        <TaskViewDPR isTaskModalOpen={showTaskView} handleTaskModelOpen={handleTaskViewModelOpen} openTask={openTask} />
                    </TaskModalDPR>
                }

                {
                    isTaskModalOpen &&
                    <TaskModalDPR isTaskModalOpen={isTaskModalOpen} handleTaskModelOpen={handleTaskModelAddOpen} >
                        <TaskFormDPR
                            // subcontractorsList={subcontractorsList}
                            // setSubcontractorsList={setSubcontractorsList}
                            projectList={projectList}
                            formLoading={formLoading}
                        />
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

                    <TableDPR tableLoader={tableLoader} tasks={dprReports} isTaskModalOpen={showTaskView} handleTaskModelOpen={handleTaskViewModelOpen} />

                </div>

            </div>

        </>
    );
};

export default TaskDPReport