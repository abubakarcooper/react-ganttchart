import React, { useState, useEffect } from 'react';
import GanttCharts from "../components/GanttCharts.js";
import ProjectOverview from "../components/ProjectOverview.js";
import { Card, Tabs } from "flowbite-react";
import { FaChartSimple } from "react-icons/fa6";
import { GiPieChart } from "react-icons/gi";
import { BiSolidReport } from "react-icons/bi";
import '../css/projectoverview.css'
import Spinner from '../components/Spinner.js';
import { getApi, getQueryParams } from '../apis/estimatesheet.js';



const GanttChartPage = () => {

    const [isGanttLoading, setLoading] = useState(false)
    const [activeTab, setActiveTab] = useState(0);
    const [projectInfo, setProjectInfo] = useState({
        projectName: '',
        clientName: '',
        startDate: '',
        endDate: '',
        daysLeft: '',
        totalDays: '',
        address: ''
    })

    const [allProjectTasks, setProjectTasks] = useState([])

    useEffect(() => {
        const projectid = `1556703000044884020`;
        getInitialData(projectid)
    }, [])

    const getInitialData = async (projectid) => {
        try {
            const project = await getApi('All_Projects', `ID==${projectid}`)
            const projectTasks = await getApi('Project_Deliverable_Task_Report', `Project.ID==${projectid}`)
            if (project?.length) {
                const projectData = project[0]
                setProjectInfo(prev => ({
                    ...prev,
                    projectName: projectData?.Job_Name,
                    // clientName: projectData?.Client_Name?.display_value?.trim(),
                    // address: projectData?.Address?.trim(),
                }));
            }

            if (projectTasks?.length) {
                setProjectTasks(projectTasks)
            }

        }
        catch (error) {
            console.log(error, 'error')
        }
    }


    if (isGanttLoading) {
        return (
            <div className="flex justify-center items-center">
                <Spinner />
            </div>
        );
    }

    console.log(allProjectTasks, 'allProjectTasks')
    return (
        <div className='gantt-chart  bg-white-2 m-1.5	p-2.5'>
            <Tabs
                aria-label="Tabs with underline"
                variant="underline"
                onActiveTabChange={(tab) => setActiveTab(tab)}
                className='ganttTabs'
            >
                <Tabs.Item active title="Project Overview" icon={FaChartSimple} value="Project Overview" className=''>
                    {
                        activeTab == 0 &&
                        <ProjectOverview allProjectTasks={allProjectTasks} projectInfo={projectInfo} />
                    }
                </Tabs.Item>
                <Tabs.Item title="Gantt Charts" icon={GiPieChart} value="Gantt Charts">
                    {activeTab === 1 && <GanttCharts />}
                </Tabs.Item>
                <Tabs.Item title="Budget Report" icon={BiSolidReport} value="Budget Report">
                    {/* {activeTab === 1 && <GanttCharts />} */}
                </Tabs.Item>
            </Tabs>
        </div>
    );
};

export default GanttChartPage;
